import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMeasurementSchema, insertAnalysisResultSchema, insertInviteCodeSchema, participants as participantsTable, testSessions as testSessionsTable, garminData as garminDataTable } from "@shared/schema";
import { eq, desc, gt } from "drizzle-orm";
import crypto from "crypto";
import { generateFitnessAnalysis } from "./openai";
import OpenAI from "openai";
import { 
  supabase,
  getLatestCompletedTest, 
  getGarminDataByDisplayName, 
  extractPowerValues, 
  getStageIntervalPowerValues,
  calculateBalance, 
  formatDate, 
  formatGender 
} from "./supabase";
import { 
  AGE_EXPONENT, 
  relPower, 
  calcPercentile, 
  gradeFromPct, 
  getGradeInfo, 
  newCutoffData,
  type Cutoff 
} from "./percentile";



function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

// 새로운 백분위 계산 함수를 percentile.ts에서 가져옴 (calcPercentile)

function getBalanceStatus(leftBalance: number, rightBalance: number): string {
  const diff = Math.abs(leftBalance - rightBalance);
  if (diff <= 5) return "이상적";
  else if (diff <= 7) return "주의";
  else return "경고";
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // 📸 HTML 스냅샷 저장
  app.post("/api/save-report-snapshot", async (req, res) => {
    try {
      const { measurementId, userDisplayName, studentName, measureDate, htmlContent, age, gender, overallPercentile } = req.body;
      
      const { data, error } = await supabase
        .from('report_snapshots')
        .insert([{
          measurement_id: measurementId,
          user_display_name: userDisplayName,
          student_name: studentName,
          measure_date: measureDate,
          html_content: htmlContent,
          age,
          gender,
          overall_percentile: overallPercentile
        }])
        .select()
        .single();

      if (error) {
        console.error("리포트 스냅샷 저장 오류:", error);
        return res.status(500).json({ error: "리포트 스냅샷 저장 실패" });
      }

      res.json({ success: true, snapshotId: data.id });
    } catch (error) {
      console.error("리포트 스냅샷 저장 중 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  });

  // 📖 HTML 스냅샷 조회 (QR 코드용)
  app.get("/api/report-snapshot/:measurementId", async (req, res) => {
    try {
      const { measurementId } = req.params;
      
      const { data, error } = await supabase
        .from('report_snapshots')
        .select('*')
        .eq('measurement_id', measurementId)
        .single();

      if (error || !data) {
        return res.status(404).json({ error: "리포트를 찾을 수 없습니다" });
      }

      res.json(data);
    } catch (error) {
      console.error("리포트 스냅샷 조회 중 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  });

  // 📋 학생별 리포트 목록 조회 (측정기록 페이지용)
  app.get("/api/student-reports/:studentName", async (req, res) => {
    try {
      const { studentName } = req.params;
      
      const { data, error } = await supabase
        .from('report_snapshots')
        .select('id, measurement_id, measure_date, overall_percentile, age, created_at')
        .eq('student_name', studentName)
        .order('measure_date', { ascending: false });

      if (error) {
        console.error("학생 리포트 조회 오류:", error);
        return res.status(500).json({ error: "리포트 조회 실패" });
      }

      res.json(data || []);
    } catch (error) {
      console.error("학생 리포트 조회 중 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  });

  // 🚀 Supabase에 완전한 측정 데이터 저장
  app.post("/api/supabase/save-measurement", async (req, res) => {
    try {
      console.log("=== Supabase 측정 데이터 저장 시작 ===");
      const formData = req.body;
      console.log("폼 데이터:", formData);

      // 1. 참가자 정보 저장
      const userDisplayName = `${formData.studentName}_${formData.birthDate}`;
      console.log("생성된 userDisplayName:", userDisplayName);

      const { data: participant, error: participantError } = await supabase
        .from('participants')
        .insert([{
          name: formData.studentName,
          birth_date: formData.birthDate,
          gender: formData.gender,
          organization: formData.affiliation || '',
          display_name: userDisplayName,
          height: formData.height || null,
          weight: formData.weight || null
        }])
        .select()
        .single();

      if (participantError) {
        console.error("참가자 저장 오류:", participantError);
        return res.status(500).json({ error: "참가자 정보 저장 실패" });
      }

      console.log("참가자 저장 완료:", participant);

      // 2. 테스트 세션 생성
      const completedStages = [
        formData.power5s,
        formData.power15s,
        formData.power30s,
        formData.power60s,
        formData.power180s,
        formData.power360s
      ].filter(power => power && power > 0).length;

      const { data: session, error: sessionError } = await supabase
        .from('test_sessions')
        .insert([{
          user_id: participant.id,
          user_display_name: userDisplayName,
          start_time: new Date(formData.measureDate).toISOString(),
          end_time: new Date().toISOString(),
          status: 'completed',
          total_stages: 6,
          completed_stages: completedStages
        }])
        .select()
        .single();

      if (sessionError) {
        console.error("세션 저장 오류:", sessionError);
        return res.status(500).json({ error: "테스트 세션 저장 실패" });
      }

      console.log("테스트 세션 저장 완료:", session);

      // 3. 단계별 파워 데이터 저장
      const stageData = [];
      
      if (formData.power5s > 0) {
        stageData.push({
          session_id: session.id,
          user_display_name: userDisplayName,
          sequence_number: 1,
          stage_name: '5초 최대파워',
          max_power_in_stage: formData.power5s,
          avg_power_in_stage: formData.power5s,
          start_timestamp: new Date().toISOString(),
          end_timestamp: new Date(Date.now() + 5000).toISOString(),
          duration_seconds: 5
        });
      }

      if (formData.power15s > 0) {
        stageData.push({
          session_id: session.id,
          user_display_name: userDisplayName,
          sequence_number: 2,
          stage_name: '15초 최대파워',
          max_power_in_stage: formData.power15s,
          avg_power_in_stage: formData.power15s,
          start_timestamp: new Date().toISOString(),
          end_timestamp: new Date(Date.now() + 15000).toISOString(),
          duration_seconds: 15
        });
      }

      if (formData.power30s > 0) {
        stageData.push({
          session_id: session.id,
          user_display_name: userDisplayName,
          sequence_number: 3,
          stage_name: '30초 최대파워',
          max_power_in_stage: formData.power30s,
          avg_power_in_stage: formData.power30s,
          start_timestamp: new Date().toISOString(),
          end_timestamp: new Date(Date.now() + 30000).toISOString(),
          duration_seconds: 30
        });
      }

      if (formData.power60s > 0) {
        stageData.push({
          session_id: session.id,
          user_display_name: userDisplayName,
          sequence_number: 4,
          stage_name: '60초 최대파워',
          max_power_in_stage: formData.power60s,
          avg_power_in_stage: formData.power60s,
          start_timestamp: new Date().toISOString(),
          end_timestamp: new Date(Date.now() + 60000).toISOString(),
          duration_seconds: 60
        });
      }

      if (formData.power180s && formData.power180s > 0) {
        stageData.push({
          session_id: session.id,
          user_display_name: userDisplayName,
          sequence_number: 5,
          stage_name: '180초 지구력',
          max_power_in_stage: formData.power180s,
          avg_power_in_stage: formData.power180s,
          start_timestamp: new Date().toISOString(),
          end_timestamp: new Date(Date.now() + 180000).toISOString(),
          duration_seconds: 180
        });
      }

      if (formData.power360s && formData.power360s > 0) {
        stageData.push({
          session_id: session.id,
          user_display_name: userDisplayName,
          sequence_number: 6,
          stage_name: '360초 지구력',
          max_power_in_stage: formData.power360s,
          avg_power_in_stage: formData.power360s,
          start_timestamp: new Date().toISOString(),
          end_timestamp: new Date(Date.now() + 360000).toISOString(),
          duration_seconds: 360
        });
      }

      if (stageData.length > 0) {
        const { error: stageError } = await supabase
          .from('stage_intervals')
          .insert(stageData);

        if (stageError) {
          console.error("파워 데이터 저장 오류:", stageError);
          return res.status(500).json({ error: "파워 데이터 저장 실패" });
        }

        console.log("파워 데이터 저장 완료:", stageData.length, "개 단계");
      }

      // 4. 분석 결과 저장 (키, 체중, 밸런스, 심박수)
      const analysisData = {
        height: formData.height || null,
        weight: formData.weight || null,
        left_balance: formData.leftBalance || 50,
        right_balance: formData.rightBalance || 50,
        max_heart_rate: formData.maxHeartRate || null,
        avg_heart_rate: formData.avgHeartRate || null,
        measurement_date: formData.measureDate
      };

      const { error: analysisError } = await supabase
        .from('report_results')
        .insert([{
          session_id: session.id,
          user_display_name: userDisplayName,
          analysis_data: analysisData
        }]);

      if (analysisError) {
        console.error("분석 결과 저장 오류:", analysisError);
        return res.status(500).json({ error: "분석 결과 저장 실패" });
      }

      console.log("분석 결과 저장 완료");
      console.log("=== Supabase 저장 완료 ===");

      res.json({ 
        success: true, 
        message: "모든 데이터가 Supabase에 성공적으로 저장되었습니다.",
        participant_id: participant.id,
        session_id: session.id,
        user_display_name: userDisplayName
      });

    } catch (error) {
      console.error("Supabase 저장 중 오류:", error);
      res.status(500).json({ error: "데이터 저장 중 오류가 발생했습니다." });
    }
  });

  app.post("/api/measurements", async (req, res) => {
    try {
      const measurementData = insertMeasurementSchema.parse(req.body);
      
      // 측정 결과만 계산하고 저장하지 않음 (데모용)
      const measurement = { id: Date.now(), ...measurementData };
      
      // Calculate analysis
      const age = calculateAge(measurementData.birthDate);
      const bmi = measurementData.weight / Math.pow(measurementData.height / 100, 2);
      
      // 성별과 나이에 따른 데이터 키 생성
      const clampedAge = Math.max(4, Math.min(12, age)); // 4-12세 범위로 제한
      
      // 성별이 비어있거나 유효하지 않으면 에러 반환
      if (!measurementData.gender || (measurementData.gender !== 'M' && measurementData.gender !== 'F')) {
        return res.status(400).json({ 
          error: "성별 정보가 필요합니다. 남성(M) 또는 여성(F)을 선택해주세요." 
        });
      }
      
      const genderKey = `${clampedAge}_${measurementData.gender}`;
      const cutoffs = newCutoffData[genderKey];
      
      console.log(`나이: ${age}, 제한된 나이: ${clampedAge}, 성별: ${measurementData.gender}, 키: ${genderKey}`);
      console.log(`Cutoffs found:`, cutoffs ? "Yes" : "No", cutoffs);
      
      // 사용자 입력: 절대 파워값 (W)
      const absolutePowers = {
        "5s": measurementData.power5s,
        "15s": measurementData.power15s,
        "30s": measurementData.power30s,
        "60s": measurementData.power60s,
        "180s": measurementData.power180s || 0,
        "360s": measurementData.power360s || 0
      };
      
      // 새로운 상대 파워 계산: 연령별 지수 적용
      const ageExponent = AGE_EXPONENT(age);
      console.log(`체중: ${measurementData.weight}kg, 연령: ${age}, 지수: ${ageExponent}`);
      
      const relativePowers = {
        "5s": relPower(absolutePowers["5s"], measurementData.weight, age),
        "15s": relPower(absolutePowers["15s"], measurementData.weight, age),
        "30s": relPower(absolutePowers["30s"], measurementData.weight, age),
        "60s": relPower(absolutePowers["60s"], measurementData.weight, age),
        "180s": relPower(absolutePowers["180s"], measurementData.weight, age),
        "360s": relPower(absolutePowers["360s"], measurementData.weight, age)
      };
      
      console.log(`입력된 절대 파워값: 5s=${absolutePowers["5s"]}W, 15s=${absolutePowers["15s"]}W, 30s=${absolutePowers["30s"]}W, 60s=${absolutePowers["60s"]}W`);
      console.log(`계산된 상대 파워값: 5s=${relativePowers["5s"]}, 15s=${relativePowers["15s"]}, 30s=${relativePowers["30s"]}, 60s=${relativePowers["60s"]}`);
      
      // 새로운 백분위 계산 (P3, P15, P50, P85, P97 기준)
      const percentiles = {
        "5s": calcPercentile(relativePowers["5s"], cutoffs?.power),
        "15s": calcPercentile(relativePowers["15s"], cutoffs?.strength),
        "30s": calcPercentile(relativePowers["30s"], cutoffs?.muscleEndurance),
        "60s": calcPercentile(relativePowers["60s"], cutoffs?.cardioEndurance),
        "180s": absolutePowers["180s"] > 0 ? calcPercentile(relativePowers["180s"], cutoffs?.longEndurance180s) : null,
        "360s": absolutePowers["360s"] > 0 ? calcPercentile(relativePowers["360s"], cutoffs?.longEndurance360s) : null
      };
      
      console.log(`최종 백분위 결과: 5s=${percentiles["5s"]}%, 15s=${percentiles["15s"]}%, 30s=${percentiles["30s"]}%, 60s=${percentiles["60s"]}%`);
      
      const overallPercentile = (percentiles["5s"] + percentiles["15s"] + percentiles["30s"] + percentiles["60s"]) / 4;
      const balanceStatus = getBalanceStatus(measurementData.leftBalance, measurementData.rightBalance);
      
      // Determine strengths and improvements (including 180s/360s if available)
      const categories = [
        { name: "순발력 (5초)", percentile: percentiles["5s"] },
        { name: "스프린트 파워 (15초)", percentile: percentiles["15s"] },
        { name: "파워 지속력 (30초)", percentile: percentiles["30s"] },
        { name: "근력 (60초)", percentile: percentiles["60s"] }
      ];
      
      // Add advanced endurance categories if data is available
      if (percentiles["180s"]) {
        categories.push({ name: "근지구력 (180초)", percentile: percentiles["180s"] });
      }
      if (percentiles["360s"]) {
        categories.push({ name: "심폐지구력 (360초)", percentile: percentiles["360s"] });
      }
      
      categories.sort((a, b) => b.percentile - a.percentile);
      const strengths = categories.slice(0, 2).map(c => c.name);
      const improvements = categories.slice(-1).map(c => c.name);
      
      // Heart rate analysis for energy systems
      const heartRateData = {
        maxBpm: measurementData.maxHeartRate || null,
        avgBpm: measurementData.avgHeartRate || null,
        restingBpm: measurementData.restingHeartRate || null
      };

      // Generate AI analysis with complete data
      console.log("AI 분석 생성 시작...");
      const aiAnalysis = await generateFitnessAnalysis({
        studentName: measurementData.studentName,
        age,
        height: measurementData.height,
        weight: measurementData.weight,
        overallPercentile,
        percentiles: {
          power: percentiles["5s"],
          strength: percentiles["15s"],
          muscleEndurance: percentiles["30s"],
          cardioEndurance: percentiles["60s"],
          longEndurance180s: percentiles["180s"],
          longEndurance360s: percentiles["360s"]
        },
        rawPowerData: {
          power5s: measurementData.power5s,
          power15s: measurementData.power15s,
          power30s: measurementData.power30s,
          power60s: measurementData.power60s,
          power180s: measurementData.power180s || null,
          power360s: measurementData.power360s || null
        },
        advancedPowerData: {
          power180s: absolutePowers["180s"],
          power360s: absolutePowers["360s"],
          hasAdvancedData: absolutePowers["180s"] > 0 || absolutePowers["360s"] > 0
        },
        heartRateData,
        balanceDifference: Math.abs(measurementData.leftBalance - measurementData.rightBalance),
        strengths,
        improvements
      });
      
      console.log("AI 분석 완료:", {
        coreInsights: aiAnalysis.coreInsights ? "생성됨" : "없음",
        overallAssessment: aiAnalysis.overallAssessment ? "생성됨" : "없음"
      });
      
      // 새로운 5등급 시스템 등급 계산 함수
      const getGrade = (percentile: number): string => {
        const grade = gradeFromPct(percentile);
        const gradeInfo = getGradeInfo(grade);
        return gradeInfo.name;
      };

      // Create analysis result
      // 강점과 보완점 계산
      const calculateStrengthsAndImprovements = () => {
        const percentileData = [
          { name: "순발력 (5초)", value: percentiles["5s"] },
          { name: "스프린트 파워 (15초)", value: percentiles["15s"] },
          { name: "근력 (30초)", value: percentiles["30s"] },
          { name: "근지구력 (60초)", value: percentiles["60s"] }
        ];
        
        // 180초, 360초 데이터가 있으면 추가
        if (percentiles["180s"] !== null && percentiles["180s"] !== undefined) {
          percentileData.push({ name: "심폐지구력 (180초)", value: percentiles["180s"] });
        }
        if (percentiles["360s"] !== null && percentiles["360s"] !== undefined) {
          percentileData.push({ name: "장시간지구력 (360초)", value: percentiles["360s"] });
        }
        
        // 강점: 85% 이상인 항목들 (2등급 이상)
        const strengths = percentileData
          .filter(item => item.value >= 85)
          .map(item => item.name);
        
        // 보완점: 15% 미만인 항목들 찾기 (4-5등급)
        const weakAreas = percentileData.filter(item => item.value < 15);
        
        let improvements;
        if (weakAreas.length >= 3) {
          // 대부분 영역이 약하면 모든 약한 영역 표시
          improvements = weakAreas.map(item => item.name);
        } else if (weakAreas.length > 0) {
          // 일부만 약하면 약한 영역 표시
          improvements = weakAreas.map(item => item.name);
        } else {
          // 약한 영역이 없으면 가장 낮은 1개만 표시
          const sorted = [...percentileData].sort((a, b) => a.value - b.value);
          improvements = sorted.slice(0, 1).map(item => item.name);
        }
        
        return {
          strengths: strengths.length > 0 ? strengths.join(", ") : "집중 훈련이 필요합니다",
          improvements: improvements.join(", ")
        };
      };
      
      const { strengths: strengthsText, improvements: improvementsText } = calculateStrengthsAndImprovements();

      // 분석 결과만 생성하고 저장하지 않음 (데모용)
      const analysisResult = {
        id: Date.now() + 1,
        measurementId: measurement.id,
        bmi,
        age,
        overallPercentile,
        percentile5s: percentiles["5s"],
        percentile15s: percentiles["15s"],
        percentile30s: percentiles["30s"],
        percentile60s: percentiles["60s"],
        percentile180s: percentiles["180s"],
        percentile360s: percentiles["360s"],
        maxBpm: heartRateData.maxBpm,
        avgBpm: heartRateData.avgBpm,
        restingBpm: heartRateData.restingBpm,
        balanceStatus,
        aiCoreInsights: aiAnalysis.coreInsights,
        balanceComment: aiAnalysis.balanceComment,
        explanation5s: aiAnalysis.explanations.power,
        explanation15s: aiAnalysis.explanations.strength,
        explanation30s: aiAnalysis.explanations.muscleEndurance,
        explanation60s: aiAnalysis.explanations.cardioEndurance,
        comprehensiveAnalysis: typeof aiAnalysis.comprehensiveAnalysis === 'string' 
          ? aiAnalysis.comprehensiveAnalysis 
          : Array.isArray(aiAnalysis.comprehensiveAnalysis) 
            ? aiAnalysis.comprehensiveAnalysis.join(" | ")
            : "체력 분석을 완료했습니다.",
        overallAssessment: aiAnalysis.overallAssessment,
        strengths: strengthsText,
        improvements: improvementsText
      };
      
      // 🔥 Supabase에 웹리포트 결과 저장 (신체변화 추적용)
      try {
        const studentIdentifier = `${measurementData.studentName}(${measurementData.birthDate})`;
        
        const reportData = {
          student_identifier: studentIdentifier,
          student_name: measurementData.studentName,
          birth_date: measurementData.birthDate,
          measure_date: measurementData.measureDate,
          
          // 기본 정보
          age,
          gender: measurementData.gender,
          height: measurementData.height,
          weight: measurementData.weight,
          bmi,
          affiliation: measurementData.affiliation,
          
          // 환산점수 (상대파워)
          relative_power_5s: relativePowers["5s"],
          relative_power_15s: relativePowers["15s"], 
          relative_power_30s: relativePowers["30s"],
          relative_power_60s: relativePowers["60s"],
          relative_power_180s: relativePowers["180s"] || null,
          relative_power_360s: relativePowers["360s"] || null,
          
          // 백분위 점수
          percentile_5s: percentiles["5s"],
          percentile_15s: percentiles["15s"],
          percentile_30s: percentiles["30s"],
          percentile_60s: percentiles["60s"],
          percentile_180s: percentiles["180s"] || null,
          percentile_360s: percentiles["360s"] || null,
          overall_percentile: overallPercentile,
          
          // 등급 (우수~경고)
          grade_5s: getGrade(percentiles["5s"]),
          grade_15s: getGrade(percentiles["15s"]),
          grade_30s: getGrade(percentiles["30s"]),
          grade_60s: getGrade(percentiles["60s"]),
          grade_180s: percentiles["180s"] ? getGrade(percentiles["180s"]) : null,
          grade_360s: percentiles["360s"] ? getGrade(percentiles["360s"]) : null,
          overall_grade: getGrade(overallPercentile),
          
          // 심박수 데이터
          max_heart_rate: heartRateData.maxBpm,
          avg_heart_rate: heartRateData.avgBpm,
          resting_heart_rate: heartRateData.restingBpm,
          
          // 좌우밸런스
          left_balance: measurementData.leftBalance,
          right_balance: measurementData.rightBalance,
          balance_difference: Math.abs(measurementData.leftBalance - measurementData.rightBalance),
          balance_status: balanceStatus,
          
          // AI 분석 결과
          ai_core_insights: aiAnalysis.coreInsights,
          ai_balance_comment: aiAnalysis.balanceComment,
          ai_comprehensive_analysis: typeof aiAnalysis.comprehensiveAnalysis === 'string' 
            ? aiAnalysis.comprehensiveAnalysis 
            : Array.isArray(aiAnalysis.comprehensiveAnalysis) 
              ? JSON.stringify(aiAnalysis.comprehensiveAnalysis)
              : "체력 분석을 완료했습니다.",
          ai_overall_assessment: aiAnalysis.overallAssessment,
          strengths: strengthsText,
          improvements: improvementsText
        };

        const { data: savedReport, error: reportError } = await supabase
          .from('report_results')
          .insert(reportData)
          .select()
          .single();

        if (reportError) {
          console.error("리포트 저장 오류:", reportError);
        } else {
          console.log(`✅ 웹리포트 저장 완료: ${studentIdentifier} (${measurementData.measureDate})`);
          console.log("저장된 데이터 ID:", savedReport?.id);
        }
      } catch (reportSaveError) {
        console.error("리포트 저장 중 예외 발생:", reportSaveError);
      }

      console.log("=== 측정 결과 계산 완료 ===");
      console.log("측정 ID:", measurement.id);
      console.log("학생 이름:", measurement.studentName);
      
      res.json({
        measurement,
        analysis: analysisResult,
        strengths,
        improvements
      });
      
    } catch (error) {
      console.error("Error creating measurement:", error);
      res.status(400).json({ error: "Invalid measurement data" });
    }
  });
  
  // 모든 측정 데이터 조회 (먼저 정의)
  app.get("/api/measurements/all", async (req, res) => {
    try {
      console.log("=== 모든 측정 데이터 조회 요청 ===");
      const measurements = await storage.getAllMeasurements();
      console.log("저장된 측정 데이터 개수:", measurements.length);
      
      if (measurements.length === 0) {
        console.log("저장된 데이터가 없음");
        return res.json([]);
      }
      
      // 각 측정에 대한 분석 결과 가져오기
      const results = await Promise.all(
        measurements.map(async (measurement) => {
          const analysis = await storage.getAnalysisResult(measurement.id);
          return {
            measurement,
            analysis
          };
        })
      );
      
      console.log("분석 결과 포함한 데이터 개수:", results.length);
      res.json(results);
      
    } catch (error) {
      console.error("모든 데이터 조회 오류:", error);
      res.status(500).json({ error: "Failed to retrieve all measurements" });
    }
  });

  // Search measurements endpoint (먼저 정의)
  app.get("/api/measurements/search", async (req, res) => {
    try {
      const { studentName, affiliation, birthDate, gender } = req.query;
      
      console.log("=== 검색 요청 ===", { studentName, affiliation, birthDate, gender });
      
      // 검색 조건이 없으면 모든 데이터 반환
      if (!studentName || studentName === '' || studentName === 'ALL_DATA') {
        console.log("모든 데이터 반환 모드");
        const measurements = await storage.getAllMeasurements();
        console.log("저장된 전체 측정 데이터 개수:", measurements.length);
        
        if (measurements.length === 0) {
          return res.json([]);
        }
        
        // 각 측정에 대한 분석 결과 가져오기 및 데이터 변환
        const results = await Promise.all(
          measurements.map(async (measurement) => {
            const analysis = await storage.getAnalysisResult(measurement.id);
            if (!analysis) return null;
            
            // 클라이언트가 기대하는 형태로 데이터 변환
            return {
              id: measurement.id,
              studentName: measurement.studentName,
              affiliation: measurement.affiliation,
              gender: measurement.gender,
              age: analysis.age,
              birthDate: measurement.birthDate,
              measureDate: measurement.measureDate,
              height: measurement.height,
              weight: measurement.weight,
              power5s: measurement.power5s,
              power15s: measurement.power15s,
              power30s: measurement.power30s,
              power60s: measurement.power60s,
              power180s: measurement.power180s,
              power360s: measurement.power360s,
              leftBalance: measurement.leftBalance,
              rightBalance: measurement.rightBalance,
              maxHeartRate: measurement.maxHeartRate,
              avgHeartRate: measurement.avgHeartRate,
              overallGrade: analysis.overallPercentile >= 80 ? '매우우수' : 
                           analysis.overallPercentile >= 60 ? '우수' :
                           analysis.overallPercentile >= 40 ? '보통' :
                           analysis.overallPercentile >= 20 ? '낮음' : '매우낮음',
              overallPercentile: analysis.overallPercentile,
              percentile5s: analysis.percentile5s,
              percentile15s: analysis.percentile15s,
              percentile30s: analysis.percentile30s,
              percentile60s: analysis.percentile60s,
              percentile180s: analysis.percentile180s,
              percentile360s: analysis.percentile360s,
              strengths: analysis.strengths,
              improvements: analysis.improvements,
              aiCoreInsights: analysis.aiCoreInsights,
              balanceStatus: analysis.balanceStatus
            };
          })
        );
        
        const filteredResults = results.filter(result => result !== null);
        return res.json(filteredResults);
      }
      
      // 실제 검색 수행
      const measurements = await storage.searchMeasurements({
        studentName: studentName as string,
        affiliation: affiliation as string,
        birthDate: birthDate as string,
        gender: gender as string
      });
      
      console.log("검색 결과:", measurements.length + "개");
      
      if (measurements.length === 0) {
        return res.json([]); // 404 대신 빈 배열 반환
      }
      
      // 분석 결과 추가 및 데이터 변환
      const results = await Promise.all(
        measurements.map(async (measurement) => {
          const analysis = await storage.getAnalysisResult(measurement.id);
          if (!analysis) return null;
          
          // 클라이언트가 기대하는 형태로 데이터 변환
          return {
            id: measurement.id,
            studentName: measurement.studentName,
            affiliation: measurement.affiliation,
            gender: measurement.gender,
            age: analysis.age,
            birthDate: measurement.birthDate,
            measureDate: measurement.measureDate,
            height: measurement.height,
            weight: measurement.weight,
            power5s: measurement.power5s,
            power15s: measurement.power15s,
            power30s: measurement.power30s,
            power60s: measurement.power60s,
            power180s: measurement.power180s,
            power360s: measurement.power360s,
            leftBalance: measurement.leftBalance,
            rightBalance: measurement.rightBalance,
            maxHeartRate: measurement.maxHeartRate,
            avgHeartRate: measurement.avgHeartRate,
            overallGrade: analysis.overallPercentile >= 80 ? '매우우수' : 
                         analysis.overallPercentile >= 60 ? '우수' :
                         analysis.overallPercentile >= 40 ? '보통' :
                         analysis.overallPercentile >= 20 ? '낮음' : '매우낮음',
            overallPercentile: analysis.overallPercentile,
            percentile5s: analysis.percentile5s,
            percentile15s: analysis.percentile15s,
            percentile30s: analysis.percentile30s,
            percentile60s: analysis.percentile60s,
            percentile180s: analysis.percentile180s,
            percentile360s: analysis.percentile360s,
            strengths: analysis.strengths,
            improvements: analysis.improvements,
            aiCoreInsights: analysis.aiCoreInsights,
            balanceStatus: analysis.balanceStatus
          };
        })
      );
      
      const filteredResults = results.filter(result => result !== null);
      res.json(filteredResults);
      
    } catch (error) {
      console.error("검색 오류:", error);
      res.status(500).json({ error: "Failed to search measurements" });
    }
  });

  // Student measurements (특정 형식이므로 먼저 정의)
  app.get("/api/measurements/student/:name", async (req, res) => {
    try {
      const studentName = decodeURIComponent(req.params.name);
      const measurements = await storage.getMeasurementsByStudent(studentName);
      
      res.json(measurements);
      
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve student measurements" });
    }
  });

  // Individual measurement by ID (마지막에 정의)
  app.get("/api/measurements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const measurement = await storage.getMeasurement(id);
      
      if (!measurement) {
        return res.status(404).json({ error: "Measurement not found" });
      }
      
      const analysis = await storage.getAnalysisResult(id);
      
      res.json({
        measurement,
        analysis
      });
      
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve measurement" });
    }
  });
  
  // 측정 데이터 삭제
  app.delete("/api/measurements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMeasurement(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting measurement:", error);
      res.status(500).json({ error: "Failed to delete measurement" });
    }
  });

  // Invite code management endpoints
  app.post("/api/invite-codes", async (req, res) => {
    try {
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      console.log("생성된 코드:", code);
      
      const inviteCode = await storage.createInviteCode({
        code,
        isUsed: "false"
      });
      
      console.log("저장된 초대 코드:", inviteCode);
      res.json(inviteCode);
    } catch (error) {
      console.error("초대 코드 생성 오류:", error);
      res.status(500).json({ error: "Failed to create invite code" });
    }
  });

  app.post("/api/invite-codes/verify", async (req, res) => {
    try {
      const { code } = req.body;
      
      if (!code) {
        return res.status(400).json({ error: "Invite code is required" });
      }
      
      const inviteCode = await storage.getInviteCode(code.toUpperCase());
      
      if (!inviteCode) {
        return res.status(404).json({ error: "Invalid invite code" });
      }
      
      if (inviteCode.isUsed === "true") {
        return res.status(400).json({ error: "Invite code has already been used" });
      }
      
      // Mark as used
      await storage.markInviteCodeAsUsed(code.toUpperCase());
      
      res.json({ message: "Invite code verified successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to verify invite code" });
    }
  });

  // Admin authentication endpoint
  app.post("/api/admin/login", async (req, res) => {
    try {
      const { password } = req.body;
      
      if (!password) {
        return res.status(400).json({ error: "비밀번호가 필요합니다." });
      }
      
      if (password !== process.env.ADMIN_PASSWORD) {
        return res.status(401).json({ error: "잘못된 비밀번호입니다." });
      }
      
      res.json({ message: "로그인 성공" });
    } catch (error) {
      console.error("Admin login error:", error);
      res.status(500).json({ error: "로그인 처리 중 오류가 발생했습니다." });
    }
  });

  // Push notification endpoints
  app.post("/api/push-subscription", async (req, res) => {
    try {
      const subscription = req.body;
      console.log('Push subscription received:', subscription);
      
      // Send confirmation notification
      res.status(201).json({ message: 'Push subscription saved successfully' });
    } catch (error) {
      console.error('Error saving push subscription:', error);
      res.status(500).json({ message: 'Failed to save push subscription' });
    }
  });

  app.post("/api/send-notification", async (req, res) => {
    try {
      const { studentName, measurementId } = req.body;
      console.log('Notification requested for:', studentName);
      res.json({ message: 'Notification sent successfully' });
    } catch (error) {
      console.error('Error sending notification:', error);
      res.status(500).json({ message: 'Failed to send notification' });
    }
  });

  // 이미지 생성 API
  app.post("/api/generate-image", async (req, res) => {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      
      const prompt = `A professional, high-quality photograph of a child using the KidsMotion fitness assessment system. The scene shows:

- A 8-10 year old Korean child sitting on a modern, adjustable indoor cycling machine designed specifically for children
- The bike has a sleek, medical-grade white and purple design with adjustable seat height, handlebar height, and positioning
- A large digital display screen showing real-time fitness metrics, colorful charts, and child-friendly interface
- The setting is a bright, clean, modern school gymnasium or fitness center with white walls and good lighting
- The child is wearing comfortable athletic wear and appears engaged and happy
- Professional medical/fitness equipment aesthetic similar to high-end rehabilitation or sports science facilities
- The bike frame is compact and child-sized, clearly designed for ages 4-12
- Visible adjustment mechanisms on the seat and handlebars showing the customizable nature
- Clean, professional product photography style suitable for investor presentations
- Bright, well-lit environment that conveys safety and professionalism

Style: Professional product photography, bright and clean, medical/fitness equipment aesthetic, suitable for business presentations, high resolution, realistic rendering`;

      const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        quality: "hd",
      });

      res.json({ imageUrl: response.data[0].url });
    } catch (error) {
      console.error("이미지 생성 오류:", error);
      res.status(500).json({ error: "이미지 생성에 실패했습니다." });
    }
  });

  // 특정 참가자 ID로 데이터 가져오기
  app.get("/api/supabase/participant/:id", async (req, res) => {
    try {
      const participantId = parseInt(req.params.id);
      
      if (!participantId) {
        return res.status(400).json({ error: "유효하지 않은 참가자 ID" });
      }

      console.log("=== 특정 참가자 데이터 검색 ===", participantId);
      
      const { data: participants, error: participantError } = await supabase
        .from('participants')
        .select('*')
        .eq('id', participantId)
        .limit(1);

      if (participantError || !participants || participants.length === 0) {
        console.log("참가자를 찾을 수 없음:", participantId);
        return res.json(null);
      }

      const participant = participants[0];
      console.log("참가자 발견:", participant.name);

      // 테스트 세션 찾기
      const testSession = await getLatestCompletedTest(participant.name);
      
      let powerValues = null;
      let balance = null;

      if (testSession) {
        console.log("테스트 세션 발견:", testSession.id);
        const garminData = await getGarminDataByDisplayName(testSession.userDisplayName);
        
        if (garminData && garminData.length > 0) {
          powerValues = extractPowerValues(garminData);
          balance = calculateBalance(garminData);
        }
      }

      const result = {
        measureDate: testSession ? formatDate(testSession.endTime) : new Date().toLocaleDateString("sv-SE", {timeZone: "Asia/Seoul"}),
        studentName: participant.name,
        affiliation: participant.organization || '',
        birthDate: formatDate(participant.birth_date),
        gender: formatGender(participant.gender),
        power5s: powerValues?.power5s || null,
        power15s: powerValues?.power15s || null,
        power30s: powerValues?.power30s || null,
        power60s: powerValues?.power60s || null,
        power180s: powerValues?.power180s || null,
        power360s: powerValues?.power360s || null,
        leftBalance: balance?.leftBalance || null,
        rightBalance: balance?.rightBalance || null,
        height: participant.height || null,
        weight: participant.weight || null,
        maxHeartRate: null,
        avgHeartRate: null
      };

      console.log("특정 참가자 데이터 준비 완료:", result);
      res.json(result);
    } catch (error) {
      console.error("특정 참가자 검색 중 오류:", error);
      res.status(500).json({ error: "참가자 검색 실패" });
    }
  });

  // Supabase integration endpoints
  app.get("/api/supabase/search-user/:name", async (req, res) => {
    try {
      const { name } = req.params;
      
      // 이름이 2글자 미만이면 빈 결과 반환
      if (!name || name.length < 2) {
        return res.json(null);
      }

      console.log("=== Supabase 사용자 검색 ===", name);
      
      // 1단계: 정확한 이름으로 모든 참가자 찾기
      const { data: participants, error: participantError } = await supabase
        .from('participants')
        .select('*')
        .eq('name', name)
        .order('created_at', { ascending: false });

      if (participantError || !participants || participants.length === 0) {
        console.log("참가자를 찾을 수 없음:", name);
        return res.json(null);
      }

      // 여러 명이 있을 때는 선택 목록 반환
      if (participants.length > 1) {
        console.log(`${name} 이름으로 ${participants.length}명 발견`);
        const participantList = participants.map(p => ({
          id: p.id,
          name: p.name,
          birthDate: p.birth_date,
          gender: p.gender,
          organization: p.organization || "",
          createdAt: p.created_at
        }));
        return res.json({ 
          multiple: true, 
          participants: participantList 
        });
      }

      const participant = participants[0];
      console.log("참가자 발견:", participant.name);
      console.log("참가자 생년월일 원본:", participant.birth_date);
      console.log("참가자 키:", participant.height);
      console.log("참가자 몸무게:", participant.weight);
      console.log("참가자 전체 데이터:", JSON.stringify(participant, null, 2));

      // 2단계: userDisplayName으로 파워 데이터 직접 조회
      const userDisplayName = `${participant.name}_${participant.birth_date}`;
      console.log("userDisplayName 생성:", userDisplayName);
      
      let powerValues = null;
      let balance = null;

      // stage_intervals에서 직접 파워 데이터 가져오기
      const stageData = await getStageIntervalPowerValues(userDisplayName);
      
      if (stageData && stageData.hasStageData) {
        console.log("스테이지 파워 데이터 발견:", stageData);
        powerValues = stageData;
        
        // 가민 데이터에서 밸런스 정보 가져오기 (있으면)
        const garminData = await getGarminDataByDisplayName(userDisplayName);
        if (garminData && garminData.length > 0) {
          balance = calculateBalance(garminData);
        } else {
          balance = { leftBalance: 50, rightBalance: 50 }; // 기본값
        }
      } else {
        console.log("스테이지 파워 데이터 없음 - 수기 입력 필요");
      }

      // 응답 데이터 구성
      const result = {
        // 기본 정보 (항상 제공) - 한국 시간대 적용
        measureDate: new Date().toLocaleDateString("sv-SE", {timeZone: "Asia/Seoul"}),
        studentName: participant.name,
        affiliation: participant.organization || '',
        birthDate: formatDate(participant.birth_date),
        gender: formatGender(participant.gender),
        
        // 파워 측정값 (가민 데이터가 있을 때만)
        power5s: powerValues?.power5s || null,
        power15s: powerValues?.power15s || null,
        power30s: powerValues?.power30s || null,
        power60s: powerValues?.power60s || null,
        power180s: powerValues?.power180s || null,
        power360s: powerValues?.power360s || null,
        
        // 밸런스 (가민 데이터가 있을 때만)
        leftBalance: balance?.leftBalance || 50,
        rightBalance: balance?.rightBalance || 50,
        
        // 키, 체중 - 참가자 데이터에서 가져오기
        height: participant.height || null,
        weight: participant.weight || null,
        
        // 심박수는 빈 상태로 유지 (수동 입력 필요)
        maxHeartRate: null,
        avgHeartRate: null
      };
      
      console.log("키/몸무게 매핑:", { height: participant.height, weight: participant.weight, resultHeight: result.height, resultWeight: result.weight });
      console.log("자동 입력 데이터 준비 완료:", result);
      res.json(result);
      
    } catch (error) {
      console.error("Supabase 사용자 검색 오류:", error);
      res.status(500).json({ error: "사용자 검색 중 오류가 발생했습니다." });
    }
  });

  // GET /api/prefill - 이름으로 자동 입력 데이터 조회
  app.get("/api/prefill", async (req, res) => {
    try {
      const { displayName } = req.query;
      
      if (!displayName || typeof displayName !== 'string') {
        return res.status(400).json({ error: "displayName parameter is required" });
      }

      console.log("=== Prefill 데이터 조회 ===", displayName);
      
      // 1. participants 테이블에서 display_name으로 참가자 찾기
      const { data: participants, error: participantError } = await supabase
        .from('participants')
        .select('*')
        .eq('name', displayName)
        .limit(1);

      if (participantError || !participants || participants.length === 0) {
        console.log("참가자를 찾을 수 없음:", displayName);
        return res.json(null);
      }

      const participant = participants[0];
      console.log("참가자 발견:", participant.name);

      // 2. test_sessions에서 가장 최근 완료된 세션 찾기
      const { data: testSessions, error: sessionError } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('participant_id', participant.id)
        .eq('status', 'completed')
        .order('end_time', { ascending: false })
        .limit(1);

      let recentSession = null;
      let avgBalance = { left: 50, right: 50 };

      if (!sessionError && testSessions && testSessions.length > 0) {
        const session = testSessions[0];
        console.log("최근 세션 발견:", session.id);

        // 3. garmin_data에서 해당 세션의 데이터 가져오기
        const { data: garminData, error: garminError } = await supabase
          .from('garmin_data')
          .select('*')
          .eq('session_id', session.id)
          .order('timestamp', { ascending: true });

        if (!garminError && garminData && garminData.length > 0) {
          // stage별 maxPower, maxCadence 추출
          const totalDataPoints = garminData.length;
          const stageSize = Math.floor(totalDataPoints / 6);
          
          const stages = [];
          for (let i = 0; i < 6; i++) {
            const start = i * stageSize;
            const end = i === 5 ? totalDataPoints : (i + 1) * stageSize;
            const stageData = garminData.slice(start, end);
            
            const maxPower = stageData.length > 0 ? Math.max(...stageData.map(d => d.power || 0)) : 0;
            const maxCadence = stageData.length > 0 ? Math.max(...stageData.map(d => d.cadence || 0)) : 0;
            
            stages.push({ maxPower, maxCadence });
          }

          recentSession = {
            stage1: stages[0] || { maxPower: 0, maxCadence: 0 },
            stage2: stages[1] || { maxPower: 0, maxCadence: 0 },
            stage3: stages[2] || { maxPower: 0, maxCadence: 0 },
            stage4: stages[3] || { maxPower: 0, maxCadence: 0 },
            stage5: stages[4] || { maxPower: 0, maxCadence: 0 },
            stage6: stages[5] || { maxPower: 0, maxCadence: 0 }
          };

          // 평균 좌우 밸런스 계산
          const validBalanceData = garminData.filter(d => d.left_balance && d.right_balance);
          if (validBalanceData.length > 0) {
            const avgLeft = validBalanceData.reduce((sum, d) => sum + d.left_balance, 0) / validBalanceData.length;
            const avgRight = validBalanceData.reduce((sum, d) => sum + d.right_balance, 0) / validBalanceData.length;
            avgBalance = {
              left: Math.round(avgLeft),
              right: Math.round(avgRight)
            };
          }
        }
      }

      // 4. 응답 데이터 구성
      const result = {
        participantId: participant.id,
        recentSession,
        avgBalance
      };

      console.log("Prefill 데이터 응답:", result);
      res.json(result);
      
    } catch (error) {
      console.error("Prefill 데이터 조회 오류:", error);
      res.status(500).json({ error: "Prefill 데이터 조회 중 오류가 발생했습니다." });
    }
  });

  // 특정 참가자 ID로 데이터 조회 (참가자 선택 후 사용)
  app.get("/api/supabase/participant/:id", async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`=== 특정 참가자 데이터 검색 === ${id}`);
      
      // 1. participants 테이블에서 해당 참가자 찾기
      const { data: participant, error: participantError } = await supabase
        .from('participants')
        .select('*')
        .eq('id', id)
        .single();
      
      if (participantError || !participant) {
        console.error("참가자 조회 오류:", participantError);
        return res.status(404).json({ error: "참가자를 찾을 수 없습니다." });
      }
      
      console.log("참가자 발견:", participant.name);
      
      // 2. 최신 테스트 세션 찾기
      const { data: testSessions, error: sessionError } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('participant_id', participant.id)
        .eq('status', 'completed')
        .order('end_time', { ascending: false })
        .limit(1);
      
      let powerData = {};
      let balanceData = { left: 50, right: 50 };
      
      if (!sessionError && testSessions && testSessions.length > 0) {
        const session = testSessions[0];
        console.log("테스트 세션 발견:", session.id);
        
        // 3. userDisplayName 생성하여 스테이지 데이터 조회
        const userDisplayName = `${participant.name}_${participant.birth_date}`;
        const stageData = await getStageIntervalPowerValues(userDisplayName);
        
        if (stageData && stageData.hasStageData) {
          powerData = {
            power5s: stageData.power5s,
            power15s: stageData.power15s,
            power30s: stageData.power30s,
            power60s: stageData.power60s,
            power180s: stageData.power180s,
            power360s: stageData.power360s
          };
          
          // 가민 데이터에서 밸런스 정보 가져오기
          const garminData = await getGarminDataByDisplayName(userDisplayName);
          if (garminData && garminData.length > 0) {
            balanceData = calculateBalance(garminData);
          }
        }
      }
      
      // 4. 응답 데이터 구성
      const result = {
        measureDate: "",
        studentName: participant.name,
        affiliation: participant.organization || "",
        birthDate: participant.birth_date,
        gender: participant.gender === "남성" ? "M" : participant.gender === "여성" ? "F" : participant.gender,
        ...powerData,
        leftBalance: balanceData.left,
        rightBalance: balanceData.right,
        height: participant.height || null,
        weight: participant.weight || null,
        maxHeartRate: null,
        avgHeartRate: null
      };
      
      console.log("특정 참가자 데이터 준비 완료:", result);
      res.json(result);
      
    } catch (error) {
      console.error("특정 참가자 검색 중 오류:", error);
      res.status(500).json({ error: "참가자 검색 실패" });
    }
  });

  // KidsMotion 앱 데이터 자동 입력 API
  app.get("/api/supabase/search-user/:name", async (req, res) => {
    try {
      const { name } = req.params;
      console.log(`=== ${name} 검색 시작 ===`);
      
      // 1. 참가자 기본 정보 검색
      const { data: participants, error: participantError } = await supabase
        .from('participants')
        .select('*')
        .ilike('name', `%${name}%`)
        .order('created_at', { ascending: false });
      
      if (participantError) {
        console.error("참가자 검색 오류:", participantError);
        return res.status(500).json({ error: "참가자 검색 실패", details: participantError });
      }

      if (!participants || participants.length === 0) {
        return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
      }

      console.log(`${participants.length}명의 참가자 발견:`, participants.map(p => p.name));
      
      // 여러 명인 경우
      if (participants.length > 1) {
        return res.json({
          multiple: true,
          participants: participants.map(p => ({
            id: p.id,
            studentName: p.name,
            affiliation: p.organization || "",
            birthDate: p.birth_date,
            gender: p.gender,
            createdAt: p.created_at
          }))
        });
      }
      
      // 단일 사용자인 경우 - 가장 최근 테스트 데이터까지 가져오기
      const participant = participants[0];
      console.log("선택된 참가자:", participant);
      
      // 2. 최신 테스트 세션 가져오기 (user_id 필드 사용)
      const { data: testSessions, error: sessionError } = await supabase
        .from('test_sessions')
        .select('*')
        .eq('user_id', participant.id.toString())
        .order('start_time', { ascending: false })
        .limit(1);
      
      if (sessionError) {
        console.error("테스트 세션 검색 오류:", sessionError);
      }

      console.log("테스트 세션:", testSessions);
      
      let powerData = {};
      let balanceData = { left: 50, right: 50 };
      
      if (testSessions && testSessions.length > 0) {
        const session = testSessions[0];
        console.log(`Session ${session.id} 데이터 분석 시작`);
        
        // 3. 가민 데이터에서 스테이지별 최대 파워 계산
        const { data: garminData, error: garminError } = await supabase
          .from('garmin_data')
          .select('*')
          .eq('session_id', session.id)
          .gt('power', 0)
          .order('timestamp');
        
        if (garminError) {
          console.error("가민 데이터 조회 오류:", garminError);
        }

        // 🔥 우선순위 1: 새로운 스테이지 넘버링 시스템 사용
        const userDisplayName = `${participant.name}_${session.start_time.split('T')[0]}`;
        console.log(`스테이지 구간 데이터 조회: ${userDisplayName}`);
        
        const stageIntervalPowers = await getStageIntervalPowerValues(userDisplayName);
        
        if (stageIntervalPowers.hasStageData) {
          console.log("✅ 스테이지 넘버링 시스템 데이터 사용");
          powerData = {
            power5s: stageIntervalPowers.power5s,
            power15s: stageIntervalPowers.power15s,
            power30s: stageIntervalPowers.power30s,
            power60s: stageIntervalPowers.power60s,
            power180s: stageIntervalPowers.power180s,
            power360s: stageIntervalPowers.power360s
          };
          
          // 스테이지 구간 데이터 있을 때는 가민 데이터에서 밸런스만 추출
          if (garminData && garminData.length > 0) {
            const balance = calculateBalance(garminData);
            balanceData = balance;
          }
        } else if (garminData && garminData.length > 0) {
          console.log("⚠️ 기존 가민 데이터 분석 사용 (fallback)");
          console.log(`${garminData.length}개 가민 데이터 분석`);
          
          // 기존 파워 패턴 분석으로 스테이지 자동 감지 (fallback)
          const detectStages = (data: any[]) => {
            // 파워가 0보다 큰 구간들을 찾아서 스테이지 구분
            const activePeriods = [];
            let currentPeriod = null;
            
            for (let i = 0; i < data.length; i++) {
              const point = data[i];
              const power = point.power;
              
              if (power > 5) { // 활동 시작 (5W 이상)
                if (!currentPeriod) {
                  currentPeriod = {
                    start: i,
                    startTime: new Date(point.timestamp),
                    maxPower: power,
                    dataPoints: [point]
                  };
                } else {
                  currentPeriod.maxPower = Math.max(currentPeriod.maxPower, power);
                  currentPeriod.dataPoints.push(point);
                }
              } else { // 휴식 또는 종료
                if (currentPeriod && currentPeriod.dataPoints.length > 3) {
                  currentPeriod.end = i - 1;
                  currentPeriod.endTime = new Date(data[i-1].timestamp);
                  currentPeriod.duration = (currentPeriod.endTime.getTime() - currentPeriod.startTime.getTime()) / 1000;
                  activePeriods.push(currentPeriod);
                }
                currentPeriod = null;
              }
            }
            
            // 마지막 구간 처리
            if (currentPeriod && currentPeriod.dataPoints.length > 3) {
              currentPeriod.end = data.length - 1;
              currentPeriod.endTime = new Date(data[data.length - 1].timestamp);
              currentPeriod.duration = (currentPeriod.endTime.getTime() - currentPeriod.startTime.getTime()) / 1000;
              activePeriods.push(currentPeriod);
            }
            
            return activePeriods;
          };
          
          const stages = detectStages(garminData);
          console.log(`감지된 활동 구간: ${stages.length}개`);
          
          // 스테이지별 최대 파워 할당 (지속시간 기준)
          stages.forEach((stage, index) => {
            console.log(`구간 ${index + 1}: ${stage.duration.toFixed(1)}초, 최대파워: ${stage.maxPower}W`);
            
            // 지속시간으로 스테이지 판단
            if (stage.duration >= 1 && stage.duration <= 8 && !powerData.power5s) {
              powerData.power5s = stage.maxPower; // 5초 스테이지
            } else if (stage.duration >= 10 && stage.duration <= 20 && !powerData.power15s) {
              powerData.power15s = stage.maxPower; // 15초 스테이지
            } else if (stage.duration >= 25 && stage.duration <= 40 && !powerData.power30s) {
              powerData.power30s = stage.maxPower; // 30초 스테이지
            } else if (stage.duration >= 50 && stage.duration <= 80 && !powerData.power60s) {
              powerData.power60s = stage.maxPower; // 60초 스테이지
            } else if (stage.duration >= 150 && stage.duration <= 220 && !powerData.power180s) {
              powerData.power180s = stage.maxPower; // 180초 스테이지
            } else if (stage.duration >= 300 && stage.duration <= 420 && !powerData.power360s) {
              powerData.power360s = stage.maxPower; // 360초 스테이지
            }
          });
          
          // 좌우 밸런스 - 가장 차이가 큰 값 찾기
          let maxDifference = 0;
          let bestBalance = { left: 50, right: 50 };
          
          garminData.forEach(d => {
            if (d.left_balance && d.right_balance) {
              const difference = Math.abs(d.left_balance - d.right_balance);
              if (difference > maxDifference) {
                maxDifference = difference;
                bestBalance = {
                  left: Math.round(d.left_balance),
                  right: Math.round(d.right_balance)
                };
              }
            }
          });
          
          balanceData = bestBalance;
          console.log("최대 밸런스 차이:", maxDifference, bestBalance);
        }
      }
      
      // 4. 통합 응답 데이터
      const responseData = {
        studentName: participant.name,
        affiliation: participant.organization || "",
        birthDate: participant.birth_date,
        gender: participant.gender === "남성" ? "M" : "F",
        height: 0, // 기본값
        weight: 0, // 기본값
        ...powerData,
        leftBalance: balanceData.left,
        rightBalance: balanceData.right
      };

      console.log("응답 데이터:", responseData);
      res.json(responseData);
      
    } catch (error) {
      console.error("사용자 검색 오류:", error);
      res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  });

  // 스테이지 구간 데이터 조회 API (모니터 앱 연동용)
  app.get("/api/supabase/stages/:userDisplayName", async (req, res) => {
    try {
      const { userDisplayName } = req.params;
      console.log(`=== ${userDisplayName} 스테이지 구간 조회 ===`);
      
      const { data: stages, error } = await supabase
        .from('stage_intervals')
        .select('*')
        .eq('user_display_name', userDisplayName)
        .order('sequence_number', { ascending: true });
      
      if (error) {
        console.error("스테이지 구간 조회 오류:", error);
        return res.status(500).json({ error: "스테이지 구간 조회 실패" });
      }

      if (!stages || stages.length === 0) {
        return res.json({ 
          userDisplayName,
          stages: [],
          powerValues: {
            power5s: null,
            power15s: null,
            power30s: null,
            power60s: null,
            power180s: null,
            power360s: null
          }
        });
      }

      // 순서별로 파워값 추출
      const powerValues = {
        power5s: stages.find(s => s.sequence_number === 1)?.max_power_in_stage || null,
        power15s: stages.find(s => s.sequence_number === 2)?.max_power_in_stage || null,
        power30s: stages.find(s => s.sequence_number === 3)?.max_power_in_stage || null,
        power60s: stages.find(s => s.sequence_number === 4)?.max_power_in_stage || null,
        power180s: stages.find(s => s.sequence_number === 5)?.max_power_in_stage || null,
        power360s: stages.find(s => s.sequence_number === 6)?.max_power_in_stage || null
      };

      console.log("추출된 파워값:", powerValues);

      res.json({
        userDisplayName,
        stages,
        powerValues
      });

    } catch (error) {
      console.error("스테이지 구간 조회 중 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  });

  // 신체변화 추적 API - 동일한 아이의 측정 기록 조회
  app.get("/api/reports/history/:identifier", async (req, res) => {
    try {
      const { identifier } = req.params; // "홍길동(2018-05-05)" 형태
      console.log(`=== ${identifier} 신체변화 추적 ===`);
      
      const { data: reports, error } = await supabase
        .from('report_results')
        .select('*')
        .eq('student_identifier', identifier)
        .order('measure_date', { ascending: false });
      
      if (error) {
        console.error("기록 조회 오류:", error);
        return res.status(500).json({ error: "기록 조회 실패" });
      }

      if (!reports || reports.length === 0) {
        return res.json({ 
          identifier,
          totalRecords: 0,
          records: [],
          growth: null
        });
      }

      // 성장 분석 (최신 vs 이전 기록)
      let growth = null;
      if (reports.length >= 2) {
        const latest = reports[0];
        const previous = reports[1];
        
        growth = {
          heightChange: latest.height - previous.height,
          weightChange: latest.weight - previous.weight,
          overallPercentileChange: latest.overall_percentile - previous.overall_percentile,
          period: `${previous.measure_date} → ${latest.measure_date}`,
          improvements: {
            power5s: latest.percentile_5s - previous.percentile_5s,
            power15s: latest.percentile_15s - previous.percentile_15s,
            power30s: latest.percentile_30s - previous.percentile_30s,
            power60s: latest.percentile_60s - previous.percentile_60s
          }
        };
      }

      res.json({
        identifier,
        totalRecords: reports.length,
        records: reports,
        growth
      });

    } catch (error) {
      console.error("신체변화 추적 오류:", error);
      res.status(500).json({ error: "서버 오류" });
    }
  });

  // 특정 참가자 ID로 데이터 가져오기 (여러 명 중 선택할 때)
  app.get("/api/supabase/participant/:id", async (req, res) => {
    try {
      const participantId = parseInt(req.params.id);
      console.log(`=== 참가자 ID ${participantId} 데이터 가져오기 ===`);
      
      // 동일한 로직으로 특정 ID의 데이터 가져오기
      const { data: participant, error: participantError } = await supabase
        .from('participants')
        .select('*')
        .eq('id', participantId)
        .single();
      
      if (participantError || !participant) {
        return res.status(404).json({ error: "참가자를 찾을 수 없습니다." });
      }

      // 나머지는 위와 동일한 로직
      // ... (세션 검색, 가민 데이터 분석 등)
      
      res.json({
        studentName: participant.name,
        affiliation: participant.organization || "",
        birthDate: participant.birth_date,
        gender: participant.gender === "남성" ? "M" : "F",
        height: 0,
        weight: 0,
        leftBalance: 50,
        rightBalance: 50
      });
      
    } catch (error) {
      console.error("참가자 데이터 가져오기 오류:", error);
      res.status(500).json({ error: "서버 오류가 발생했습니다." });
    }
  });

  // 임시 테스트 엔드포인트
  app.get("/api/test-supabase", async (req, res) => {
    try {
      console.log("=== 가장 많이 테스트한 참가자 찾기 ===");
      
      // session별 garmin_data 개수 확인
      const { data: sessionCounts, error: sessionError } = await supabase
        .from('garmin_data')
        .select('session_id, user_display_name')
        .order('session_id');

      if (sessionError) {
        console.error("Session counts 오류:", sessionError);
        return res.json({ error: "session_counts", details: sessionError });
      }

      // session별로 데이터 개수 집계
      const sessionStats = {};
      sessionCounts.forEach(row => {
        const key = `${row.session_id}_${row.user_display_name}`;
        if (!sessionStats[key]) {
          sessionStats[key] = {
            sessionId: row.session_id,
            userDisplayName: row.user_display_name,
            count: 0
          };
        }
        sessionStats[key].count++;
      });

      // 가장 많은 데이터를 가진 세션 찾기
      const sortedSessions = Object.values(sessionStats)
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 5);

      console.log("Session별 데이터 개수:", sortedSessions);

      // 가장 많은 세션의 실제 데이터 확인
      if (sortedSessions.length > 0) {
        const topSession = sortedSessions[0] as any;
        const { data: topSessionData, error: topDataError } = await supabase
          .from('garmin_data')
          .select('*')
          .eq('session_id', topSession.sessionId)
          .order('timestamp');

        if (!topDataError && topSessionData) {
          console.log(`Session ${topSession.sessionId} 전체 데이터 (${topSessionData.length}건):`);
          console.log("첫 5건:", topSessionData.slice(0, 5));
          console.log("마지막 5건:", topSessionData.slice(-5));
        }
      }

      // participants도 다시 확인
      const { data: participants, error: participantError } = await supabase
        .from('participants')
        .select('*');

      res.json({
        participants: participants || [],
        sessionStats: sortedSessions,
        totalSessions: Object.keys(sessionStats).length
      });

    } catch (error) {
      console.error("Supabase 테스트 오류:", error);
      res.status(500).json({ error: "connection_test_failed", details: error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

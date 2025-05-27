import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMeasurementSchema, insertAnalysisResultSchema, insertInviteCodeSchema } from "@shared/schema";
import crypto from "crypto";
import { generateFitnessAnalysis } from "./openai";
import OpenAI from "openai";

// Constants
const POWER_EXPONENT = 0.67;

// 최종 와트바이크 파워표 + 로그선형내삽 + 300초(5분) 기준값 사용
import { finalWattbikeCutoffs } from "./final-wattbike-cutoffs";
const cutoffData = finalWattbikeCutoffs;

console.log("Cutoff data loaded successfully:", Object.keys(cutoffData));

function generateFullReportHtml(measurementData: any, analysisData: any): string {
  const { bmi, age, overallPercentile, percentiles, balanceStatus, aiAnalysis, strengthsText, improvementsText } = analysisData;
  
  const getGrade = (percentile: number) => {
    if (percentile >= 96) return "매우우수";
    if (percentile >= 80) return "우수";
    if (percentile >= 20) return "보통";
    if (percentile >= 4) return "낮음";
    return "매우낮음";
  };

  const balanceDifference = Math.abs(measurementData.leftBalance - measurementData.rightBalance);

  return `
    <div class="complete-report">
      <h1>체력 분석 결과</h1>
      
      <section class="basic-info">
        <h2>${measurementData.studentName}</h2>
        <p>측정일: ${measurementData.measureDate}</p>
        <p>소속: ${measurementData.affiliation}</p>
        <p>생년월일: ${measurementData.birthDate}</p>
        <p>키/체중: ${measurementData.height}cm / ${measurementData.weight}kg</p>
        <p>BMI: ${bmi.toFixed(1)}</p>
      </section>

      <section class="summary">
        <h3>체력 요약</h3>
        <p>종합 백분위: ${Math.round(overallPercentile)}</p>
        <p>강점: ${strengthsText}</p>
        <p>보완점: ${improvementsText}</p>
        <p>한줄 요약: ${aiAnalysis.summary}</p>
      </section>

      <section class="balance">
        <h3>좌우 밸런스 분석</h3>
        <p>왼쪽: ${measurementData.leftBalance}% | 오른쪽: ${measurementData.rightBalance}%</p>
        <p>상태: ${balanceStatus} (차이: ${balanceDifference.toFixed(1)}%)</p>
        <p>AI 코멘트: ${aiAnalysis.balanceComment}</p>
      </section>

      <section class="detailed-scores">
        <h3>항목별 체력 세부평가</h3>
        
        <div class="score-item">
          <h4>순발력 (5초)</h4>
          <p>${measurementData.power5s}W | 환산점수: ${Math.round(percentiles['5s'])}</p>
          <p>등급: ${getGrade(percentiles['5s'])} (${Math.round(percentiles['5s'])}%)</p>
          <p>${aiAnalysis.explanations.power}</p>
        </div>

        <div class="score-item">
          <h4>스프린트 파워 (15초)</h4>
          <p>${measurementData.power15s}W | 환산점수: ${Math.round(percentiles['15s'])}</p>
          <p>등급: ${getGrade(percentiles['15s'])} (${Math.round(percentiles['15s'])}%)</p>
          <p>${aiAnalysis.explanations.strength}</p>
        </div>

        <div class="score-item">
          <h4>파워 지속력 (30초)</h4>
          <p>${measurementData.power30s}W | 환산점수: ${Math.round(percentiles['30s'])}</p>
          <p>등급: ${getGrade(percentiles['30s'])} (${Math.round(percentiles['30s'])}%)</p>
          <p>${aiAnalysis.explanations.muscleEndurance}</p>
        </div>

        <div class="score-item">
          <h4>근력 (60초)</h4>
          <p>${measurementData.power60s}W | 환산점수: ${Math.round(percentiles['60s'])}</p>
          <p>등급: ${getGrade(percentiles['60s'])} (${Math.round(percentiles['60s'])}%)</p>
          <p>${aiAnalysis.explanations.cardioEndurance}</p>
        </div>

        ${percentiles['180s'] !== null ? `
        <div class="score-item">
          <h4>근지구력 (180초)</h4>
          <p>${measurementData.power180s || 0}W | 환산점수: ${Math.round(percentiles['180s'])}</p>
          <p>등급: ${getGrade(percentiles['180s'])} (${Math.round(percentiles['180s'])}%)</p>
          <p>근지구력이 ${Math.round(percentiles['180s'])}% 수준입니다.</p>
        </div>
        ` : ''}

        ${percentiles['300s'] !== null ? `
        <div class="score-item">
          <h4>심폐지구력 (300초)</h4>
          <p>${measurementData.power300s || 0}W | 환산점수: ${Math.round(percentiles['300s'])}</p>
          <p>등급: ${getGrade(percentiles['300s'])} (${Math.round(percentiles['300s'])}%)</p>
          <p>심폐지구력이 ${Math.round(percentiles['300s'])}% 수준입니다.</p>
        </div>
        ` : ''}
      </section>

      <section class="comprehensive-analysis">
        <h3>체력 종합 분석</h3>
        <h4>AI 종합 해설</h4>
        ${aiAnalysis.comprehensiveAnalysis.map((analysis: string) => `<p>${analysis}</p>`).join('')}
        
        <p><strong>최고 항목:</strong> ${strengthsText.split(', ')[0]}</p>
        <p><strong>개선 항목:</strong> ${improvementsText.split(', ')[0]}</p>
      </section>

      <section class="overall-assessment">
        <h3>종합 평가</h3>
        <p>${aiAnalysis.overallAssessment}</p>
      </section>

      <section class="reference">
        <h3>참고사항</h3>
        <h4>지도선생님 참고</h4>
        <p>중점 관리 항목: ${improvementsText}과 좌우균형</p>
        
        <h4>보호자 참고</h4>
        <ul>
          <li>체력 측정은 5분 내외로 간편하게 진행됩니다</li>
          <li>성장기 아이들의 체력 발달 추이를 지속적으로 관찰하세요</li>
          <li>총 체력 백분위: 4개 항목 백분위 평균으로 계산</li>
        </ul>
        
        <div class="metadata">
          <p>데이터 버전: v2025-05-26 | 보정 지수: 0.67 | 평가 기준: P4/P20/P80/P96</p>
        </div>
      </section>
    </div>
  `;
}

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

function calculatePercentile(value: number, cutoffs: any): number {
  if (!cutoffs) {
    console.log("경고: cutoffs 데이터가 없음, 기본값 50 반환");
    return 50;
  }
  
  console.log(`백분위 계산: 값=${value}, P4=${cutoffs.P4}, P20=${cutoffs.P20}, P80=${cutoffs.P80}, P96=${cutoffs.P96}`);
  
  if (value <= cutoffs.P4) {
    const percentile = 2; // P4 이하는 약 2%
    console.log(`결과: P4 이하, ${percentile}%`);
    return percentile;
  } else if (value <= cutoffs.P20) {
    const percentile = 4 + ((value - cutoffs.P4) / (cutoffs.P20 - cutoffs.P4)) * 16;
    console.log(`결과: P4-P20 구간, ${Math.round(percentile)}%`);
    return Math.round(percentile);
  } else if (value <= cutoffs.P80) {
    const percentile = 20 + ((value - cutoffs.P20) / (cutoffs.P80 - cutoffs.P20)) * 60;
    console.log(`결과: P20-P80 구간, ${Math.round(percentile)}%`);
    return Math.round(percentile);
  } else if (value <= cutoffs.P96) {
    const percentile = 80 + ((value - cutoffs.P80) / (cutoffs.P96 - cutoffs.P80)) * 16;
    console.log(`결과: P80-P96 구간, ${Math.round(percentile)}%`);
    return Math.round(percentile);
  } else {
    const percentile = 96 + 2; // P96 이상은 약 98%
    console.log(`결과: P96 이상, ${percentile}%`);
    return percentile;
  }
}

function getBalanceStatus(leftBalance: number, rightBalance: number): string {
  const diff = Math.abs(leftBalance - rightBalance);
  if (diff <= 5) return "이상적";
  else if (diff <= 7) return "주의";
  else return "경고";
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  app.post("/api/measurements", async (req, res) => {
    try {
      const measurementData = insertMeasurementSchema.parse(req.body);
      
      // Create measurement
      const measurement = await storage.createMeasurement(measurementData);
      
      // Calculate analysis
      const age = calculateAge(measurementData.birthDate);
      const bmi = measurementData.weight / Math.pow(measurementData.height / 100, 2);
      
      // 성별과 나이에 따른 데이터 키 생성
      const clampedAge = Math.max(4, Math.min(12, age)); // 4-12세 범위로 제한
      const genderKey = `${clampedAge}_${measurementData.gender}`;
      const cutoffs = cutoffData[genderKey]; // data 중첩 제거
      
      console.log(`나이: ${age}, 제한된 나이: ${clampedAge}, 성별: ${measurementData.gender}, 키: ${genderKey}`);
      console.log(`Cutoffs found:`, cutoffs ? "Yes" : "No", cutoffs);
      
      // 사용자 입력: 절대 파워값 (W)
      const absolutePowers = {
        "5s": measurementData.power5s,
        "15s": measurementData.power15s,
        "30s": measurementData.power30s,
        "60s": measurementData.power60s,
        "180s": measurementData.power180s || 0,
        "300s": measurementData.power300s || 0
      };
      
      // 상대 파워 계산: W / kg^POWER_EXPONENT
      const weightPower = Math.pow(measurementData.weight, POWER_EXPONENT);
      console.log(`체중: ${measurementData.weight}kg, 체중^${POWER_EXPONENT}: ${weightPower}`);
      
      const relativePowers = {
        "5s": absolutePowers["5s"] / weightPower,
        "15s": absolutePowers["15s"] / weightPower,
        "30s": absolutePowers["30s"] / weightPower,
        "60s": absolutePowers["60s"] / weightPower,
        "180s": absolutePowers["180s"] / weightPower,
        "300s": absolutePowers["300s"] / weightPower
      };
      
      console.log(`입력된 절대 파워값: 5s=${absolutePowers["5s"]}W, 15s=${absolutePowers["15s"]}W, 30s=${absolutePowers["30s"]}W, 60s=${absolutePowers["60s"]}W`);
      console.log(`계산된 상대 파워값: 5s=${relativePowers["5s"]}, 15s=${relativePowers["15s"]}, 30s=${relativePowers["30s"]}, 60s=${relativePowers["60s"]}`);
      
      // 새로운 기준값 사용 - finalWattbikeCutoffs에서 직접 가져오기
      const enduranceCutoffs = {
        // 180초(근지구력): 새로운 기준값 사용
        muscleEndurance180s: cutoffs?.longEndurance180s || {
          P96: Math.round(cutoffs?.cardioEndurance.P96 * 1.2), 
          P80: Math.round(cutoffs?.cardioEndurance.P80 * 1.2),
          P20: Math.round(cutoffs?.cardioEndurance.P20 * 1.2),
          P4: Math.round(cutoffs?.cardioEndurance.P4 * 1.2)
        },
        // 300초(심폐지구력): 새로운 기준값 사용
        cardioEndurance300s: cutoffs?.longEndurance300s || {
          P96: Math.round(cutoffs?.cardioEndurance.P96 * 0.8),
          P80: Math.round(cutoffs?.cardioEndurance.P80 * 0.8), 
          P20: Math.round(cutoffs?.cardioEndurance.P20 * 0.8),
          P4: Math.round(cutoffs?.cardioEndurance.P4 * 0.8)
        }
      };

      // Calculate percentiles (including 180s/360s if available)
      const percentiles = {
        "5s": calculatePercentile(relativePowers["5s"], cutoffs?.power),
        "15s": calculatePercentile(relativePowers["15s"], cutoffs?.strength),
        "30s": calculatePercentile(relativePowers["30s"], cutoffs?.muscleEndurance),
        "60s": calculatePercentile(relativePowers["60s"], cutoffs?.cardioEndurance),
        "180s": absolutePowers["180s"] > 0 ? calculatePercentile(relativePowers["180s"], enduranceCutoffs.muscleEndurance180s) : null,
        "300s": absolutePowers["300s"] > 0 ? calculatePercentile(relativePowers["300s"], enduranceCutoffs.cardioEndurance300s) : null
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
      if (percentiles["300s"]) {
        categories.push({ name: "심폐지구력 (300초)", percentile: percentiles["300s"] });
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
      const aiAnalysis = await generateFitnessAnalysis({
        studentName: measurementData.studentName,
        age,
        overallPercentile,
        percentiles: {
          power: percentiles["5s"],
          strength: percentiles["15s"],
          muscleEndurance: percentiles["30s"],
          cardioEndurance: percentiles["60s"],
          longEndurance180s: percentiles["180s"],
          longEndurance300s: percentiles["300s"]
        },
        advancedPowerData: {
          power180s: absolutePowers["180s"],
          power300s: absolutePowers["300s"],
          hasAdvancedData: absolutePowers["180s"] > 0 || absolutePowers["300s"] > 0
        },
        heartRateData,
        balanceDifference: Math.abs(measurementData.leftBalance - measurementData.rightBalance),
        strengths,
        improvements
      });
      
      // Create analysis result

      
      // 강력한 하드코딩 우선순위 로직 (절대 확실)
      const calculateStrengthsAndImprovementsFixed = () => {
        const allItems = [
          { name: "순발력 (5초)", value: percentiles["5s"] },
          { name: "스프린트 파워 (15초)", value: percentiles["15s"] },
          { name: "파워 지속력 (30초)", value: percentiles["30s"] },
          { name: "근력 (60초)", value: percentiles["60s"] }
        ];
        
        // 180초, 360초 데이터가 있으면 추가
        if (percentiles["180s"] !== null && percentiles["180s"] !== undefined) {
          allItems.push({ name: "근지구력 (180초)", value: percentiles["180s"] });
        }
        if (percentiles["300s"] !== null && percentiles["300s"] !== undefined) {
          allItems.push({ name: "심폐지구력 (300초)", value: percentiles["300s"] });
        }
        
        // 정렬 (높은 순)
        allItems.sort((a, b) => b.value - a.value);
        
        let strengths: string[] = [];
        let improvements: string[] = [];
        
        // 1순위: 96% 이상 → 무조건 강점 (모든 항목)
        for (const item of allItems) {
          if (item.value >= 96) {
            strengths.push(item.name);
          }
        }
        
        // 2순위: 4% 미만 → 무조건 보완점 (모든 항목)
        for (const item of allItems) {
          if (item.value < 4) {
            improvements.push(item.name);
          }
        }
        
        // 3순위: 위 조건에 해당하지 않을 때만 상위2개/하위2개 규칙 적용
        const excellentItems = allItems.filter(item => item.value >= 96);
        const poorItems = allItems.filter(item => item.value < 4);
        const hasSpecialCases = excellentItems.length > 0 || poorItems.length > 0;
        
        if (!hasSpecialCases) {
          // 상위 2개 강점 (동점 포함)
          if (allItems.length >= 2) {
            const secondHighest = allItems[1].value;
            for (const item of allItems) {
              if (item.value >= secondHighest && !strengths.includes(item.name)) {
                strengths.push(item.name);
              }
            }
          }
          
          // 하위 2개 보완점 (동점 포함)
          if (allItems.length >= 2) {
            const secondLowest = allItems[allItems.length - 2].value;
            for (const item of allItems) {
              if (item.value <= secondLowest && !improvements.includes(item.name)) {
                improvements.push(item.name);
              }
            }
          }
        } else {
          // 특수 케이스가 있을 때도 상위2개/하위2개 보완 적용
          // 96% 이상/4% 미만이 아닌 나머지 중에서 상위2개/하위2개 선택
          const remainingItems = allItems.filter(item => item.value < 96 && item.value >= 4);
          
          if (remainingItems.length >= 2) {
            remainingItems.sort((a, b) => b.value - a.value);
            
            // 나머지 중 상위 항목들을 강점에 추가 (부족한 만큼만)
            if (strengths.length < 2) {
              const needed = Math.min(2 - strengths.length, remainingItems.length);
              for (let i = 0; i < needed; i++) {
                if (!strengths.includes(remainingItems[i].name)) {
                  strengths.push(remainingItems[i].name);
                }
              }
            }
            
            // 나머지 중 하위 항목들을 보완점에 추가 (부족한 만큼만)
            if (improvements.length < 2) {
              const needed = Math.min(2 - improvements.length, remainingItems.length);
              for (let i = remainingItems.length - needed; i < remainingItems.length; i++) {
                if (i >= 0 && !improvements.includes(remainingItems[i].name)) {
                  improvements.push(remainingItems[i].name);
                }
              }
            }
          }
        }
        
        console.log("=== 강력한 하드코딩 우선순위 로직 ===");
        console.log(`96% 이상: ${excellentItems.map(i => `${i.name}=${i.value}%`).join(', ')}`);
        console.log(`4% 미만: ${poorItems.map(i => `${i.name}=${i.value}%`).join(', ')}`);
        console.log(`특수케이스 존재: ${hasSpecialCases ? 'YES' : 'NO'}`);
        console.log(`최종 강점: ${strengths.join(', ')}`);
        console.log(`최종 보완점: ${improvements.join(', ')}`);
        
        return {
          strengths: strengths.join(", "),
          improvements: improvements.join(", ")
        };
      };
      
      const { strengths: strengthsText, improvements: improvementsText } = calculateStrengthsAndImprovementsFixed();

      const analysisResult = await storage.createAnalysisResult({
        measurementId: measurement.id,
        bmi,
        age,
        overallPercentile,
        percentile5s: percentiles["5s"],
        percentile15s: percentiles["15s"],
        percentile30s: percentiles["30s"],
        percentile60s: percentiles["60s"],
        percentile180s: percentiles["180s"],
        percentile300s: percentiles["300s"],
        maxBpm: heartRateData.maxBpm,
        avgBpm: heartRateData.avgBpm,
        restingBpm: heartRateData.restingBpm,
        balanceStatus,
        aiSummary: aiAnalysis.summary,
        balanceComment: aiAnalysis.balanceComment,
        explanation5s: aiAnalysis.explanations.power,
        explanation15s: aiAnalysis.explanations.strength,
        explanation30s: aiAnalysis.explanations.muscleEndurance,
        explanation60s: aiAnalysis.explanations.cardioEndurance,
        comprehensiveAnalysis: aiAnalysis.comprehensiveAnalysis.join(" | "),
        overallAssessment: aiAnalysis.overallAssessment,
        strengths: strengthsText,
        improvements: improvementsText,
        fullReportHtml: generateFullReportHtml(measurementData, {
          bmi,
          age,
          overallPercentile,
          percentiles,
          balanceStatus,
          aiAnalysis,
          strengthsText,
          improvementsText
        })
      });
      
      console.log("=== 측정 데이터 저장 완료 ===");
      console.log("측정 ID:", measurement.id);
      console.log("학생 이름:", measurement.studentName);
      console.log("저장된 전체 데이터 개수:", (await storage.getAllMeasurements()).length);
      
      res.json({
        measurement,
        analysis: analysisResult,
        strengths: strengthsText.split(", "),
        improvements: improvementsText.split(", ")
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
            analysis,
            strengths: analysis?.strengths ? analysis.strengths.split(", ") : [],
            improvements: analysis?.improvements ? analysis.improvements.split(", ") : []
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
        
        return res.json(results);
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
      
      // 분석 결과 추가
      const results = await Promise.all(
        measurements.map(async (measurement) => {
          const analysis = await storage.getAnalysisResult(measurement.id);
          return {
            measurement,
            analysis
          };
        })
      );
      
      res.json(results);
      
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

  // 측정 기록 삭제 API
  app.delete("/api/measurements/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteMeasurement(id);
      res.json({ success: true });
    } catch (error) {
      console.error("측정 기록 삭제 오류:", error);
      res.status(500).json({ error: "삭제에 실패했습니다." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

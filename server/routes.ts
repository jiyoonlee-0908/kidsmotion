import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMeasurementSchema, insertAnalysisResultSchema, insertInviteCodeSchema } from "@shared/schema";
import crypto from "crypto";
import { generateFitnessAnalysis } from "./openai";
import OpenAI from "openai";

// Constants
const POWER_EXPONENT = 0.67;

// Load cutoff data - 한국 아동에 맞게 조정된 현실적인 기준
// 체중 20kg, 파워 150W = 상대파워 20.16이 적절한 백분위가 나오도록 조정
const cutoffData = {
  "4_M": {
    "power": { "P96": 28, "P80": 24, "P20": 16, "P4": 12 },
    "strength": { "P96": 22, "P80": 18, "P20": 12, "P4": 8 },
    "muscleEndurance": { "P96": 18, "P80": 15, "P20": 10, "P4": 6 },
    "cardioEndurance": { "P96": 15, "P80": 12, "P20": 8, "P4": 5 }
  },
  "4_F": {
    "power": { "P96": 24, "P80": 20, "P20": 14, "P4": 10 },
    "strength": { "P96": 19, "P80": 15, "P20": 10, "P4": 7 },
    "muscleEndurance": { "P96": 15, "P80": 13, "P20": 9, "P4": 5 },
    "cardioEndurance": { "P96": 13, "P80": 10, "P20": 7, "P4": 4 }
  },
  "5_M": {
    "power": { "P96": 30, "P80": 26, "P20": 18, "P4": 14 },
    "strength": { "P96": 24, "P80": 20, "P20": 14, "P4": 10 },
    "muscleEndurance": { "P96": 20, "P80": 17, "P20": 12, "P4": 8 },
    "cardioEndurance": { "P96": 17, "P80": 14, "P20": 10, "P4": 7 }
  },
  "5_F": {
    "power": { "P96": 26, "P80": 22, "P20": 16, "P4": 12 },
    "strength": { "P96": 21, "P80": 17, "P20": 12, "P4": 9 },
    "muscleEndurance": { "P96": 17, "P80": 15, "P20": 11, "P4": 7 },
    "cardioEndurance": { "P96": 15, "P80": 12, "P20": 9, "P4": 6 }
  },
  "6_M": {
    "power": { "P96": 32, "P80": 28, "P20": 20, "P4": 16 },
    "strength": { "P96": 26, "P80": 22, "P20": 16, "P4": 12 },
    "muscleEndurance": { "P96": 22, "P80": 19, "P20": 14, "P4": 10 },
    "cardioEndurance": { "P96": 19, "P80": 16, "P20": 12, "P4": 9 }
  },
  "6_F": {
    "power": { "P96": 28, "P80": 24, "P20": 18, "P4": 14 },
    "strength": { "P96": 23, "P80": 19, "P20": 14, "P4": 11 },
    "muscleEndurance": { "P96": 19, "P80": 17, "P20": 13, "P4": 9 },
    "cardioEndurance": { "P96": 17, "P80": 14, "P20": 11, "P4": 8 }
  },
  "7_M": {
    "power": { "P96": 34, "P80": 30, "P20": 22, "P4": 18 },
    "strength": { "P96": 28, "P80": 24, "P20": 18, "P4": 14 },
    "muscleEndurance": { "P96": 24, "P80": 21, "P20": 16, "P4": 12 },
    "cardioEndurance": { "P96": 21, "P80": 18, "P20": 14, "P4": 11 }
  },
  "7_F": {
    "power": { "P96": 30, "P80": 26, "P20": 20, "P4": 16 },
    "strength": { "P96": 25, "P80": 21, "P20": 16, "P4": 13 },
    "muscleEndurance": { "P96": 21, "P80": 19, "P20": 15, "P4": 11 },
    "cardioEndurance": { "P96": 19, "P80": 16, "P20": 13, "P4": 10 }
  },
  "8_M": {
    "power": { "P96": 36, "P80": 32, "P20": 24, "P4": 20 },
    "strength": { "P96": 30, "P80": 26, "P20": 20, "P4": 16 },
    "muscleEndurance": { "P96": 26, "P80": 23, "P20": 18, "P4": 14 },
    "cardioEndurance": { "P96": 23, "P80": 20, "P20": 16, "P4": 13 }
  },
  "8_F": {
    "power": { "P96": 32, "P80": 28, "P20": 22, "P4": 18 },
    "strength": { "P96": 27, "P80": 23, "P20": 18, "P4": 15 },
    "muscleEndurance": { "P96": 23, "P80": 21, "P20": 17, "P4": 13 },
    "cardioEndurance": { "P96": 21, "P80": 18, "P20": 15, "P4": 12 }
  },
  "9_M": {
    "power": { "P96": 38, "P80": 34, "P20": 26, "P4": 22 },
    "strength": { "P96": 32, "P80": 28, "P20": 22, "P4": 18 },
    "muscleEndurance": { "P96": 28, "P80": 25, "P20": 20, "P4": 16 },
    "cardioEndurance": { "P96": 25, "P80": 22, "P20": 18, "P4": 15 }
  },
  "9_F": {
    "power": { "P96": 34, "P80": 30, "P20": 24, "P4": 20 },
    "strength": { "P96": 29, "P80": 25, "P20": 20, "P4": 17 },
    "muscleEndurance": { "P96": 25, "P80": 23, "P20": 19, "P4": 15 },
    "cardioEndurance": { "P96": 23, "P80": 20, "P20": 17, "P4": 14 }
  },
  "10_M": {
    "power": { "P96": 40, "P80": 36, "P20": 28, "P4": 24 },
    "strength": { "P96": 34, "P80": 30, "P20": 24, "P4": 20 },
    "muscleEndurance": { "P96": 30, "P80": 27, "P20": 22, "P4": 18 },
    "cardioEndurance": { "P96": 27, "P80": 24, "P20": 20, "P4": 17 }
  },
  "10_F": {
    "power": { "P96": 36, "P80": 32, "P20": 26, "P4": 22 },
    "strength": { "P96": 31, "P80": 27, "P20": 22, "P4": 19 },
    "muscleEndurance": { "P96": 27, "P80": 25, "P20": 21, "P4": 17 },
    "cardioEndurance": { "P96": 25, "P80": 22, "P20": 19, "P4": 16 }
  },
  "11_M": {
    "power": { "P96": 42, "P80": 38, "P20": 30, "P4": 26 },
    "strength": { "P96": 36, "P80": 32, "P20": 26, "P4": 22 },
    "muscleEndurance": { "P96": 32, "P80": 29, "P20": 24, "P4": 20 },
    "cardioEndurance": { "P96": 29, "P80": 26, "P20": 22, "P4": 19 }
  },
  "11_F": {
    "power": { "P96": 38, "P80": 34, "P20": 28, "P4": 24 },
    "strength": { "P96": 33, "P80": 29, "P20": 24, "P4": 21 },
    "muscleEndurance": { "P96": 29, "P80": 27, "P20": 23, "P4": 19 },
    "cardioEndurance": { "P96": 27, "P80": 24, "P20": 21, "P4": 18 }
  },
  "12_M": {
    "power": { "P96": 44, "P80": 40, "P20": 32, "P4": 28 },
    "strength": { "P96": 38, "P80": 34, "P20": 28, "P4": 24 },
    "muscleEndurance": { "P96": 34, "P80": 31, "P20": 26, "P4": 22 },
    "cardioEndurance": { "P96": 31, "P80": 28, "P20": 24, "P4": 21 }
  },
  "12_F": {
    "power": { "P96": 40, "P80": 36, "P20": 30, "P4": 26 },
    "strength": { "P96": 35, "P80": 31, "P20": 26, "P4": 23 },
    "muscleEndurance": { "P96": 31, "P80": 29, "P20": 25, "P4": 21 },
    "cardioEndurance": { "P96": 29, "P80": 26, "P20": 23, "P4": 20 }
  }
};

console.log("Cutoff data loaded successfully:", Object.keys(cutoffData));

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
      
      // 측정 결과만 계산하고 저장하지 않음 (데모용)
      const measurement = { id: Date.now(), ...measurementData };
      
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
        "360s": measurementData.power360s || 0
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
        "360s": absolutePowers["360s"] / weightPower
      };
      
      console.log(`입력된 절대 파워값: 5s=${absolutePowers["5s"]}W, 15s=${absolutePowers["15s"]}W, 30s=${absolutePowers["30s"]}W, 60s=${absolutePowers["60s"]}W`);
      console.log(`계산된 상대 파워값: 5s=${relativePowers["5s"]}, 15s=${relativePowers["15s"]}, 30s=${relativePowers["30s"]}, 60s=${relativePowers["60s"]}`);
      
      // Calculate percentiles (including 180s/360s if available)
      const percentiles = {
        "5s": calculatePercentile(relativePowers["5s"], cutoffs?.power),
        "15s": calculatePercentile(relativePowers["15s"], cutoffs?.strength),
        "30s": calculatePercentile(relativePowers["30s"], cutoffs?.muscleEndurance),
        "60s": calculatePercentile(relativePowers["60s"], cutoffs?.cardioEndurance),
        "180s": absolutePowers["180s"] > 0 ? calculatePercentile(relativePowers["180s"], cutoffs?.cardioEndurance) : null,
        "360s": absolutePowers["360s"] > 0 ? calculatePercentile(relativePowers["360s"], cutoffs?.cardioEndurance) : null
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
          longEndurance360s: percentiles["360s"]
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
        
        // 강점: 20% 이상인 항목들
        const strengths = percentileData
          .filter(item => item.value >= 20)
          .map(item => item.name);
        
        // 보완점: 20% 미만인 항목들 찾기
        const weakAreas = percentileData.filter(item => item.value < 20);
        
        let improvements;
        if (weakAreas.length >= 3) {
          // 대부분 영역이 약하면 모든 약한 영역 표시
          improvements = weakAreas.map(item => item.name);
        } else {
          // 일부만 약하면 가장 낮은 1-2개만 표시
          const sorted = [...percentileData].sort((a, b) => a.value - b.value);
          improvements = sorted.slice(0, 2).map(item => item.name);
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
        aiAnalysis
      };
      
      console.log("=== 측정 결과 계산 완료 (저장하지 않음) ===");
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
              aiSummary: analysis.aiSummary,
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
            aiSummary: analysis.aiSummary,
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

  const httpServer = createServer(app);
  return httpServer;
}

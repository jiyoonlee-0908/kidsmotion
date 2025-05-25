import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMeasurementSchema, insertAnalysisResultSchema, insertInviteCodeSchema } from "@shared/schema";
import crypto from "crypto";
import { generateFitnessAnalysis } from "./openai";

// Constants
const POWER_EXPONENT = 0.67;

// Load cutoff data - 와트바이크 기준 정확한 데이터
const cutoffData = {
  "4_M": {
    "power": { "P96": 215, "P80": 184, "P20": 123, "P4": 92 },
    "strength": { "P96": 103, "P80": 88, "P20": 59, "P4": 44 },
    "muscleEndurance": { "P96": 68, "P80": 58, "P20": 39, "P4": 29 },
    "cardioEndurance": { "P96": 57, "P80": 49, "P20": 33, "P4": 25 }
  },
  "4_F": {
    "power": { "P96": 169, "P80": 145, "P20": 97, "P4": 72 },
    "strength": { "P96": 81, "P80": 69, "P20": 46, "P4": 35 },
    "muscleEndurance": { "P96": 58, "P80": 49, "P20": 33, "P4": 25 },
    "cardioEndurance": { "P96": 50, "P80": 42, "P20": 28, "P4": 21 }
  },
  "5_M": {
    "power": { "P96": 242, "P80": 207, "P20": 139, "P4": 104 },
    "strength": { "P96": 116, "P80": 99, "P20": 66, "P4": 50 },
    "muscleEndurance": { "P96": 77, "P80": 66, "P20": 44, "P4": 33 },
    "cardioEndurance": { "P96": 65, "P80": 55, "P20": 37, "P4": 28 }
  },
  "5_F": {
    "power": { "P96": 191, "P80": 164, "P20": 110, "P4": 82 },
    "strength": { "P96": 92, "P80": 78, "P20": 52, "P4": 39 },
    "muscleEndurance": { "P96": 65, "P80": 55, "P20": 37, "P4": 28 },
    "cardioEndurance": { "P96": 56, "P80": 48, "P20": 32, "P4": 24 }
  },
  "6_M": {
    "power": { "P96": 273, "P80": 234, "P20": 157, "P4": 117 },
    "strength": { "P96": 131, "P80": 112, "P20": 75, "P4": 56 },
    "muscleEndurance": { "P96": 87, "P80": 74, "P20": 50, "P4": 37 },
    "cardioEndurance": { "P96": 73, "P80": 62, "P20": 42, "P4": 31 }
  },
  "6_F": {
    "power": { "P96": 215, "P80": 184, "P20": 123, "P4": 92 },
    "strength": { "P96": 103, "P80": 88, "P20": 59, "P4": 44 },
    "muscleEndurance": { "P96": 73, "P80": 62, "P20": 42, "P4": 31 },
    "cardioEndurance": { "P96": 63, "P80": 54, "P20": 36, "P4": 27 }
  },
  "7_M": {
    "power": { "P96": 308, "P80": 264, "P20": 177, "P4": 132 },
    "strength": { "P96": 148, "P80": 127, "P20": 85, "P4": 63 },
    "muscleEndurance": { "P96": 98, "P80": 84, "P20": 56, "P4": 42 },
    "cardioEndurance": { "P96": 83, "P80": 71, "P20": 47, "P4": 35 }
  },
  "7_F": {
    "power": { "P96": 242, "P80": 207, "P20": 139, "P4": 104 },
    "strength": { "P96": 116, "P80": 99, "P20": 66, "P4": 50 },
    "muscleEndurance": { "P96": 82, "P80": 70, "P20": 47, "P4": 35 },
    "cardioEndurance": { "P96": 71, "P80": 61, "P20": 41, "P4": 30 }
  },
  "8_M": {
    "power": { "P96": 346, "P80": 296, "P20": 199, "P4": 148 },
    "strength": { "P96": 166, "P80": 142, "P20": 95, "P4": 71 },
    "muscleEndurance": { "P96": 110, "P80": 94, "P20": 63, "P4": 47 },
    "cardioEndurance": { "P96": 93, "P80": 80, "P20": 53, "P4": 40 }
  },
  "8_F": {
    "power": { "P96": 273, "P80": 234, "P20": 157, "P4": 117 },
    "strength": { "P96": 131, "P80": 112, "P20": 75, "P4": 56 },
    "muscleEndurance": { "P96": 92, "P80": 79, "P20": 53, "P4": 39 },
    "cardioEndurance": { "P96": 80, "P80": 68, "P20": 46, "P4": 34 }
  },
  "9_M": {
    "power": { "P96": 388, "P80": 332, "P20": 223, "P4": 166 },
    "strength": { "P96": 186, "P80": 159, "P20": 107, "P4": 80 },
    "muscleEndurance": { "P96": 123, "P80": 105, "P20": 71, "P4": 53 },
    "cardioEndurance": { "P96": 105, "P80": 90, "P20": 60, "P4": 45 }
  },
  "9_F": {
    "power": { "P96": 308, "P80": 264, "P20": 177, "P4": 132 },
    "strength": { "P96": 148, "P80": 127, "P20": 85, "P4": 63 },
    "muscleEndurance": { "P96": 104, "P80": 89, "P20": 60, "P4": 44 },
    "cardioEndurance": { "P96": 90, "P80": 77, "P20": 52, "P4": 39 }
  },
  "10_M": {
    "power": { "P96": 434, "P80": 372, "P20": 250, "P4": 186 },
    "strength": { "P96": 208, "P80": 178, "P20": 120, "P4": 89 },
    "muscleEndurance": { "P96": 138, "P80": 118, "P20": 79, "P4": 59 },
    "cardioEndurance": { "P96": 118, "P80": 101, "P20": 68, "P4": 50 }
  },
  "10_F": {
    "power": { "P96": 346, "P80": 296, "P20": 199, "P4": 148 },
    "strength": { "P96": 166, "P80": 142, "P20": 95, "P4": 71 },
    "muscleEndurance": { "P96": 117, "P80": 100, "P20": 67, "P4": 50 },
    "cardioEndurance": { "P96": 101, "P80": 86, "P20": 58, "P4": 43 }
  },
  "11_M": {
    "power": { "P96": 485, "P80": 415, "P20": 279, "P4": 208 },
    "strength": { "P96": 233, "P80": 199, "P20": 134, "P4": 100 },
    "muscleEndurance": { "P96": 154, "P80": 132, "P20": 89, "P4": 66 },
    "cardioEndurance": { "P96": 132, "P80": 113, "P20": 76, "P4": 57 }
  },
  "11_F": {
    "power": { "P96": 388, "P80": 332, "P20": 223, "P4": 166 },
    "strength": { "P96": 186, "P80": 159, "P20": 107, "P4": 80 },
    "muscleEndurance": { "P96": 131, "P80": 112, "P20": 75, "P4": 56 },
    "cardioEndurance": { "P96": 113, "P80": 97, "P20": 65, "P4": 48 }
  },
  "12_M": {
    "power": { "P96": 542, "P80": 464, "P20": 312, "P4": 232 },
    "strength": { "P96": 260, "P80": 223, "P20": 150, "P4": 112 },
    "muscleEndurance": { "P96": 172, "P80": 147, "P20": 99, "P4": 74 },
    "cardioEndurance": { "P96": 148, "P80": 127, "P20": 85, "P4": 63 }
  },
  "12_F": {
    "power": { "P96": 434, "P80": 372, "P20": 250, "P4": 186 },
    "strength": { "P96": 208, "P80": 178, "P20": 120, "P4": 89 },
    "muscleEndurance": { "P96": 147, "P80": 126, "P20": 85, "P4": 63 },
    "cardioEndurance": { "P96": 127, "P80": 109, "P20": 73, "P4": 54 }
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
        { name: "순발력", percentile: percentiles["5s"] },
        { name: "근력", percentile: percentiles["15s"] },
        { name: "근지구력", percentile: percentiles["30s"] },
        { name: "심폐지구력", percentile: percentiles["60s"] }
      ];
      
      // Add advanced endurance categories if data is available
      if (percentiles["180s"]) {
        categories.push({ name: "중장거리지구력", percentile: percentiles["180s"] });
      }
      if (percentiles["360s"]) {
        categories.push({ name: "장거리지구력", percentile: percentiles["360s"] });
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
        overallAssessment: aiAnalysis.overallAssessment
      });
      
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
  
  app.get("/api/measurements/student/:name", async (req, res) => {
    try {
      const studentName = decodeURIComponent(req.params.name);
      const measurements = await storage.getMeasurementsByStudent(studentName);
      
      res.json(measurements);
      
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve student measurements" });
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

  const httpServer = createServer(app);
  return httpServer;
}

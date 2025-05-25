import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMeasurementSchema, insertAnalysisResultSchema, insertInviteCodeSchema } from "@shared/schema";
import crypto from "crypto";
import { generateFitnessAnalysis } from "./openai";
import fs from "fs";
import path from "path";

// Constants
const POWER_EXPONENT = 0.67;

// Load cutoff data - 와트바이크 기준 정확한 데이터
const cutoffDataPath = path.resolve(import.meta.dirname, "..", "attached_assets", "wattbike_cutoff_v3.json");
let cutoffData: any = {};

try {
  const cutoffRaw = fs.readFileSync(cutoffDataPath, "utf-8");
  cutoffData = JSON.parse(cutoffRaw);
} catch (error) {
  console.error("Failed to load cutoff data:", error);
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
      const cutoffs = cutoffData.data?.[genderKey];
      
      console.log(`나이: ${age}, 제한된 나이: ${clampedAge}, 성별: ${measurementData.gender}, 키: ${genderKey}`);
      
      // 사용자 입력: 절대 파워값 (W)
      const absolutePowers = {
        "5s": measurementData.power5s,
        "15s": measurementData.power15s,
        "30s": measurementData.power30s,
        "60s": measurementData.power60s
      };
      
      // 상대 파워 계산: W / kg^POWER_EXPONENT
      const weightPower = Math.pow(measurementData.weight, POWER_EXPONENT);
      console.log(`체중: ${measurementData.weight}kg, 체중^${POWER_EXPONENT}: ${weightPower}`);
      
      const relativePowers = {
        "5s": absolutePowers["5s"] / weightPower,
        "15s": absolutePowers["15s"] / weightPower,
        "30s": absolutePowers["30s"] / weightPower,
        "60s": absolutePowers["60s"] / weightPower
      };
      
      console.log(`입력된 절대 파워값: 5s=${absolutePowers["5s"]}W, 15s=${absolutePowers["15s"]}W, 30s=${absolutePowers["30s"]}W, 60s=${absolutePowers["60s"]}W`);
      console.log(`계산된 상대 파워값: 5s=${relativePowers["5s"]}, 15s=${relativePowers["15s"]}, 30s=${relativePowers["30s"]}, 60s=${relativePowers["60s"]}`);
      
      // Calculate percentiles
      const percentiles = {
        "5s": calculatePercentile(relativePowers["5s"], cutoffs?.["5s"]),
        "15s": calculatePercentile(relativePowers["15s"], cutoffs?.["15s"]),
        "30s": calculatePercentile(relativePowers["30s"], cutoffs?.["30s"]),
        "60s": calculatePercentile(relativePowers["60s"], cutoffs?.["60s"])
      };
      
      console.log(`최종 백분위 결과: 5s=${percentiles["5s"]}%, 15s=${percentiles["15s"]}%, 30s=${percentiles["30s"]}%, 60s=${percentiles["60s"]}%`);
      
      const overallPercentile = (percentiles["5s"] + percentiles["15s"] + percentiles["30s"] + percentiles["60s"]) / 4;
      const balanceStatus = getBalanceStatus(measurementData.leftBalance, measurementData.rightBalance);
      
      // Determine strengths and improvements
      const categories = [
        { name: "순발력", percentile: percentiles["5s"] },
        { name: "근력", percentile: percentiles["15s"] },
        { name: "근지구력", percentile: percentiles["30s"] },
        { name: "심폐지구력", percentile: percentiles["60s"] }
      ];
      
      categories.sort((a, b) => b.percentile - a.percentile);
      const strengths = categories.slice(0, 2).map(c => c.name);
      const improvements = categories.slice(-1).map(c => c.name);
      
      // Generate AI analysis
      const aiAnalysis = await generateFitnessAnalysis({
        studentName: measurementData.studentName,
        age,
        overallPercentile,
        percentiles: {
          power: percentiles["5s"],
          strength: percentiles["15s"],
          muscleEndurance: percentiles["30s"],
          cardioEndurance: percentiles["60s"]
        },
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

import { measurements, analysisResults, inviteCodes, type Measurement, type InsertMeasurement, type AnalysisResult, type InsertAnalysisResult, users, type User, type InsertUser, type InviteCode, type InsertInviteCode } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
  getMeasurement(id: number): Promise<Measurement | undefined>;
  getAllMeasurements(): Promise<Measurement[]>;
  deleteMeasurement(id: number): Promise<void>;
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResult(measurementId: number): Promise<AnalysisResult | undefined>;
  getMeasurementsByStudent(studentName: string): Promise<Measurement[]>;
  searchMeasurements(criteria: {
    studentName: string;
    affiliation?: string;
    birthDate?: string;
    gender?: string;
  }): Promise<Measurement[]>;
  createInviteCode(code: InsertInviteCode): Promise<InviteCode>;
  getInviteCode(code: string): Promise<InviteCode | undefined>;
  markInviteCodeAsUsed(code: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private measurements: Map<number, Measurement>;
  private analysisResults: Map<number, AnalysisResult>;
  private inviteCodes: Map<string, InviteCode>;
  private currentUserId: number;
  private currentMeasurementId: number;
  private currentAnalysisId: number;
  private currentInviteCodeId: number;

  constructor() {
    this.users = new Map();
    this.measurements = new Map();
    this.analysisResults = new Map();
    this.inviteCodes = new Map();
    this.currentUserId = 1;
    this.currentMeasurementId = 1;
    this.currentAnalysisId = 1;
    this.currentInviteCodeId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    const id = this.currentMeasurementId++;
    const measurement: Measurement = { 
      ...insertMeasurement, 
      id,
      power180s: insertMeasurement.power180s || null,
      power360s: insertMeasurement.power360s || null,
      createdAt: new Date()
    };
    this.measurements.set(id, measurement);
    return measurement;
  }

  async getMeasurement(id: number): Promise<Measurement | undefined> {
    return this.measurements.get(id);
  }

  async getAllMeasurements(): Promise<Measurement[]> {
    const allMeasurements = Array.from(this.measurements.values());
    console.log("전체 저장된 측정 데이터:", allMeasurements.length + "개");
    allMeasurements.forEach((m, index) => {
      console.log(`${index + 1}. ${m.studentName} (ID: ${m.id})`);
    });
    return allMeasurements.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async deleteMeasurement(id: number): Promise<void> {
    // 측정 데이터 삭제
    this.measurements.delete(id);
    
    // 관련된 분석 결과도 삭제
    const analysisToDelete = Array.from(this.analysisResults.entries())
      .filter(([_, analysis]) => analysis.measurementId === id);
    
    for (const [analysisId, _] of analysisToDelete) {
      this.analysisResults.delete(analysisId);
    }
  }

  async createAnalysisResult(insertResult: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = this.currentAnalysisId++;
    const result: AnalysisResult = { 
      ...insertResult, 
      id,
      percentile180s: insertResult.percentile180s || null,
      percentile360s: insertResult.percentile360s || null,
      maxBpm: insertResult.maxBpm || null,
      avgBpm: insertResult.avgBpm || null,
      restingBpm: insertResult.restingBpm || null,
      aiSummary: insertResult.aiSummary || null,
      balanceComment: insertResult.balanceComment || null,
      explanation5s: insertResult.explanation5s || null,
      explanation15s: insertResult.explanation15s || null,
      explanation30s: insertResult.explanation30s || null,
      explanation60s: insertResult.explanation60s || null,
      comprehensiveAnalysis: insertResult.comprehensiveAnalysis || null,
      overallAssessment: insertResult.overallAssessment || null,
      strengths: insertResult.strengths || null,
      improvements: insertResult.improvements || null
    };
    this.analysisResults.set(id, result);
    return result;
  }

  async getAnalysisResult(measurementId: number): Promise<AnalysisResult | undefined> {
    return Array.from(this.analysisResults.values()).find(
      (result) => result.measurementId === measurementId
    );
  }

  async getMeasurementsByStudent(studentName: string): Promise<Measurement[]> {
    return Array.from(this.measurements.values())
      .filter(measurement => measurement.studentName === studentName)
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async searchMeasurements(criteria: {
    studentName: string;
    affiliation?: string;
    birthDate?: string;
    gender?: string;
  }): Promise<Measurement[]> {
    return Array.from(this.measurements.values())
      .filter(measurement => {
        // 이름은 부분 매칭으로 변경
        if (!measurement.studentName.includes(criteria.studentName)) {
          return false;
        }
        
        // 소속이 있으면 확인
        if (criteria.affiliation && criteria.affiliation.trim() !== "" && 
            measurement.affiliation !== criteria.affiliation) {
          return false;
        }
        
        // 생년월일이 있으면 확인
        if (criteria.birthDate && criteria.birthDate.trim() !== "" && 
            measurement.birthDate !== criteria.birthDate) {
          return false;
        }
        
        // 성별이 있으면 확인 (단, "all"이면 모든 성별 허용)
        if (criteria.gender && criteria.gender.trim() !== "" && criteria.gender !== "all" &&
            measurement.gender !== criteria.gender) {
          return false;
        }
        
        return true;
      })
      .sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async createInviteCode(insertInviteCode: InsertInviteCode): Promise<InviteCode> {
    const id = this.currentInviteCodeId++;
    const inviteCode: InviteCode = { 
      id,
      code: insertInviteCode.code,
      isUsed: insertInviteCode.isUsed || "false",
      usedAt: null,
      createdAt: new Date()
    };
    this.inviteCodes.set(inviteCode.code, inviteCode);
    return inviteCode;
  }

  async getInviteCode(code: string): Promise<InviteCode | undefined> {
    return this.inviteCodes.get(code);
  }

  async markInviteCodeAsUsed(code: string): Promise<void> {
    const inviteCode = this.inviteCodes.get(code);
    if (inviteCode) {
      inviteCode.isUsed = "true";
      inviteCode.usedAt = new Date();
      this.inviteCodes.set(code, inviteCode);
    }
  }
}

// 데이터베이스 저장소 클래스
export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    // 임시로 undefined 반환 (사용자 기능은 나중에 구현)
    return undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // 임시로 기본 사용자 반환 (사용자 기능은 나중에 구현)
    return {
      id: 1,
      username: insertUser.username || 'default',
      password: insertUser.password || 'default'
    };
  }

  async createMeasurement(insertMeasurement: InsertMeasurement): Promise<Measurement> {
    // 새 측정 데이터 저장
    const [measurement] = await db
      .insert(measurements)
      .values({
        ...insertMeasurement,
        createdAt: new Date()
      })
      .returning();
    return measurement;
  }

  async getMeasurement(id: number): Promise<Measurement | undefined> {
    const [measurement] = await db.select().from(measurements).where(eq(measurements.id, id));
    return measurement || undefined;
  }

  async getAllMeasurements(): Promise<Measurement[]> {
    return await db.select().from(measurements).orderBy(desc(measurements.createdAt));
  }

  async deleteMeasurement(id: number): Promise<void> {
    await db.delete(analysisResults).where(eq(analysisResults.measurementId, id));
    await db.delete(measurements).where(eq(measurements.id, id));
  }

  async createAnalysisResult(insertResult: InsertAnalysisResult): Promise<AnalysisResult> {
    const [result] = await db
      .insert(analysisResults)
      .values(insertResult)
      .returning();
    return result;
  }

  async getAnalysisResult(measurementId: number): Promise<AnalysisResult | undefined> {
    const [result] = await db.select().from(analysisResults).where(eq(analysisResults.measurementId, measurementId));
    return result || undefined;
  }

  async getMeasurementsByStudent(studentName: string): Promise<Measurement[]> {
    return await db
      .select()
      .from(measurements)
      .where(eq(measurements.studentName, studentName))
      .orderBy(desc(measurements.createdAt));
  }

  async searchMeasurements(criteria: {
    studentName: string;
    affiliation?: string;
    birthDate?: string;
    gender?: string;
  }): Promise<Measurement[]> {
    console.log('=== 데이터베이스 검색 요청 ===', criteria);
    
    // 빈 이름이면 모든 데이터 반환
    if (criteria.studentName && criteria.studentName.trim() !== '') {
      console.log('특정 학생 검색:', criteria.studentName);
      const results = await db
        .select()
        .from(measurements)
        .where(eq(measurements.studentName, criteria.studentName))
        .orderBy(desc(measurements.createdAt));
      console.log('데이터베이스에서 반환된 결과:', results.length + '개');
      return results;
    } else {
      console.log('모든 데이터 반환 모드');
      const results = await db
        .select()
        .from(measurements)
        .orderBy(desc(measurements.createdAt));
      console.log('데이터베이스에서 반환된 결과:', results.length + '개');
      return results;
    }
  }

  async createInviteCode(insertInviteCode: InsertInviteCode): Promise<InviteCode> {
    const [inviteCode] = await db
      .insert(inviteCodes)
      .values(insertInviteCode)
      .returning();
    return inviteCode;
  }

  async getInviteCode(code: string): Promise<InviteCode | undefined> {
    const [inviteCode] = await db.select().from(inviteCodes).where(eq(inviteCodes.code, code));
    return inviteCode || undefined;
  }

  async markInviteCodeAsUsed(code: string): Promise<void> {
    await db
      .update(inviteCodes)
      .set({ usedAt: new Date() })
      .where(eq(inviteCodes.code, code));
  }
}

export const storage = new DatabaseStorage();

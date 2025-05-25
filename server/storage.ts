import { measurements, analysisResults, inviteCodes, type Measurement, type InsertMeasurement, type AnalysisResult, type InsertAnalysisResult, users, type User, type InsertUser, type InviteCode, type InsertInviteCode } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMeasurement(measurement: InsertMeasurement): Promise<Measurement>;
  getMeasurement(id: number): Promise<Measurement | undefined>;
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResult(measurementId: number): Promise<AnalysisResult | undefined>;
  getMeasurementsByStudent(studentName: string): Promise<Measurement[]>;
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
      createdAt: new Date()
    };
    this.measurements.set(id, measurement);
    return measurement;
  }

  async getMeasurement(id: number): Promise<Measurement | undefined> {
    return this.measurements.get(id);
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
      overallAssessment: insertResult.overallAssessment || null
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

export const storage = new MemStorage();

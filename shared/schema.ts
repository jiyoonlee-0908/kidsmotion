import { pgTable, text, serial, integer, real, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const measurements = pgTable("measurements", {
  id: serial("id").primaryKey(),
  measureDate: text("measure_date").notNull(),
  studentName: text("student_name").notNull(),
  affiliation: text("affiliation").notNull(), // 소속 (학교, 클럽 등)
  birthDate: text("birth_date").notNull(),
  gender: text("gender").notNull(), // "M" or "F"
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  power5s: real("power_5s").notNull(),
  power15s: real("power_15s").notNull(),
  power30s: real("power_30s").notNull(),
  power60s: real("power_60s").notNull(),
  leftBalance: real("left_balance").notNull(),
  rightBalance: real("right_balance").notNull(),
  // 심박수 데이터 (선택사항)
  maxHeartRate: real("max_heart_rate"),
  avgHeartRate: real("avg_heart_rate"),
  // 고급 측정 (선택사항)
  power180s: real("power_180s"),
  power360s: real("power_360s"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  measurementId: integer("measurement_id").references(() => measurements.id).notNull(),
  bmi: real("bmi").notNull(),
  age: integer("age").notNull(),
  overallPercentile: real("overall_percentile").notNull(),
  percentile5s: real("percentile_5s").notNull(),
  percentile15s: real("percentile_15s").notNull(),
  percentile30s: real("percentile_30s").notNull(),
  percentile60s: real("percentile_60s").notNull(),
  percentile180s: real("percentile_180s"),
  percentile360s: real("percentile_360s"),
  maxBpm: real("max_bpm"),
  avgBpm: real("avg_bpm"),
  restingBpm: real("resting_bpm"),
  balanceStatus: text("balance_status").notNull(),
  aiCoreInsights: text("ai_core_insights"),
  balanceComment: text("balance_comment"),
  explanation5s: text("explanation_5s"),
  explanation15s: text("explanation_15s"),
  explanation30s: text("explanation_30s"),
  explanation60s: text("explanation_60s"),
  comprehensiveAnalysis: text("comprehensive_analysis"),
  overallAssessment: text("overall_assessment"),
  strengths: text("strengths"),
  improvements: text("improvements"),
});

export const inviteCodes = pgTable("invite_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  isUsed: text("is_used").default("false").notNull(),
  usedAt: timestamp("used_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertMeasurementSchema = createInsertSchema(measurements).omit({
  id: true,
  createdAt: true,
}).extend({
  gender: z.enum(["M", "F"], { 
    required_error: "성별을 선택해주세요",
    invalid_type_error: "성별은 남성(M) 또는 여성(F)을 선택해야 합니다"
  })
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).omit({
  id: true,
});

export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Measurement = typeof measurements.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertInviteCodeSchema = createInsertSchema(inviteCodes).pick({
  code: true,
  isUsed: true,
});

export type InsertInviteCode = z.infer<typeof insertInviteCodeSchema>;
export type InviteCode = typeof inviteCodes.$inferSelect;

// KidsMotion 앱 Supabase 테이블 (읽기 전용)
export const participants = pgTable("participants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  birth_date: text("birth_date").notNull(),
  gender: text("gender").notNull(),
  organization: text("organization"),
  created_at: timestamp("created_at").defaultNow(),
});

export const testSessions = pgTable("test_sessions", {
  id: serial("id").primaryKey(),
  user_id: text("user_id"),
  user_display_name: text("user_display_name"),
  start_time: timestamp("start_time"),
  end_time: timestamp("end_time"),
  status: text("status"),
  total_stages: integer("total_stages"),
  completed_stages: integer("completed_stages"),
  test_data: text("test_data"),
});

export const garminData = pgTable("garmin_data", {
  id: serial("id").primaryKey(),
  session_id: integer("session_id").notNull(),
  user_display_name: text("user_display_name"),
  timestamp: timestamp("timestamp").notNull(),
  power: real("power").notNull(),
  cadence: real("cadence"),
  left_balance: real("left_balance"),
  right_balance: real("right_balance"),
  pedaling_smoothness: real("pedaling_smoothness"),
  torque_effectiveness: real("torque_effectiveness"),
});

// 웹리포트 분석 결과 저장 테이블
export const reportResults = pgTable("report_results", {
  id: serial("id").primaryKey(),
  // 고유 식별자: 이름(생년월일) 조합
  student_identifier: text("student_identifier").notNull(), // "홍길동(2018-05-05)"
  student_name: text("student_name").notNull(),
  birth_date: text("birth_date").notNull(),
  measure_date: text("measure_date").notNull(),
  
  // 기본 정보
  age: integer("age").notNull(),
  gender: text("gender").notNull(),
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  bmi: real("bmi").notNull(),
  affiliation: text("affiliation"),
  
  // 환산점수 (상대파워)
  relative_power_5s: real("relative_power_5s"),
  relative_power_15s: real("relative_power_15s"),
  relative_power_30s: real("relative_power_30s"),
  relative_power_60s: real("relative_power_60s"),
  relative_power_180s: real("relative_power_180s"),
  relative_power_360s: real("relative_power_360s"),
  
  // 백분위 점수
  percentile_5s: real("percentile_5s"),
  percentile_15s: real("percentile_15s"),
  percentile_30s: real("percentile_30s"),
  percentile_60s: real("percentile_60s"),
  percentile_180s: real("percentile_180s"),
  percentile_360s: real("percentile_360s"),
  overall_percentile: real("overall_percentile").notNull(),
  
  // 등급 (우수~경고)
  grade_5s: text("grade_5s"),
  grade_15s: text("grade_15s"),
  grade_30s: text("grade_30s"),
  grade_60s: text("grade_60s"),
  grade_180s: text("grade_180s"),
  grade_360s: text("grade_360s"),
  overall_grade: text("overall_grade").notNull(),
  
  // 심박수 데이터
  max_heart_rate: real("max_heart_rate"),
  avg_heart_rate: real("avg_heart_rate"),
  resting_heart_rate: real("resting_heart_rate"),
  
  // 좌우밸런스
  left_balance: real("left_balance").notNull(),
  right_balance: real("right_balance").notNull(),
  balance_difference: real("balance_difference").notNull(),
  balance_status: text("balance_status").notNull(),
  
  // AI 분석 결과
  ai_core_insights: text("ai_core_insights"),
  ai_balance_comment: text("ai_balance_comment"),
  ai_comprehensive_analysis: text("ai_comprehensive_analysis"),
  ai_overall_assessment: text("ai_overall_assessment"),
  strengths: text("strengths"), // JSON 배열
  improvements: text("improvements"), // JSON 배열
  
  created_at: timestamp("created_at").defaultNow(),
});

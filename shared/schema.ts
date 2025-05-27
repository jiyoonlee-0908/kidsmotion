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
  // 필수 심박수 데이터
  maxHeartRate: real("max_heart_rate").notNull(),
  avgHeartRate: real("avg_heart_rate").notNull(),
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
  aiSummary: text("ai_summary"),
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
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).omit({
  id: true,
});

export type InsertMeasurement = z.infer<typeof insertMeasurementSchema>;
export type Measurement = typeof measurements.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertInviteCodeSchema = createInsertSchema(inviteCodes).pick({
  code: true,
  isUsed: true,
});

export type InsertInviteCode = z.infer<typeof insertInviteCodeSchema>;
export type InviteCode = typeof inviteCodes.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

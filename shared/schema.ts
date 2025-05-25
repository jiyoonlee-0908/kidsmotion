import { pgTable, text, serial, integer, real, timestamp } from "drizzle-orm/pg-core";
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
  birthDate: text("birth_date").notNull(),
  height: real("height").notNull(),
  weight: real("weight").notNull(),
  power5s: real("power_5s").notNull(),
  power15s: real("power_15s").notNull(),
  power30s: real("power_30s").notNull(),
  power60s: real("power_60s").notNull(),
  leftBalance: real("left_balance").notNull(),
  rightBalance: real("right_balance").notNull(),
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
  balanceStatus: text("balance_status").notNull(),
  aiSummary: text("ai_summary"),
  balanceComment: text("balance_comment"),
  explanation5s: text("explanation_5s"),
  explanation15s: text("explanation_15s"),
  explanation30s: text("explanation_30s"),
  explanation60s: text("explanation_60s"),
  comprehensiveAnalysis: text("comprehensive_analysis"),
  overallAssessment: text("overall_assessment"),
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

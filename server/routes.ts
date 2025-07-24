import { Express } from "express";
import { createServer, type Server } from "http";
import { db } from "./db";
import { pool } from "./db";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Test database connection 
  app.get("/api/test-neon", async (req, res) => {
    try {
      const result = await pool.query('SELECT NOW() as current_time, COUNT(*) as participant_count FROM participants');
      console.log("Neon 연결 테스트 성공:", result.rows[0]);
      res.json({ 
        success: true, 
        current_time: result.rows[0].current_time,
        participant_count: result.rows[0].participant_count,
        message: "Neon PostgreSQL 연결 성공" 
      });
    } catch (error) {
      console.error("Neon 연결 오류:", error);
      res.status(500).json({ error: "Neon 연결 실패" });
    }
  });

  // KidsMotion 앱 데이터 자동 입력 API  
  app.get("/api/supabase/search-user/:name", async (req, res) => {
    try {
      const { name } = req.params;
      
      if (!name || name.length < 2) {
        return res.json([]);
      }

      console.log("=== 사용자 검색 (실제 DB) ===", name);
      
      // Neon 데이터베이스에서 실제 데이터 조회
      const queryResult = await pool.query('SELECT * FROM participants WHERE name = $1 ORDER BY created_at', [name]);
      const participants = queryResult.rows;
      
      console.log(`${name} 검색 결과: ${participants.length}개`);
      
      if (!participants || participants.length === 0) {
        return res.json([]);
      }
      
      // 각 참가자의 6단계 테스트 결과를 조회하여 웹앱 형식으로 변환
      const formattedResults = await Promise.all(participants.map(async (participant) => {
        // 해당 참가자의 6단계 테스트 결과 조회
        const stageQuery = await pool.query(`
          SELECT si.sequence_number, si.avg_power_in_stage, si.max_power_in_stage
          FROM stage_intervals si 
          JOIN test_sessions ts ON si.session_id = ts.id 
          WHERE ts.participant_id = $1
          ORDER BY si.sequence_number
        `, [participant.id]);
        
        const stages = stageQuery.rows;
        
        // 6단계별 파워값 매핑
        const power5s = stages.find(s => s.sequence_number === 1)?.max_power_in_stage || null;
        const power15s = stages.find(s => s.sequence_number === 2)?.avg_power_in_stage || null;
        const power30s = stages.find(s => s.sequence_number === 3)?.avg_power_in_stage || null;
        const power60s = stages.find(s => s.sequence_number === 4)?.avg_power_in_stage || null;
        const power180s = stages.find(s => s.sequence_number === 5)?.avg_power_in_stage || null;
        const power360s = stages.find(s => s.sequence_number === 6)?.avg_power_in_stage || null;
        
        return {
          measureDate: new Date(participant.created_at).toISOString().split('T')[0],
          studentName: participant.name,
          affiliation: participant.organization || '',
          birthDate: participant.birth_date,
          gender: participant.gender === 'F' ? '여성' : '남성',
          power5s: power5s ? Math.round(power5s * 10) / 10 : null,
          power15s: power15s ? Math.round(power15s * 10) / 10 : null,
          power30s: power30s ? Math.round(power30s * 10) / 10 : null,
          power60s: power60s ? Math.round(power60s * 10) / 10 : null,
          power180s: power180s ? Math.round(power180s * 10) / 10 : null,
          power360s: power360s ? Math.round(power360s * 10) / 10 : null,
          leftBalance: 50,
          rightBalance: 50,
          height: participant.height || null,
          weight: participant.weight || null,
          maxHeartRate: null,
          avgHeartRate: null
        };
      }));
      
      console.log(`변환된 검색 결과:`, formattedResults);
      res.json(formattedResults);
      
    } catch (error) {
      console.error("사용자 검색 중 오류:", error);
      res.status(500).json({ error: "사용자 검색 실패" });
    }
  });

  // Prefill API for form auto-completion
  app.get("/api/prefill", async (req, res) => {
    try {
      const { displayName } = req.query;
      
      if (!displayName) {
        return res.status(400).json({ error: "displayName 매개변수가 필요합니다." });
      }
      
      console.log("=== Prefill 데이터 조회 (Neon DB) ===", displayName);
      
      // Neon 데이터베이스에서 가장 최근 참가자 조회
      const queryResult = await pool.query(
        'SELECT * FROM participants WHERE name = $1 ORDER BY created_at DESC LIMIT 1', 
        [displayName]
      );
      
      if (queryResult.rows.length === 0) {
        return res.status(404).json({ error: "참가자를 찾을 수 없습니다." });
      }
      
      const participant = queryResult.rows[0];
      console.log("참가자 발견:", participant.name);
      
      // 해당 참가자의 6단계 테스트 결과 조회
      const stageQuery = await pool.query(`
        SELECT si.sequence_number, si.avg_power_in_stage, si.max_power_in_stage
        FROM stage_intervals si 
        JOIN test_sessions ts ON si.session_id = ts.id 
        WHERE ts.participant_id = $1
        ORDER BY si.sequence_number
      `, [participant.id]);
      
      const stages = stageQuery.rows;
      
      // 6단계별 파워값 매핑
      const power5s = stages.find(s => s.sequence_number === 1)?.max_power_in_stage || null;
      const power15s = stages.find(s => s.sequence_number === 2)?.avg_power_in_stage || null;
      const power30s = stages.find(s => s.sequence_number === 3)?.avg_power_in_stage || null;
      const power60s = stages.find(s => s.sequence_number === 4)?.avg_power_in_stage || null;
      const power180s = stages.find(s => s.sequence_number === 5)?.avg_power_in_stage || null;
      const power360s = stages.find(s => s.sequence_number === 6)?.avg_power_in_stage || null;
      
      // 4. Prefill 데이터 준비
      const prefillResult = {
        studentName: participant.name,
        affiliation: participant.organization || "",
        birthDate: participant.birth_date,
        gender: participant.gender === "F" ? "여성" : "남성",
        height: participant.height || null,
        weight: participant.weight || null,
        
        // 실제 6단계 파워 데이터
        power5s: power5s ? Math.round(power5s * 10) / 10 : null,
        power15s: power15s ? Math.round(power15s * 10) / 10 : null,
        power30s: power30s ? Math.round(power30s * 10) / 10 : null,
        power60s: power60s ? Math.round(power60s * 10) / 10 : null,
        power180s: power180s ? Math.round(power180s * 10) / 10 : null,
        power360s: power360s ? Math.round(power360s * 10) / 10 : null,
        
        // 기본 밸런스
        leftBalance: 50,
        rightBalance: 50,
        
        // 심박수는 빈 상태
        maxHeartRate: null,
        avgHeartRate: null
      };
      
      console.log("Prefill 데이터 준비 완료:", prefillResult);
      res.json(prefillResult);
      
    } catch (error) {
      console.error("Prefill 데이터 조회 오류:", error);
      res.status(500).json({ error: "Prefill 데이터 조회 중 오류가 발생했습니다." });
    }
  });

  // Health check (API만)
  app.get("/api/health", (req, res) => {
    res.json({ message: "KidsMotion API 서버가 정상 작동 중입니다." });
  });
  
  // Create and return HTTP server
  const server = createServer(app);
  return server;
}
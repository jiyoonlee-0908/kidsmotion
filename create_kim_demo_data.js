// 김철수 투자자 시연용 점진적 향상 데이터 생성
import { supabase } from './server/supabase.js';

async function createKimDemoData() {
  try {
    console.log("=== 김철수 투자자 시연용 데이터 생성 ===");
    
    // 7세 아동의 현실적인 파워 성장 패턴 (7월 10일 → 17일 → 22일)
    const measurements = [
      {
        date: '2025-07-10',
        sessionId: 1,
        stages: [
          { name: '5s_explosive_power', max: 85, avg: 75 },    // 기초 폭발력
          { name: '15s_anaerobic_power', max: 78, avg: 68 },  
          { name: '30s_strength_endurance', max: 72, avg: 65 },
          { name: '60s_muscle_endurance', max: 68, avg: 62 },
          { name: '180s_aerobic_power', max: 58, avg: 55 },
          { name: '360s_cardiovascular', max: 52, avg: 50 }
        ]
      },
      {
        date: '2025-07-17', 
        sessionId: 2,
        stages: [
          { name: '5s_explosive_power', max: 92, avg: 82 },    // 1주 후 향상
          { name: '15s_anaerobic_power', max: 85, avg: 75 },
          { name: '30s_strength_endurance', max: 78, avg: 72 },
          { name: '60s_muscle_endurance', max: 74, avg: 68 },
          { name: '180s_aerobic_power', max: 63, avg: 60 },
          { name: '360s_cardiovascular', max: 57, avg: 54 }
        ]
      },
      {
        date: '2025-07-22',
        sessionId: 3, 
        stages: [
          { name: '5s_explosive_power', max: 98, avg: 88 },    // 2주 후 더 향상
          { name: '15s_anaerobic_power', max: 91, avg: 81 },
          { name: '30s_strength_endurance', max: 84, avg: 78 },
          { name: '60s_muscle_endurance', max: 79, avg: 74 },
          { name: '180s_aerobic_power', max: 68, avg: 65 },
          { name: '360s_cardiovascular', max: 61, avg: 58 }
        ]
      }
    ];

    // 각 측정일별로 stage_intervals 데이터 삽입
    for (const measurement of measurements) {
      console.log(`\n📅 ${measurement.date} 데이터 삽입 중...`);
      
      for (let i = 0; i < measurement.stages.length; i++) {
        const stage = measurement.stages[i];
        
        const insertData = {
          session_id: measurement.sessionId,
          user_display_name: '김철수_2018-03-15',
          sequence_number: i + 1,
          stage_name: stage.name,
          start_timestamp: `${measurement.date}T10:${10 + (i * 5)}:00.000Z`,
          end_timestamp: `${measurement.date}T10:${15 + (i * 5)}:00.000Z`,
          duration_seconds: stage.name.includes('5s') ? 5 : 
                          stage.name.includes('15s') ? 15 :
                          stage.name.includes('30s') ? 30 :
                          stage.name.includes('60s') ? 60 :
                          stage.name.includes('180s') ? 180 : 360,
          max_power_in_stage: stage.max,
          avg_power_in_stage: stage.avg,
          created_at: new Date().toISOString()
        };

        const { data, error } = await supabase
          .from('stage_intervals')
          .insert(insertData);

        if (error) {
          console.error(`❌ ${stage.name} 삽입 실패:`, error);
        } else {
          console.log(`✅ ${stage.name}: MAX=${stage.max}W, AVG=${stage.avg}W`);
        }
      }
    }

    console.log("\n🎯 투자자 시연용 데이터 삽입 완료!");
    console.log("📈 성장 패턴: 7월 10일(기초) → 17일(향상) → 22일(더욱 향상)");
    
  } catch (error) {
    console.error("데이터 생성 중 오류:", error);
  }
}

createKimDemoData();
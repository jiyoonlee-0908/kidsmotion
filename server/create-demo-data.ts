// 김철수 투자자 시연용 점진적 향상 데이터 생성
import { supabase } from './supabase.js';

async function createKimDemoData() {
  try {
    console.log("=== 김철수 투자자 시연용 데이터 생성 ===");
    
    // 7세 아동 점진적 향상 파워값 (현실적인 수치)
    const measurements = [
      {
        id: 115,
        date: '2025-07-10',
        power5s: 85,   // 기초 폭발력
        power15s: 78,  // 무산소 파워
        power30s: 72,  // 근력 지구력
        power60s: 68,  // 근지구력
        power180s: 58, // 유산소 파워
        power360s: 52, // 심혈관 지구력
        heartRate: 165,
        leftBalance: 48,
        rightBalance: 52
      },
      {
        id: 116, 
        date: '2025-07-17',
        power5s: 92,   // 1주 후 향상 (+7W)
        power15s: 85,  // (+7W)
        power30s: 78,  // (+6W)
        power60s: 74,  // (+6W)
        power180s: 63, // (+5W)
        power360s: 57, // (+5W)
        heartRate: 170,
        leftBalance: 49,
        rightBalance: 51
      },
      {
        id: 119,
        date: '2025-07-22', 
        power5s: 98,   // 2주 후 더 향상 (+6W)
        power15s: 91,  // (+6W)
        power30s: 84,  // (+6W)
        power60s: 79,  // (+5W)
        power180s: 68, // (+5W)
        power360s: 61, // (+4W)
        heartRate: 175,
        leftBalance: 50,
        rightBalance: 50
      }
    ];

    // 각 측정에 파워값 업데이트
    for (const measurement of measurements) {
      console.log(`\n📅 ${measurement.date} (ID: ${measurement.id}) 데이터 업데이트...`);
      
      const { data, error } = await supabase
        .from('participants')
        .update({
          power5s: measurement.power5s,
          power15s: measurement.power15s,
          power30s: measurement.power30s,
          power60s: measurement.power60s,
          power180s: measurement.power180s,
          power360s: measurement.power360s,
          heartRate: measurement.heartRate,
          leftBalance: measurement.leftBalance,
          rightBalance: measurement.rightBalance
        })
        .eq('id', measurement.id);

      if (error) {
        console.error(`❌ ID ${measurement.id} 업데이트 실패:`, error);
      } else {
        console.log(`✅ 5s: ${measurement.power5s}W, 15s: ${measurement.power15s}W, 30s: ${measurement.power30s}W`);
        console.log(`   60s: ${measurement.power60s}W, 180s: ${measurement.power180s}W, 360s: ${measurement.power360s}W`);
      }
    }

    console.log("\n🎯 투자자 시연용 데이터 생성 완료!");
    console.log("📈 성장 패턴: 7/10 기초 → 7/17 향상 → 7/22 더욱 향상");
    console.log("💡 이제 웹앱에서 김철수 검색 → 각 날짜별 '리포트 보기'로 성장 확인 가능");
    
  } catch (error) {
    console.error("데이터 생성 중 오류:", error);
  }
}
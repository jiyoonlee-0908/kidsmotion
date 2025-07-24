// 김철수 3개 측정일 실제 데이터 비교 스크립트
const { supabase } = require('./server/supabase');

async function compareKimData() {
  try {
    console.log("=== 김철수 3개 측정일 파워 데이터 비교 ===");
    
    // ID 119 (2025-07-22)
    const { data: stages119, error: error119 } = await supabase
      .from('stage_intervals')
      .select('stage_name, max_power_in_stage, avg_power_in_stage')
      .eq('user_display_name', '김철수_2018-03-15')
      .gte('start_timestamp', '2025-07-22')
      .lt('start_timestamp', '2025-07-23')
      .order('sequence_number');
      
    // ID 116 (2025-07-17)  
    const { data: stages116, error: error116 } = await supabase
      .from('stage_intervals')
      .select('stage_name, max_power_in_stage, avg_power_in_stage')
      .eq('user_display_name', '김철수_2018-03-15')
      .gte('start_timestamp', '2025-07-17')
      .lt('start_timestamp', '2025-07-18')
      .order('sequence_number');
      
    // ID 115 (2025-07-10)
    const { data: stages115, error: error115 } = await supabase
      .from('stage_intervals')
      .select('stage_name, max_power_in_stage, avg_power_in_stage')
      .eq('user_display_name', '김철수_2018-03-15')
      .gte('start_timestamp', '2025-07-10')
      .lt('start_timestamp', '2025-07-11')
      .order('sequence_number');

    console.log("\n2025-07-22 (ID:119) 측정값:");
    if (stages119) stages119.forEach(s => console.log(`${s.stage_name}: MAX=${s.max_power_in_stage}W, AVG=${s.avg_power_in_stage}W`));
    else console.log("데이터 없음");
    
    console.log("\n2025-07-17 (ID:116) 측정값:");
    if (stages116) stages116.forEach(s => console.log(`${s.stage_name}: MAX=${s.max_power_in_stage}W, AVG=${s.avg_power_in_stage}W`));
    else console.log("데이터 없음");
    
    console.log("\n2025-07-10 (ID:115) 측정값:");
    if (stages115) stages115.forEach(s => console.log(`${s.stage_name}: MAX=${s.max_power_in_stage}W, AVG=${s.avg_power_in_stage}W`));
    else console.log("데이터 없음");
    
    // 5초 파워만 비교
    const power5s_119 = stages119?.find(s => s.stage_name.includes('5'))?.max_power_in_stage || 0;
    const power5s_116 = stages116?.find(s => s.stage_name.includes('5'))?.max_power_in_stage || 0;
    const power5s_115 = stages115?.find(s => s.stage_name.includes('5'))?.max_power_in_stage || 0;
    
    console.log(`\n=== 5초 파워 비교 ===`);
    console.log(`2025-07-22: ${power5s_119}W`);
    console.log(`2025-07-17: ${power5s_116}W`);
    console.log(`2025-07-10: ${power5s_115}W`);
    
    if (power5s_119 === power5s_116 && power5s_116 === power5s_115) {
      console.log("❌ 모든 측정값이 동일함 - 중복 데이터 의심");
    } else {
      console.log("✅ 측정값이 다름 - 실제 다른 측정 결과");
    }

  } catch (error) {
    console.error("데이터 비교 중 오류:", error);
  }
}

compareKimData();
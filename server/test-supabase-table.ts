import { supabase } from './supabase';

async function testTableExists() {
  try {
    console.log('=== fitness_report_snapshots 테이블 존재 확인 ===');
    
    // 테이블에서 데이터 조회를 시도해서 테이블 존재 여부 확인
    const { data, error } = await supabase
      .from('fitness_report_snapshots')
      .select('*')
      .limit(1);
    
    if (error) {
      if (error.message.includes('does not exist') || error.code === 'PGRST106') {
        console.log('❌ fitness_report_snapshots 테이블이 존재하지 않습니다.');
        console.log('📋 다음 SQL을 Supabase Dashboard → SQL Editor에서 실행해주세요:');
        console.log(`
CREATE TABLE fitness_report_snapshots (
    id BIGSERIAL PRIMARY KEY,
    measurement_id BIGINT NOT NULL,
    user_display_name TEXT NOT NULL,
    student_name TEXT NOT NULL,
    measure_date DATE NOT NULL,
    html_content TEXT NOT NULL,
    
    age INTEGER,
    gender TEXT,
    height REAL,
    weight REAL,
    organization TEXT,
    
    overall_percentile REAL,
    power_grade INTEGER,
    strength_grade INTEGER,
    muscle_endurance_grade INTEGER,
    cardio_endurance_grade INTEGER,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE fitness_report_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all access for fitness_report_snapshots" ON fitness_report_snapshots
FOR ALL USING (true) WITH CHECK (true);
        `);
        return false;
      } else {
        console.error('다른 오류 발생:', error);
        return false;
      }
    }
    
    console.log('✅ fitness_report_snapshots 테이블이 존재합니다!');
    console.log('데이터:', data);
    return true;
    
  } catch (error) {
    console.error('테이블 확인 중 오류:', error);
    return false;
  }
}

// 스크립트 실행
testTableExists();
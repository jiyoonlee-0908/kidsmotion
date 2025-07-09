import { supabase } from './supabase';

/**
 * Supabase에 fitness_report_snapshots 테이블 생성
 * HTML 스냅샷 저장용 독립 테이블
 */
async function createFitnessSnapshotsTable() {
  console.log('=== Supabase fitness_report_snapshots 테이블 생성 안내 ===');
  
  const sqlQuery = `
-- fitness_report_snapshots 테이블 생성
CREATE TABLE IF NOT EXISTS public.fitness_report_snapshots (
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
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 설정
ALTER TABLE public.fitness_report_snapshots ENABLE ROW LEVEL SECURITY;

-- 모든 접근 허용 정책
DROP POLICY IF EXISTS "fitness_snapshots_all_access" ON public.fitness_report_snapshots;
CREATE POLICY "fitness_snapshots_all_access" ON public.fitness_report_snapshots
  FOR ALL TO public
  USING (true)
  WITH CHECK (true);

-- 테스트 데이터 삽입
INSERT INTO public.fitness_report_snapshots (
  measurement_id, user_display_name, student_name, measure_date, 
  html_content, age, gender, overall_percentile
) VALUES (
  9999, '테스트_Supabase', '테스트학생_Supabase', '2025-01-09',
  '<html><head><title>Supabase HTML 스냅샷</title></head><body><h1>KidsMotion HTML 테스트</h1></body></html>',
  8, 'M', 90.5
);
  `;

  console.log('=== Supabase SQL Editor에서 다음 쿼리를 실행하세요 ===');
  console.log(sqlQuery);
  console.log('=== 위 쿼리를 복사해서 Supabase SQL Editor에 붙여넣고 실행하세요 ===');
  
  // API로는 테이블 생성이 불가능하므로, 테스트만 진행
  try {
    console.log('\n=== 테이블 존재 여부 테스트 ===');
    const { data, error } = await supabase
      .from('fitness_report_snapshots')
      .select('count(*)')
      .limit(1);
      
    if (error) {
      console.log('❌ 테이블이 아직 생성되지 않음:', error.message);
      console.log('→ 위의 SQL을 Supabase에서 실행해주세요');
    } else {
      console.log('✅ 테이블이 존재합니다:', data);
    }
  } catch (error) {
    console.log('❌ 테이블 테스트 실패:', error);
  }
}

export { createFitnessSnapshotsTable };

// 직접 실행
createFitnessSnapshotsTable();
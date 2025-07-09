import { supabase } from './supabase';

async function createFitnessReportSnapshotsTable() {
  try {
    console.log('=== Supabase에 fitness_report_snapshots 테이블 생성 시작 ===');
    
    // 테이블 생성 SQL
    const createTableSQL = `
      CREATE TABLE IF NOT EXISTS fitness_report_snapshots (
        id BIGSERIAL PRIMARY KEY,
        measurement_id BIGINT NOT NULL,
        user_display_name TEXT NOT NULL,
        student_name TEXT NOT NULL,
        measure_date DATE NOT NULL,
        html_content TEXT NOT NULL,
        
        -- 검색용 필드들
        age INTEGER,
        gender TEXT,
        height REAL,
        weight REAL,
        organization TEXT,
        
        -- 분석 요약
        overall_percentile REAL,
        power_grade INTEGER,
        strength_grade INTEGER,
        muscle_endurance_grade INTEGER,
        cardio_endurance_grade INTEGER,
        
        -- 메타데이터
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    const { data: tableResult, error: tableError } = await supabase.rpc('exec_sql', {
      sql: createTableSQL
    });
    
    if (tableError) {
      console.error('테이블 생성 실패:', tableError);
      // 직접 SQL 실행이 안 되면 수동으로 테이블 구조만 확인
      const { data: existingTables, error: listError } = await supabase
        .from('fitness_report_snapshots')
        .select('*')
        .limit(1);
        
      if (listError && listError.message.includes('does not exist')) {
        console.log('테이블이 존재하지 않음. 수동 생성이 필요합니다.');
        return false;
      } else {
        console.log('테이블이 이미 존재하거나 생성되었습니다.');
        return true;
      }
    }
    
    console.log('테이블 생성 성공:', tableResult);
    
    // 인덱스 생성
    const createIndexesSQL = [
      `CREATE INDEX IF NOT EXISTS idx_fitness_reports_student_name ON fitness_report_snapshots(student_name);`,
      `CREATE INDEX IF NOT EXISTS idx_fitness_reports_date ON fitness_report_snapshots(measure_date);`,
      `CREATE INDEX IF NOT EXISTS idx_fitness_reports_user_display ON fitness_report_snapshots(user_display_name);`,
      `CREATE INDEX IF NOT EXISTS idx_fitness_reports_measurement_id ON fitness_report_snapshots(measurement_id);`
    ];
    
    for (const indexSQL of createIndexesSQL) {
      const { error: indexError } = await supabase.rpc('exec_sql', { sql: indexSQL });
      if (indexError) {
        console.warn('인덱스 생성 실패:', indexError);
      }
    }
    
    // RLS 정책 설정
    const rlsSQL = [
      `ALTER TABLE fitness_report_snapshots ENABLE ROW LEVEL SECURITY;`,
      `CREATE POLICY IF NOT EXISTS "Enable read access for all users" ON fitness_report_snapshots FOR SELECT USING (true);`,
      `CREATE POLICY IF NOT EXISTS "Enable insert access for all users" ON fitness_report_snapshots FOR INSERT WITH CHECK (true);`,
      `CREATE POLICY IF NOT EXISTS "Enable update access for all users" ON fitness_report_snapshots FOR UPDATE USING (true);`,
      `CREATE POLICY IF NOT EXISTS "Enable delete access for all users" ON fitness_report_snapshots FOR DELETE USING (true);`
    ];
    
    for (const policySQL of rlsSQL) {
      const { error: policyError } = await supabase.rpc('exec_sql', { sql: policySQL });
      if (policyError) {
        console.warn('정책 설정 실패:', policyError);
      }
    }
    
    console.log('=== fitness_report_snapshots 테이블 생성 완료 ===');
    return true;
    
  } catch (error) {
    console.error('테이블 생성 중 오류:', error);
    return false;
  }
}

// 스크립트 실행
createFitnessReportSnapshotsTable()
  .then((success) => {
    if (success) {
      console.log('✅ 테이블 생성 성공');
    } else {
      console.log('❌ 테이블 생성 실패');
    }
  })
  .catch((error) => {
    console.error('실행 중 오류:', error);
  });

export { createFitnessReportSnapshotsTable };
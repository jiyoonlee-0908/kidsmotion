import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

console.log('SUPABASE_URL:', supabaseUrl);
console.log('SUPABASE_ANON_KEY exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    // 테이블 목록 확인
    const { data: tables, error: tableError } = await supabase
      .from('test_sessions')
      .select('*')
      .limit(1);
    
    if (tableError) {
      console.error('테이블 접근 오류:', tableError);
      return;
    }
    
    console.log('테이블 접근 성공, 첫 번째 레코드:', tables);
    
    // 모든 사용자 이름 목록 확인
    const { data: allUsers, error: allError } = await supabase
      .from('test_sessions')
      .select('user_display_name')
      .eq('status', 'completed');
    
    if (allError) {
      console.error('전체 사용자 검색 오류:', allError);
      return;
    }
    
    console.log('데이터베이스의 모든 사용자 이름들:');
    allUsers.forEach(user => console.log('-', user.user_display_name));
    
    // participants 테이블도 확인
    const { data: participants, error: partError } = await supabase
      .from('participants')
      .select('*')
      .limit(5);
    
    if (partError) {
      console.error('participants 테이블 오류:', partError);
    } else {
      console.log('participants 테이블 데이터:', participants);
    }
    
    // "지윤" 이름으로 테스트 (부분 일치)
    const { data: jiyoonTest, error: jiyoonError } = await supabase
      .from('participants')
      .select('*')
      .ilike('name', '%지윤%');
    
    if (jiyoonError) {
      console.error('지윤 검색 오류:', jiyoonError);
    } else {
      console.log('지윤 관련 데이터:', jiyoonTest);
    }
    
  } catch (error) {
    console.error('연결 테스트 실패:', error);
  }
}

testConnection();
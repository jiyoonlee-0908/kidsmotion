import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testJiyoonSearch() {
  try {
    console.log('Testing search for "박시아"...');
    
    // 참가자 검색 (정확 일치 + 부분 일치)
    const { data: participants, error: participantError } = await supabase
      .from('participants')
      .select('*')
      .or(`name.eq.박시아,name.ilike.%박시아%`)
      .order('created_at', { ascending: false })
      .limit(1);

    if (participantError) {
      console.error('참가자 검색 오류:', participantError);
      return;
    }

    if (!participants || participants.length === 0) {
      console.log('지윤짱 참가자를 찾을 수 없습니다.');
      return;
    }

    const participant = participants[0];
    console.log('찾은 참가자:', participant);

    // 해당 참가자의 테스트 세션 찾기
    const { data: testSession, error: sessionError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('user_id', participant.id)
      .eq('status', 'completed')
      .order('end_time', { ascending: false })
      .limit(1);

    if (sessionError) {
      console.error('테스트 세션 검색 오류:', sessionError);
      return;
    }

    if (!testSession || testSession.length === 0) {
      console.log('완료된 테스트 세션이 없습니다.');
      return;
    }

    console.log('찾은 테스트 세션:', testSession[0]);

    // 가민 데이터도 확인
    const { data: garminData, error: garminError } = await supabase
      .from('garmin_data')
      .select('*')
      .eq('user_display_name', testSession[0].user_display_name)
      .order('timestamp', { ascending: true });

    if (garminError) {
      console.error('가민 데이터 검색 오류:', garminError);
    } else {
      console.log(`가민 데이터 ${garminData.length}개 발견`);
      if (garminData.length > 0) {
        console.log('첫 번째 가민 데이터:', garminData[0]);
      }
    }

  } catch (error) {
    console.error('검색 테스트 실패:', error);
  }
}

testJiyoonSearch();
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 타입 정의
export interface ParticipantData {
  id: string;
  name: string;
  birth_date: string;
  gender: string;
  organization: string;
  created_at: string;
}

export interface TestSessionData {
  id: string;
  userId: string;
  userDisplayName: string;
  startTime: string;
  endTime: string;
  status: string;
  totalStages: number;
  completedStages: number;
  testData: any;
  participants?: ParticipantData;
}

export interface GarminDataPoint {
  id: string;
  session_id: string;
  user_display_name: string;
  timestamp: string;
  power: number;
  cadence: number;
  left_balance: number;
  right_balance: number;
  pedaling_smoothness: number;
  torque_effectiveness: number;
}

// 이름으로 최신 완료된 테스트 세션 찾기
export async function getLatestCompletedTest(name: string): Promise<TestSessionData | null> {
  try {
    // 먼저 정확한 이름으로 참가자 찾기
    const { data: participants, error: participantError } = await supabase
      .from('participants')
      .select('*')
      .eq('name', name)
      .order('created_at', { ascending: false });

    if (participantError || !participants || participants.length === 0) {
      console.log('No participant found for name:', name);
      return null;
    }

    const participant = participants[0];
    
    // 해당 참가자의 테스트 세션 찾기
    const { data: testSession, error: sessionError } = await supabase
      .from('test_sessions')
      .select('*')
      .eq('user_id', participant.id)
      .eq('status', 'completed')
      .order('end_time', { ascending: false })
      .limit(1);

    if (sessionError || !testSession || testSession.length === 0) {
      console.log('No completed test session found for participant:', participant.name);
      return null;
    }

    // 참가자 정보를 포함한 결과 반환
    return {
      ...testSession[0],
      participants: participant
    };
  } catch (error) {
    console.error('Error in getLatestCompletedTest:', error);
    return null;
  }
}

// 사용자 표시 이름으로 가민 데이터 가져오기
export async function getGarminDataByDisplayName(userDisplayName: string): Promise<GarminDataPoint[]> {
  try {
    const { data, error } = await supabase
      .from('garmin_data')
      .select('*')
      .eq('user_display_name', userDisplayName)
      .order('timestamp', { ascending: true });

    if (error) {
      console.error('Error fetching garmin data:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in getGarminDataByDisplayName:', error);
    return [];
  }
}

// 🔥 새로운 스테이지 넘버링 시스템 - stage_intervals 테이블에서 파워값 추출
export async function getStageIntervalPowerValues(userDisplayName: string) {
  try {
    const { data: stages, error } = await supabase
      .from('stage_intervals')
      .select('*')
      .eq('user_display_name', userDisplayName)
      .order('sequence_number', { ascending: true });

    if (error) {
      console.error("스테이지 구간 조회 오류:", error);
      return {
        power5s: null,
        power15s: null,
        power30s: null,
        power60s: null,
        power180s: null,
        power360s: null,
        hasStageData: false
      };
    }

    if (!stages || stages.length === 0) {
      console.log(`${userDisplayName}: 스테이지 구간 데이터 없음 - 가민 데이터 사용`);
      return {
        power5s: null,
        power15s: null,
        power30s: null,
        power60s: null,
        power180s: null,
        power360s: null,
        hasStageData: false
      };
    }

    // 순서별로 파워값 추출 (1-6번 스테이지)
    const powerValues = {
      power5s: stages.find(s => s.sequence_number === 1)?.max_power_in_stage || null,
      power15s: stages.find(s => s.sequence_number === 2)?.max_power_in_stage || null,
      power30s: stages.find(s => s.sequence_number === 3)?.max_power_in_stage || null,
      power60s: stages.find(s => s.sequence_number === 4)?.max_power_in_stage || null,
      power180s: stages.find(s => s.sequence_number === 5)?.max_power_in_stage || null,
      power360s: stages.find(s => s.sequence_number === 6)?.max_power_in_stage || null,
      hasStageData: true
    };

    console.log(`${userDisplayName} 스테이지 파워값:`, powerValues);
    return powerValues;

  } catch (error) {
    console.error("스테이지 파워값 조회 중 오류:", error);
    return {
      power5s: null,
      power15s: null,
      power30s: null,
      power60s: null,
      power180s: null,
      power360s: null,
      hasStageData: false
    };
  }
}

// 기존 가민 데이터에서 파워 값들 추출 (fallback용)
export function extractPowerValues(garminData: GarminDataPoint[]) {
  if (!garminData || garminData.length === 0) {
    return {
      power5s: 0,
      power15s: 0,
      power30s: 0,
      power60s: 0,
      power180s: 0,
      power360s: 0
    };
  }

  // 스테이지별로 데이터 분할 (타임스탬프 기준)
  const totalDataPoints = garminData.length;
  const stageSize = Math.floor(totalDataPoints / 6);
  
  const stages = [];
  for (let i = 0; i < 6; i++) {
    const start = i * stageSize;
    const end = i === 5 ? totalDataPoints : (i + 1) * stageSize;
    stages.push(garminData.slice(start, end));
  }

  // 각 스테이지의 최대 파워 값 추출
  const powerValues = stages.map(stage => {
    if (stage.length === 0) return 0;
    return Math.max(...stage.map(d => d.power || 0));
  });

  return {
    power5s: powerValues[0] || 0,
    power15s: powerValues[1] || 0,
    power30s: powerValues[2] || 0,
    power60s: powerValues[3] || 0,
    power180s: powerValues[4] || 0,
    power360s: powerValues[5] || 0
  };
}

// 좌우 밸런스 계산
export function calculateBalance(garminData: GarminDataPoint[]) {
  if (!garminData || garminData.length === 0) {
    return { leftBalance: 50, rightBalance: 50 };
  }

  const validData = garminData.filter(d => d.left_balance && d.right_balance);
  
  if (validData.length === 0) {
    return { leftBalance: 50, rightBalance: 50 };
  }

  const avgLeft = validData.reduce((sum, d) => sum + d.left_balance, 0) / validData.length;
  const avgRight = validData.reduce((sum, d) => sum + d.right_balance, 0) / validData.length;

  return {
    leftBalance: Math.round(avgLeft),
    rightBalance: Math.round(avgRight)
  };
}

// 날짜 형식 변환 (YYYY-MM-DD)
export function formatDate(dateString: string): string {
  try {
    if (!dateString) return '';
    
    // 이미 YYYY-MM-DD 형식인 경우 그대로 반환
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
      return dateString;
    }
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error('Invalid date string:', dateString);
      return '';
    }
    
    return date.toISOString().split('T')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}

// 성별 변환 (M/F → 남성/여성)
export function formatGender(gender: string): string {
  if (gender === 'M' || gender === 'male') return '남성';
  if (gender === 'F' || gender === 'female') return '여성';
  return gender;
}
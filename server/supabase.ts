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
  birthDate: string;
  gender: string;
  organization: string;
  createdAt: string;
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
    const { data, error } = await supabase
      .from('test_sessions')
      .select(`
        *,
        participants!test_sessions_userId_fkey (*)
      `)
      .eq('participants.name', name)
      .eq('status', 'completed')
      .order('endTime', { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.error('Error fetching test session:', error);
      return null;
    }

    return data;
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

// 가민 데이터에서 파워 값들 추출 (6스테이지)
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
    const date = new Date(dateString);
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
import { supabase } from './supabase';

interface BalanceAnalysisResult {
  stage: string;
  leftBalance: number;
  rightBalance: number;
  imbalanceDifference: number;
}

/**
 * 가장 불균형한 테스트 단계의 좌우밸런스 찾기
 * stage_intervals 테이블에서 각 단계별 밸런스 데이터를 조회하고
 * 가장 차이가 큰 단계를 반환
 */
export async function findMostImbalancedStage(userDisplayName: string): Promise<BalanceAnalysisResult | null> {
  try {
    console.log('=== 밸런스 분석 시작 ===', userDisplayName);

    // 1. stage_intervals에서 밸런스 데이터 조회
    const { data: stages, error: stageError } = await supabase
      .from('stage_intervals')
      .select('*')
      .eq('user_display_name', userDisplayName)
      .order('sequence_number', { ascending: true });

    if (stageError || !stages || stages.length === 0) {
      console.log('stage_intervals에 밸런스 데이터 없음, garmin_data에서 계산 시도');
      
      // 2. garmin_data에서 직접 계산
      return await calculateBalanceFromGarminData(userDisplayName);
    }

    // 3. stage_intervals에 밸런스 컬럼이 있는지 확인
    const stagesWithBalance = stages.filter(stage => 
      stage.avg_left_balance !== null && stage.avg_right_balance !== null
    );

    if (stagesWithBalance.length === 0) {
      console.log('stage_intervals에 밸런스 컬럼 없음, garmin_data에서 계산');
      return await calculateBalanceFromGarminData(userDisplayName);
    }

    // 4. 가장 불균형한 단계 찾기
    let mostImbalanced = stagesWithBalance[0];
    let maxDifference = Math.abs(mostImbalanced.avg_left_balance - mostImbalanced.avg_right_balance);

    for (const stage of stagesWithBalance) {
      const difference = Math.abs(stage.avg_left_balance - stage.avg_right_balance);
      if (difference > maxDifference) {
        maxDifference = difference;
        mostImbalanced = stage;
      }
    }

    console.log('가장 불균형한 단계:', mostImbalanced.stage_name, '차이:', maxDifference);

    return {
      stage: mostImbalanced.stage_name,
      leftBalance: mostImbalanced.avg_left_balance,
      rightBalance: mostImbalanced.avg_right_balance,
      imbalanceDifference: maxDifference
    };

  } catch (error) {
    console.error('밸런스 분석 중 오류:', error);
    return null;
  }
}

/**
 * garmin_data에서 직접 밸런스 계산
 * 각 테스트 단계별로 데이터를 그룹화하고 평균 계산
 */
async function calculateBalanceFromGarminData(userDisplayName: string): Promise<BalanceAnalysisResult | null> {
  try {
    const { data: garminData, error } = await supabase
      .from('garmin_data')
      .select('*')
      .eq('user_display_name', userDisplayName)
      .order('timestamp', { ascending: true });

    if (error || !garminData || garminData.length === 0) {
      console.log('garmin_data에도 데이터 없음');
      return null;
    }

    console.log('garmin_data에서', garminData.length, '개 레코드 발견');

    // 스테이지별로 데이터 분할 (첨부파일 요구사항에 따라)
    const stages = [
      { name: '5초 최대파워', duration: 5 },
      { name: '15초 최대파워', duration: 15 },
      { name: '30초 최대파워', duration: 30 },
      { name: '60초 최대파워', duration: 60 },
      { name: '180초 지구력', duration: 180 },
      { name: '360초 지구력', duration: 360 }
    ];

    const stageResults = [];
    let currentIndex = 0;

    for (const stage of stages) {
      const stageData = garminData.slice(currentIndex, currentIndex + stage.duration);
      
      if (stageData.length === 0) break;

      const validBalanceData = stageData.filter(d => 
        d.left_balance !== null && d.right_balance !== null
      );

      if (validBalanceData.length > 0) {
        const avgLeft = validBalanceData.reduce((sum, d) => sum + d.left_balance, 0) / validBalanceData.length;
        const avgRight = validBalanceData.reduce((sum, d) => sum + d.right_balance, 0) / validBalanceData.length;
        const difference = Math.abs(avgLeft - avgRight);

        stageResults.push({
          stage: stage.name,
          leftBalance: avgLeft,
          rightBalance: avgRight,
          imbalanceDifference: difference
        });
      }

      currentIndex += stage.duration;
    }

    if (stageResults.length === 0) {
      console.log('밸런스 데이터가 있는 스테이지 없음');
      return null;
    }

    // 가장 불균형한 단계 찾기
    const mostImbalanced = stageResults.reduce((max, current) => 
      current.imbalanceDifference > max.imbalanceDifference ? current : max
    );

    console.log('garmin_data에서 계산한 가장 불균형한 단계:', mostImbalanced);
    return mostImbalanced;

  } catch (error) {
    console.error('garmin_data 밸런스 계산 중 오류:', error);
    return null;
  }
}
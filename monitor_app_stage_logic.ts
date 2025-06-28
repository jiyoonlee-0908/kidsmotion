// 모니터 앱에서 구현할 스테이지 구간 저장 로직
interface StageInterval {
  sessionId: string;
  userDisplayName: string;
  sequenceNumber: number;
  stageName: string;
  startTimestamp: Date;
  endTimestamp: Date;
  durationSeconds: number;
  maxPowerInStage: number;
  avgPowerInStage: number;
}

class StageManager {
  private currentStage = 0;
  private stageStartTime: Date | null = null;
  private stagePowerData: number[] = [];
  
  // 스테이지 정의
  private stages = [
    { sequence: 1, name: "5초 최대파워", targetDuration: 5 },
    { sequence: 2, name: "15초 파워", targetDuration: 15 },
    { sequence: 3, name: "30초 파워", targetDuration: 30 },
    { sequence: 4, name: "60초 파워", targetDuration: 60 },
    { sequence: 5, name: "180초 파워", targetDuration: 180 },
    { sequence: 6, name: "360초 파워", targetDuration: 360 }
  ];

  // 스테이지 시작
  startStage(sessionId: string, userDisplayName: string) {
    this.currentStage++;
    this.stageStartTime = new Date();
    this.stagePowerData = [];
    
    console.log(`스테이지 ${this.currentStage} 시작: ${this.stages[this.currentStage - 1]?.name}`);
  }

  // 실시간 파워 데이터 수집
  addPowerData(power: number) {
    if (this.stageStartTime) {
      this.stagePowerData.push(power);
    }
  }

  // 스테이지 종료 및 저장
  async endStage(sessionId: string, userDisplayName: string, supabase: any) {
    if (!this.stageStartTime || this.currentStage === 0) {
      console.error("스테이지가 시작되지 않았습니다");
      return;
    }

    const endTime = new Date();
    const durationSeconds = Math.floor((endTime.getTime() - this.stageStartTime.getTime()) / 1000);
    const maxPower = Math.max(...this.stagePowerData);
    const avgPower = this.stagePowerData.reduce((a, b) => a + b, 0) / this.stagePowerData.length;

    const stageData: StageInterval = {
      sessionId,
      userDisplayName,
      sequenceNumber: this.currentStage,
      stageName: this.stages[this.currentStage - 1]?.name || `스테이지 ${this.currentStage}`,
      startTimestamp: this.stageStartTime,
      endTimestamp: endTime,
      durationSeconds,
      maxPowerInStage: maxPower,
      avgPowerInStage: avgPower
    };

    // Supabase에 저장
    try {
      const { data, error } = await supabase
        .from('stage_intervals')
        .insert({
          session_id: stageData.sessionId,
          user_display_name: stageData.userDisplayName,
          sequence_number: stageData.sequenceNumber,
          stage_name: stageData.stageName,
          start_timestamp: stageData.startTimestamp.toISOString(),
          end_timestamp: stageData.endTimestamp.toISOString(),
          duration_seconds: stageData.durationSeconds,
          max_power_in_stage: stageData.maxPowerInStage,
          avg_power_in_stage: stageData.avgPowerInStage
        });

      if (error) {
        console.error("스테이지 구간 저장 실패:", error);
      } else {
        console.log(`✅ 스테이지 ${this.currentStage} 저장 완료:`, {
          stage: stageData.stageName,
          duration: `${durationSeconds}초`,
          maxPower: `${maxPower.toFixed(1)}W`,
          avgPower: `${avgPower.toFixed(1)}W`
        });
      }
    } catch (saveError) {
      console.error("스테이지 저장 중 오류:", saveError);
    }

    // 다음 스테이지 준비
    this.stageStartTime = null;
    this.stagePowerData = [];
  }

  // 전체 테스트 완료 시 모든 스테이지 확인
  async completeTest(sessionId: string) {
    console.log(`테스트 완료. 총 ${this.currentStage}개 스테이지 기록됨`);
    this.currentStage = 0;
  }
}

// 사용 예시
const stageManager = new StageManager();

// 테스트 시작
function onTestStart(sessionId: string, userDisplayName: string) {
  stageManager.startStage(sessionId, userDisplayName);
}

// 실시간 데이터 수신
function onPowerData(power: number) {
  stageManager.addPowerData(power);
}

// 스테이지 전환 (사용자 버튼 클릭 또는 자동 감지)
function onStageComplete(sessionId: string, userDisplayName: string, supabase: any) {
  stageManager.endStage(sessionId, userDisplayName, supabase);
  
  // 다음 스테이지 자동 시작 (또는 사용자 준비 대기)
  setTimeout(() => {
    stageManager.startStage(sessionId, userDisplayName);
  }, 2000); // 2초 휴식 후 다음 스테이지
}

export { StageManager, StageInterval };
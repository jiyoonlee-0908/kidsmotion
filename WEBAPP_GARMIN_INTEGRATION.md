# 웹앱 가민 데이터 통합 가이드

## 🎯 현재 Supabase 테이블 구조 확인

### 준비된 5개 핵심 테이블:
1. **participants** - 참가자 기본정보
2. **test_sessions** - 측정 세션 관리
3. **garmin_data** - 가민 실시간 데이터 (1초마다)
4. **stage_intervals** - 6단계 테스트별 결과
5. **analysis_results** - 최종 분석 결과

## 🔄 웹앱 데이터 전송 플로우

### Phase 1: 참가자 등록 및 세션 시작
```javascript
// 1. 참가자 등록
POST /api/participants
{
  name: "박시아",
  birth_date: "2019-07-02",
  gender: "F", 
  organization: "희망찬유치원",
  height: 112,
  weight: 19
}

// 2. 측정 세션 시작
POST /api/test-sessions
{
  participant_id: 8,
  session_type: "six_stage",
  status: "in_progress"
}
// → 응답: session_id = 5
```

### Phase 2: 실시간 가민 데이터 전송 (1초마다)
```javascript
// 가민 BLE에서 수신한 데이터를 1초마다 전송
POST /api/garmin/realtime-data
{
  session_id: 5,
  user_display_name: "박시아",
  timestamp: "2025-01-09T10:30:45.123Z",
  power: 125.5,        // 순간 파워값
  cadence: 85,         // 케이던스
  heart_rate: 145,     // 심박수
  left_balance: 52.3,  // 좌측 밸런스
  right_balance: 47.7  // 우측 밸런스
}

// 서버에서 garmin_data 테이블에 저장
INSERT INTO garmin_data (session_id, user_display_name, timestamp, power, cadence, heart_rate, left_balance, right_balance)
```

### Phase 3: 각 테스트 완료 시 결과 저장
```javascript
// 5초 테스트 완료 시 (최대 파워값 저장)
POST /api/stage-results
{
  session_id: 5,
  user_display_name: "박시아",
  sequence_number: 1,
  stage_name: "5초 순발력",
  start_timestamp: "2025-01-09T10:30:10.000Z",
  end_timestamp: "2025-01-09T10:30:15.000Z", 
  duration_seconds: 5,
  max_power_in_stage: 95.2,    // 5초간 최대값
  avg_power_in_stage: 89.1     // 5초간 평균값
}

// 15초 테스트 완료 시 (평균 파워값 중심)
POST /api/stage-results
{
  session_id: 5,
  sequence_number: 2,
  stage_name: "15초 스프린트",
  duration_seconds: 15,
  max_power_in_stage: 88.5,    // 15초간 최대값
  avg_power_in_stage: 82.3     // 15초간 평균값 (주요값)
}
```

### Phase 4: 최종 분석 결과 저장
```javascript
// 6단계 모두 완료 후 분석 실행
POST /api/analysis/calculate
{
  session_id: 5
}

// 서버에서 analysis_results 테이블에 저장
INSERT INTO analysis_results (
  session_id, bmi, age, overall_percentile,
  percentile_5s, percentile_15s, percentile_30s, percentile_60s,
  balance_status, ai_summary, ...
)
```

## 🛠️ API 엔드포인트 구조

### 필요한 API 엔드포인트들:
```javascript
// 참가자 관리
POST /api/participants              // 새 참가자 등록
GET /api/participants/search/:name  // 이름으로 검색

// 세션 관리  
POST /api/test-sessions            // 새 세션 시작
PUT /api/test-sessions/:id/complete // 세션 완료

// 실시간 데이터
POST /api/garmin/realtime-data     // 1초마다 가민 데이터
GET /api/sessions/:id/live-chart   // 실시간 차트용 데이터

// 테스트 결과
POST /api/stage-results            // 각 단계별 결과 저장
GET /api/sessions/:id/stages       // 6단계 결과 조회

// 분석 및 리포트
POST /api/analysis/calculate       // 백분위 계산 실행
GET /api/report/:session_id        // 최종 리포트 조회
```

## 💻 프론트엔드 코드 구조

### 1. 가민 BLE 연결 및 데이터 수신
```javascript
// components/GarminBLEConnection.tsx
const connectGarmin = async (sessionId) => {
  const device = await navigator.bluetooth.requestDevice({
    filters: [{ services: ['cycling_power'] }]
  });
  
  // 1초마다 데이터 수신
  const handleGarminData = (data) => {
    const garminData = {
      session_id: sessionId,
      timestamp: new Date().toISOString(),
      power: data.power,
      left_balance: data.leftBalance,
      right_balance: data.rightBalance,
      heart_rate: data.heartRate,
      cadence: data.cadence
    };
    
    // 서버로 실시간 전송
    sendRealtimeData(garminData);
  };
};
```

### 2. 테스트 단계 관리
```javascript
// components/StageTestManager.tsx
const stages = [
  { id: 1, name: "5초 순발력", duration: 5, type: "max_power" },
  { id: 2, name: "15초 스프린트", duration: 15, type: "avg_power" },
  { id: 3, name: "30초 지속력", duration: 30, type: "avg_power" },
  { id: 4, name: "60초 지구력", duration: 60, type: "avg_power" },
  { id: 5, name: "180초 유산소", duration: 180, type: "avg_power" },
  { id: 6, name: "360초 지구력", duration: 360, type: "avg_power" }
];

const startStageTest = (stageNumber) => {
  setCurrentStage(stageNumber);
  setStageStartTime(new Date());
  setIsTestRunning(true);
  
  // 가민 데이터 수집 시작
  startGarminCollection();
};

const completeStageTest = async (stageNumber) => {
  const endTime = new Date();
  const stageData = calculateStageResults(stageNumber, stageStartTime, endTime);
  
  // 서버에 단계별 결과 저장
  await saveStageResult(stageData);
  
  if (stageNumber === 6) {
    // 마지막 단계 완료 시 분석 실행
    await triggerFinalAnalysis(sessionId);
  }
};
```

### 3. 실시간 차트 업데이트
```javascript
// components/RealtimeChart.tsx
const RealtimeChart = ({ sessionId }) => {
  const [liveData, setLiveData] = useState([]);
  
  useEffect(() => {
    const interval = setInterval(async () => {
      const response = await fetch(`/api/sessions/${sessionId}/live-chart`);
      const data = await response.json();
      setLiveData(data.slice(-30)); // 최근 30초 데이터만 표시
    }, 1000);
    
    return () => clearInterval(interval);
  }, [sessionId]);
  
  return (
    <LineChart data={liveData}>
      <Line dataKey="power" stroke="#ff6b6b" name="파워(W)" />
      <Line dataKey="heart_rate" stroke="#4ecdc4" name="심박수" />
    </LineChart>
  );
};
```

## 🔍 데이터 검증 포인트

### 웹앱에서 확인해야 할 것들:
1. **실시간 연결**: 가민 BLE 연결 상태 표시
2. **데이터 수신**: 1초마다 파워값 업데이트 확인
3. **단계별 저장**: 각 테스트 완료 시 결과 저장 확인
4. **최종 분석**: 6단계 완료 후 백분위 계산 실행
5. **리포트 생성**: QR 코드 포함 HTML 리포트 생성

### 박시아 데이터로 테스트:
```
1. 웹앱에서 "박시아" 검색
2. 3개 측정 결과 확인 (5월/6월/7월)
3. 각 리포트에서 6단계별 상세 데이터 확인
4. 가민 실시간 데이터 그래프 확인
5. AI 분석 내용 및 진전 과정 확인
```

이 구조로 실제 가민 Rally RS200 페달과 연동하여 완전한 실시간 측정 시스템을 구축할 수 있습니다!
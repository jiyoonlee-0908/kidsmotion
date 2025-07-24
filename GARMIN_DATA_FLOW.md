# 가민 Rally RS200 데이터 수집 및 테스트 시나리오

## 🎯 현재 상황 분석

### Supabase 현재 테이블 구조
1. **participants** - 참가자 기본정보
2. **test_sessions** - 측정 세션 관리
3. **garmin_data** - 가민 실시간 데이터 (1초당 1레코드)
4. **stage_intervals** - 6단계 구간 정보
5. **analysis_results** - 최종 분석 결과

## ⚡ 가민 Rally RS200 데이터 특성

### 데이터 전송 빈도
- **초당 1회** 데이터 전송 (1Hz)
- 6분 최대 테스트 시: **360개 레코드/세션**
- 하루 10명 테스트 시: **3,600개 레코드/일**

### 전송 데이터 구조
```javascript
{
  timestamp: "2025-01-09T10:30:45.123Z",
  power: 125.5,           // 순간 파워 (W)
  left_balance: 52.3,     // 좌측 밸런스 (%)
  right_balance: 47.7,    // 우측 밸런스 (%)
  heart_rate: 145,        // 심박수 (BPM) - 선택적
  cadence: 85            // 케이던스 (RPM) - 선택적
}
```

## 🔄 완전한 테스트 시나리오

### Phase 1: 참가자 식별 및 등록
```
1. 태블릿에서 이름 입력 → "김철수"
2. Supabase 검색 → participants 테이블 조회
3. 중복 확인 기준: name + birth_date + organization + DATE(created_at)
4. 동명이인 처리:
   - 1명: 바로 선택
   - 2명 이상: "김철수 (2018-03-15, 꿈나무초등학교, 2025-01-09)" 형태로 표시
   - 0명: 새 참가자 등록 폼 표시
```

### Phase 2: 측정 세션 시작
```
1. "측정 시작" 버튼 클릭
2. test_sessions 테이블에 새 레코드 생성:
   {
     participant_id: 123,
     session_type: 'six_stage',
     status: 'in_progress',
     start_time: NOW()
   }
3. session_id 반환 (예: 456)
4. 가민 BLE 연결 확인 화면 표시
```

### Phase 3: 실시간 데이터 수집
```
1. 가민 페달 연결 성공
2. 1초마다 데이터 수신:
   BLE → 태블릿 → POST /api/garmin/realtime
3. garmin_data 테이블 저장:
   {
     session_id: 456,
     timestamp: "실시간",
     power: 125.5,
     left_balance: 52.3,
     right_balance: 47.7,
     heart_rate: 145,
     cadence: 85
   }
4. 실시간 차트 업데이트
```

### Phase 4: 6단계 자동 감지
```
스테이지 감지 알고리즘:
- 파워 > 50W 연속 3초: 측정 구간 시작
- 파워 < 30W 연속 5초: 측정 구간 종료
- 지속시간으로 스테이지 분류:
  * 3-8초: 5초 스테이지
  * 12-20초: 15초 스테이지  
  * 25-40초: 30초 스테이지
  * 50-80초: 60초 스테이지
  * 150-220초: 180초 스테이지
  * 300-420초: 360초 스테이지

자동 저장:
stage_intervals 테이블에 각 구간 정보 저장
```

### Phase 5: 측정 완료 및 분석
```
1. 마지막 스테이지 완료 감지
2. test_sessions 업데이트: status = 'completed', end_time = NOW()
3. 백분위 계산 실행
4. AI 분석 요청 (GPT-4o)
5. analysis_results 테이블 저장
6. HTML 리포트 생성
7. QR 코드 생성
```

## 🗃️ 데이터베이스 용량 관리

### 예상 데이터량
- **일일**: 3,600 레코드 (10명 × 360레코드)
- **월간**: 108,000 레코드 (30일)
- **연간**: 1,314,000 레코드

### 자동 정리 정책
```sql
-- 90일 이상 된 원시 데이터 삭제 (분석 완료된 세션만)
DELETE FROM garmin_data 
WHERE created_at < NOW() - INTERVAL '90 days' 
AND session_id IN (
  SELECT id FROM test_sessions 
  WHERE status = 'completed'
);

-- 요약 데이터는 영구 보관
-- stage_intervals, analysis_results는 유지
```

## 🔧 API 엔드포인트 설계

### 실시간 데이터 수집
```javascript
POST /api/garmin/realtime
{
  session_id: 456,
  data: {
    timestamp: "2025-01-09T10:30:45.123Z",
    power: 125.5,
    left_balance: 52.3,
    right_balance: 47.7,
    heart_rate: 145,
    cadence: 85
  }
}
```

### 스테이지 감지 및 저장
```javascript
POST /api/sessions/{session_id}/stage-detected
{
  stage_number: 1,
  stage_name: "5초 순발력",
  start_time: "2025-01-09T10:30:10.000Z",
  end_time: "2025-01-09T10:30:15.000Z",
  max_power: 280.5,
  avg_power: 265.2
}
```

### 실시간 모니터링
```javascript
GET /api/sessions/{session_id}/live-data
// 최근 10초간 데이터 반환 (실시간 차트용)

WebSocket /ws/sessions/{session_id}
// 실시간 데이터 스트림
```

## 🎮 사용자 인터페이스 플로우

### 화면 1: 참가자 선택
```
[이름 입력] "김철수" [검색]
→ 결과: 
  ○ 김철수 (2018-03-15, 꿈나무초등학교, 1월9일)
  ○ 김철수 (2017-11-20, 새싹초등학교, 1월8일)
  ○ + 새 참가자 등록
```

### 화면 2: 측정 준비
```
김철수 (7세, 꿈나무초등학교)
키: 115cm, 몸무게: 25kg

🔄 가민 페달 연결 중...
✅ 연결 완료

[측정 시작] 버튼
```

### 화면 3: 실시간 측정
```
⏱️ 현재 스테이지: 2단계 (15초 스프린트)
⚡ 실시간 파워: 125W
📊 목표 달성률: 78%
⚖️ 밸런스: L52% / R48%
💓 심박수: 145 BPM

진행률: ████████░░ 80%
```

### 화면 4: 완료 및 결과
```
🎉 측정 완료!
종합 등급: 우수 (85%)

📱 QR 코드 스캔하여 상세 결과 확인
[리포트 보기] [PDF 저장] [다음 참가자]
```

이 구조로 실제 가민 데이터를 안정적으로 수집하고 분석할 수 있습니다.
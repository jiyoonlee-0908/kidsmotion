# KidsMotion 모니터 앱 스테이지 구간 저장 기능 추가 요청

## 🎯 **요청 배경**
현재 웹 분석 시스템에서 가민 데이터의 고정된 시간 구간(0~5초, 65~80초 등)으로 파워값을 추출하고 있는데, 실제로는 아이들이 준비되는 대로 각 스테이지를 시작하기 때문에 정확한 분석이 어렵습니다.

## 📋 **구현 요청사항**

### **1. 데이터베이스 테이블 추가**
```sql
-- stage_intervals 테이블 생성
CREATE TABLE IF NOT EXISTS stage_intervals (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_display_name TEXT NOT NULL,
  sequence_number INTEGER NOT NULL, -- 1, 2, 3, 4, 5, 6
  stage_name TEXT NOT NULL,         -- "5초 최대파워", "15초 파워" 등
  start_timestamp TIMESTAMP NOT NULL,
  end_timestamp TIMESTAMP NOT NULL,
  duration_seconds INTEGER NOT NULL,
  max_power_in_stage REAL NOT NULL,
  avg_power_in_stage REAL NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **2. 스테이지 저장 로직**
- 각 스테이지 시작 시 `startStage()` 호출
- 실시간 파워 데이터 수집 `addPowerData(power)`
- 스테이지 완료 시 `endStage()` 호출하여 Supabase 저장

### **3. 저장할 데이터 구조**
```javascript
{
  session_id: "test_session_123",
  user_display_name: "홍길동",
  sequence_number: 1,              // 스테이지 순서
  stage_name: "5초 최대파워",
  start_timestamp: "2024-12-28T10:30:00Z",
  end_timestamp: "2024-12-28T10:30:05Z", 
  duration_seconds: 5,
  max_power_in_stage: 185.4,       // 해당 구간 최대파워
  avg_power_in_stage: 167.2        // 해당 구간 평균파워
}
```

### **4. 6개 스테이지 정의**
1. **sequence_number: 1** → "5초 최대파워"
2. **sequence_number: 2** → "15초 파워"
3. **sequence_number: 3** → "30초 파워"
4. **sequence_number: 4** → "60초 파워"
5. **sequence_number: 5** → "180초 파워"
6. **sequence_number: 6** → "360초 파워"

## 💡 **기대 효과**
- ✅ 아이들의 실제 테스트 패턴에 맞는 정확한 구간 분석
- ✅ 웹 분석 시스템에서 sequence_number 순서로 파워값 추출
- ✅ 테스트 품질 향상 (임의 시간 구간 → 실제 스테이지 구간)

## 🔗 **웹 시스템 연동**
모니터 앱에서 저장한 데이터는 웹 분석 시스템에서 아래 API로 조회합니다:
```
GET /api/supabase/stages/홍길동
→ { powerValues: { power5s: 185.4, power15s: 167.2, ... } }
```

## 📎 **첨부 파일**
- `stage_intervals_schema.sql` - 테이블 생성 스크립트
- `monitor_app_stage_logic.ts` - 구현 참고 코드

구현 완료되면 웹 분석 시스템에서 훨씬 정확한 체력 분석이 가능해집니다!
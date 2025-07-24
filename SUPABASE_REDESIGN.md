# KidsMotion Supabase 데이터베이스 재설계 (2025.01.09)

## 🎯 설계 목표
1. **단순화**: 복잡한 테이블 구조 정리, 핵심 데이터만 보관
2. **실용성**: 실제 가민 데이터 수집에 최적화된 구조
3. **확장성**: 향후 기능 추가 시 유연한 확장 가능
4. **성능**: 빠른 조회와 분석을 위한 최적화

## 📊 현재 테이블 분석 및 정리 방향

### 🗑️ 삭제할 테이블 (불필요/중복)
- `fitness_report_snapshots`: HTML 저장은 파일 시스템 사용
- `report_results`: 중복 데이터, analysis_results로 통합
- 기타 사용하지 않는 임시 테이블들

### ✅ 유지/개선할 핵심 테이블

#### 1. **participants** (참가자 정보)
```sql
CREATE TABLE participants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  birth_date DATE NOT NULL,
  gender CHAR(1) CHECK (gender IN ('M', 'F')),
  organization VARCHAR(100),
  height INTEGER CHECK (height > 0 AND height < 250),
  weight INTEGER CHECK (weight > 0 AND weight < 200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 중복 방지를 위한 복합 인덱스
  UNIQUE(name, birth_date, organization, DATE(created_at))
);
```
**용도**: 기본 참가자 정보 및 신체 정보 저장

#### 2. **test_sessions** (측정 세션)
```sql
CREATE TABLE test_sessions (
  id SERIAL PRIMARY KEY,
  participant_id INTEGER REFERENCES participants(id) ON DELETE CASCADE,
  session_type VARCHAR(20) DEFAULT 'six_stage' CHECK (session_type IN ('six_stage', 'custom')),
  start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  end_time TIMESTAMP WITH TIME ZONE,
  status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'cancelled')),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**용도**: 각 측정 세션의 메타 정보 관리

#### 3. **garmin_data** (가민 원시 데이터)
```sql
CREATE TABLE garmin_data (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES test_sessions(id) ON DELETE CASCADE,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
  power DECIMAL(6,2) CHECK (power >= 0 AND power <= 2000),
  left_balance DECIMAL(5,2) CHECK (left_balance >= 0 AND left_balance <= 100),
  right_balance DECIMAL(5,2) CHECK (right_balance >= 0 AND right_balance <= 100),
  heart_rate INTEGER CHECK (heart_rate > 0 AND heart_rate < 250),
  cadence INTEGER CHECK (cadence >= 0 AND cadence <= 200),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 성능을 위한 인덱스
  INDEX idx_garmin_session_time (session_id, timestamp),
  INDEX idx_garmin_power (session_id, power DESC)
);
```
**용도**: 1초 단위 실시간 가민 데이터 저장

#### 4. **stage_intervals** (스테이지 구간 정보)
```sql
CREATE TABLE stage_intervals (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES test_sessions(id) ON DELETE CASCADE,
  stage_number INTEGER CHECK (stage_number >= 1 AND stage_number <= 6),
  stage_name VARCHAR(20) NOT NULL,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_seconds INTEGER GENERATED ALWAYS AS (EXTRACT(EPOCH FROM (end_time - start_time))) STORED,
  max_power DECIMAL(6,2),
  avg_power DECIMAL(6,2),
  avg_left_balance DECIMAL(5,2),
  avg_right_balance DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 세션당 스테이지 번호 중복 방지
  UNIQUE(session_id, stage_number)
);
```
**용도**: 6단계 측정 구간별 요약 데이터

#### 5. **analysis_results** (분석 결과 - 통합)
```sql
CREATE TABLE analysis_results (
  id SERIAL PRIMARY KEY,
  session_id INTEGER REFERENCES test_sessions(id) ON DELETE CASCADE UNIQUE,
  
  -- 6단계 파워 값 (절대값)
  power_5s DECIMAL(6,2),
  power_15s DECIMAL(6,2),
  power_30s DECIMAL(6,2),
  power_60s DECIMAL(6,2),
  power_180s DECIMAL(6,2),
  power_360s DECIMAL(6,2),
  
  -- 상대 파워 값 (W/kg^exponent)
  relative_power_5s DECIMAL(8,4),
  relative_power_15s DECIMAL(8,4),
  relative_power_30s DECIMAL(8,4),
  relative_power_60s DECIMAL(8,4),
  relative_power_180s DECIMAL(8,4),
  relative_power_360s DECIMAL(8,4),
  
  -- 백분위 점수
  percentile_5s DECIMAL(5,2),
  percentile_15s DECIMAL(5,2),
  percentile_30s DECIMAL(5,2),
  percentile_60s DECIMAL(5,2),
  percentile_180s DECIMAL(5,2),
  percentile_360s DECIMAL(5,2),
  overall_percentile DECIMAL(5,2),
  
  -- 밸런스 분석
  left_balance DECIMAL(5,2),
  right_balance DECIMAL(5,2),
  balance_status VARCHAR(20),
  
  -- 신체 지수
  bmi DECIMAL(5,2),
  age_at_test INTEGER,
  
  -- AI 분석 결과
  strengths TEXT[], -- 강점 영역 배열
  improvements TEXT[], -- 개선 영역 배열
  ai_core_insights TEXT, -- AI 핵심 분석
  ai_balance_commentary TEXT, -- 밸런스 분석
  ai_exercise_recommendations TEXT, -- 운동 추천
  
  -- 리포트 관련
  report_html_path VARCHAR(255), -- HTML 파일 경로
  qr_code_generated BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```
**용도**: 모든 분석 결과를 하나의 테이블에 통합 저장

## 🔄 데이터 플로우 설계

### 1단계: 참가자 등록
```
웹앱 입력 → participants 테이블 INSERT → 중복 검사 → 성공/실패 응답
```

### 2단계: 측정 세션 시작
```
"측정 시작" 버튼 → test_sessions INSERT (status='in_progress') → session_id 반환
```

### 3단계: 실시간 데이터 수집
```
가민 BLE 데이터 → 1초마다 garmin_data INSERT → 실시간 차트 업데이트
```

### 4단계: 스테이지 감지 및 저장
```
파워 패턴 분석 → 6단계 구간 감지 → stage_intervals INSERT → 진행률 표시
```

### 5단계: 측정 완료 및 분석
```
마지막 스테이지 완료 → test_sessions UPDATE (status='completed') → 
백분위 계산 → AI 분석 요청 → analysis_results INSERT → 리포트 생성
```

### 6단계: 리포트 접근
```
QR 코드 스캔 → session_id 조회 → analysis_results SELECT → HTML 리포트 표시
```

## 📈 성능 최적화 전략

### 인덱스 설계
```sql
-- 자주 조회되는 패턴에 맞춘 인덱스
CREATE INDEX idx_participants_search ON participants(name, birth_date);
CREATE INDEX idx_sessions_participant ON test_sessions(participant_id, created_at DESC);
CREATE INDEX idx_garmin_realtime ON garmin_data(session_id, timestamp DESC);
CREATE INDEX idx_analysis_lookup ON analysis_results(session_id);
```

### 데이터 보존 정책
```sql
-- 90일 이상 된 garmin_data 자동 삭제 (용량 관리)
DELETE FROM garmin_data 
WHERE created_at < NOW() - INTERVAL '90 days' 
AND session_id IN (
  SELECT id FROM test_sessions 
  WHERE status = 'completed' 
  AND created_at < NOW() - INTERVAL '90 days'
);
```

## 🛠️ API 엔드포인트 재설계

### 참가자 관리
- `POST /api/participants` - 새 참가자 등록
- `GET /api/participants/search/{name}` - 이름으로 검색 (중복 제거)
- `DELETE /api/participants/{id}` - 참가자 및 관련 데이터 완전 삭제

### 측정 세션 관리
- `POST /api/sessions` - 새 세션 시작
- `PUT /api/sessions/{id}/complete` - 세션 완료 처리
- `GET /api/sessions/{id}/status` - 세션 상태 조회

### 실시간 데이터
- `POST /api/garmin/data` - 가민 데이터 실시간 저장
- `GET /api/sessions/{id}/realtime` - 실시간 데이터 스트림
- `POST /api/sessions/{id}/stages` - 스테이지 구간 저장

### 분석 및 리포트
- `POST /api/analysis/{session_id}` - 분석 실행
- `GET /api/report/{session_id}` - 리포트 조회
- `GET /api/reports/list` - 전체 리포트 목록

## 🔒 데이터 보안 및 검증

### 입력 검증
- 모든 숫자 필드에 범위 제한 (CHECK 제약 조건)
- 필수 필드 NOT NULL 제약
- 외래키 참조 무결성 보장

### 권한 관리
- 개인 정보 접근 로그 기록
- 관리자 권한 분리 (조회/수정/삭제)
- API 요청 빈도 제한

이 구조로 구현하면 더 안정적이고 확장 가능한 시스템이 될 것입니다.
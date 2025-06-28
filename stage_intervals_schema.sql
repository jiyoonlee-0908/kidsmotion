-- 모니터 앱에서 구현할 스테이지 구간 저장 테이블
CREATE TABLE IF NOT EXISTS stage_intervals (
  id SERIAL PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_display_name TEXT NOT NULL,
  sequence_number INTEGER NOT NULL, -- 1, 2, 3, 4, 5, 6 (스테이지 순서)
  stage_name TEXT NOT NULL,         -- "5초 최대파워", "15초 파워", "30초 파워", "60초 파워", "180초 파워", "360초 파워"
  start_timestamp TIMESTAMP NOT NULL,
  end_timestamp TIMESTAMP NOT NULL,
  duration_seconds INTEGER NOT NULL,
  max_power_in_stage REAL NOT NULL,
  avg_power_in_stage REAL NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 인덱스 추가
CREATE INDEX idx_stage_intervals_session ON stage_intervals(session_id);
CREATE INDEX idx_stage_intervals_user ON stage_intervals(user_display_name);
CREATE INDEX idx_stage_intervals_sequence ON stage_intervals(session_id, sequence_number);
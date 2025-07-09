# KidsMotion 웹앱 → Supabase 데이터 매핑 가이드

## 📋 폼 데이터를 Supabase 테이블에 저장하는 방법

### 1. 참가자 정보 저장 (participants 테이블)

```sql
INSERT INTO participants (name, birth_date, gender, organization, display_name) 
VALUES (
    '홍길동',                    -- 이름
    '2018-06-15',               -- 생년월일
    '남자',                     -- 성별
    '서울초등학교',              -- 기관
    '홍길동_2018-06-15'         -- display_name (자동생성)
);
```

**JavaScript 예시:**
```javascript
async function saveParticipant(formData) {
    const { data, error } = await supabase
        .from('participants')
        .insert([{
            name: formData.name,              // 폼의 "이름" 필드
            birth_date: formData.birth_date,  // 폼의 "생년월일" 필드
            gender: formData.gender,          // 폼의 "성별" 필드
            organization: formData.organization, // 폼의 "기관" 필드
            display_name: `${formData.name}_${formData.birth_date}` // 자동생성
        }])
        .select();
    
    return data[0]; // 생성된 참가자 정보 반환
}
```

### 2. 테스트 세션 생성 (test_sessions 테이블)

```sql
INSERT INTO test_sessions (
    user_id, 
    user_display_name, 
    start_time, 
    status, 
    total_stages, 
    completed_stages
) VALUES (
    77,                         -- participants 테이블의 id
    '홍길동_2018-06-15',        -- display_name
    '2025-07-10 09:00:00',      -- 측정일시
    'completed',                -- 상태
    6,                          -- 총 단계수
    4                           -- 완료된 단계수 (5초,15초,30초,60초만 입력한 경우)
);
```

**JavaScript 예시:**
```javascript
async function createTestSession(participantId, userDisplayName, measurementDate) {
    const { data, error } = await supabase
        .from('test_sessions')
        .insert([{
            user_id: participantId,
            user_display_name: userDisplayName,
            start_time: measurementDate,      // 폼의 "측정일" 필드
            status: 'completed',
            total_stages: 6,
            completed_stages: 4  // 입력된 단계수에 따라 조정
        }])
        .select();
    
    return data[0];
}
```

### 3. 단계별 파워 데이터 저장 (stage_intervals 테이블)

**필수 4단계 저장:**
```sql
-- 5초 파워
INSERT INTO stage_intervals (
    session_id, user_display_name, sequence_number, stage_name, 
    max_power_in_stage, avg_power_in_stage, duration_seconds
) VALUES (
    100,                        -- test_sessions의 id
    '홍길동_2018-06-15',        -- display_name
    1,                          -- 단계 번호
    '5초 최대파워',             -- 단계명
    250.5,                      -- 폼의 "5초 파워" 필드값
    250.5,                      -- 평균파워 (최대값과 동일하게 설정)
    5                           -- 지속시간
);

-- 15초 파워
INSERT INTO stage_intervals (
    session_id, user_display_name, sequence_number, stage_name, 
    max_power_in_stage, avg_power_in_stage, duration_seconds
) VALUES (
    100, '홍길동_2018-06-15', 2, '15초 최대파워', 
    180.3, 180.3, 15           -- 폼의 "15초 파워" 필드값
);

-- 30초 파워
INSERT INTO stage_intervals (
    session_id, user_display_name, sequence_number, stage_name, 
    max_power_in_stage, avg_power_in_stage, duration_seconds
) VALUES (
    100, '홍길동_2018-06-15', 3, '30초 최대파워', 
    160.7, 160.7, 30           -- 폼의 "30초 파워" 필드값
);

-- 60초 파워
INSERT INTO stage_intervals (
    session_id, user_display_name, sequence_number, stage_name, 
    max_power_in_stage, avg_power_in_stage, duration_seconds
) VALUES (
    100, '홍길동_2018-06-15', 4, '60초 최대파워', 
    150.2, 150.2, 60           -- 폼의 "60초 파워" 필드값
);
```

**고급 측정 추가 시 (선택사항):**
```sql
-- 180초 근지구력
INSERT INTO stage_intervals (
    session_id, user_display_name, sequence_number, stage_name, 
    max_power_in_stage, avg_power_in_stage, duration_seconds
) VALUES (
    100, '홍길동_2018-06-15', 5, '180초 지구력', 
    140.1, 140.1, 180          -- 폼의 "180초 근지구력" 필드값
);

-- 360초 심폐지구력
INSERT INTO stage_intervals (
    session_id, user_display_name, sequence_number, stage_name, 
    max_power_in_stage, avg_power_in_stage, duration_seconds
) VALUES (
    100, '홍길동_2018-06-15', 6, '360초 지구력', 
    130.5, 130.5, 360          -- 폼의 "360초 심폐지구력" 필드값
);
```

**JavaScript 예시:**
```javascript
async function savePowerData(sessionId, userDisplayName, powerValues) {
    const stages = [];
    
    // 필수 4단계
    if (powerValues.power5s) {
        stages.push({
            session_id: sessionId,
            user_display_name: userDisplayName,
            sequence_number: 1,
            stage_name: '5초 최대파워',
            max_power_in_stage: powerValues.power5s,
            avg_power_in_stage: powerValues.power5s,
            duration_seconds: 5
        });
    }
    
    if (powerValues.power15s) {
        stages.push({
            session_id: sessionId,
            user_display_name: userDisplayName,
            sequence_number: 2,
            stage_name: '15초 최대파워',
            max_power_in_stage: powerValues.power15s,
            avg_power_in_stage: powerValues.power15s,
            duration_seconds: 15
        });
    }
    
    if (powerValues.power30s) {
        stages.push({
            session_id: sessionId,
            user_display_name: userDisplayName,
            sequence_number: 3,
            stage_name: '30초 최대파워',
            max_power_in_stage: powerValues.power30s,
            avg_power_in_stage: powerValues.power30s,
            duration_seconds: 30
        });
    }
    
    if (powerValues.power60s) {
        stages.push({
            session_id: sessionId,
            user_display_name: userDisplayName,
            sequence_number: 4,
            stage_name: '60초 최대파워',
            max_power_in_stage: powerValues.power60s,
            avg_power_in_stage: powerValues.power60s,
            duration_seconds: 60
        });
    }
    
    // 고급 측정 (선택사항)
    if (powerValues.power180s) {
        stages.push({
            session_id: sessionId,
            user_display_name: userDisplayName,
            sequence_number: 5,
            stage_name: '180초 지구력',
            max_power_in_stage: powerValues.power180s,
            avg_power_in_stage: powerValues.power180s,
            duration_seconds: 180
        });
    }
    
    if (powerValues.power360s) {
        stages.push({
            session_id: sessionId,
            user_display_name: userDisplayName,
            sequence_number: 6,
            stage_name: '360초 지구력',
            max_power_in_stage: powerValues.power360s,
            avg_power_in_stage: powerValues.power360s,
            duration_seconds: 360
        });
    }
    
    const { data, error } = await supabase
        .from('stage_intervals')
        .insert(stages);
        
    return data;
}
```

### 4. 분석 결과 저장 (report_results 테이블)

```sql
INSERT INTO report_results (
    session_id, 
    user_display_name, 
    analysis_data
) VALUES (
    100,                        -- test_sessions의 id
    '홍길동_2018-06-15',        -- display_name
    '{
        "height": 120,           -- 폼의 "키" 필드
        "weight": 25,            -- 폼의 "체중" 필드
        "left_balance": 50,      -- 폼의 "왼쪽 밸런스" 필드
        "right_balance": 50,     -- 폼의 "오른쪽 밸런스" 필드
        "max_heart_rate": 180,   -- 폼의 "최대 심박수" 필드 (선택사항)
        "avg_heart_rate": 150,   -- 폼의 "평균 심박수" 필드 (선택사항)
        "measurement_date": "2025-07-10"
    }'::jsonb
);
```

**JavaScript 예시:**
```javascript
async function saveAnalysisResults(sessionId, userDisplayName, formData) {
    const analysisData = {
        height: formData.height,                    // 키
        weight: formData.weight,                    // 체중
        left_balance: formData.left_balance || 50,  // 왼쪽 밸런스
        right_balance: formData.right_balance || 50, // 오른쪽 밸런스
        max_heart_rate: formData.max_heart_rate,    // 최대 심박수 (선택사항)
        avg_heart_rate: formData.avg_heart_rate,    // 평균 심박수 (선택사항)
        measurement_date: formData.measurement_date  // 측정일
    };
    
    const { data, error } = await supabase
        .from('report_results')
        .insert([{
            session_id: sessionId,
            user_display_name: userDisplayName,
            analysis_data: analysisData
        }]);
        
    return data;
}
```

## 🔄 전체 저장 프로세스

```javascript
async function saveCompleteTestData(formData) {
    try {
        // 1. 참가자 저장
        const participant = await saveParticipant(formData);
        
        // 2. 테스트 세션 생성
        const session = await createTestSession(
            participant.id, 
            participant.display_name, 
            formData.measurement_date
        );
        
        // 3. 파워 데이터 저장
        await savePowerData(session.id, participant.display_name, {
            power5s: formData.power5s,
            power15s: formData.power15s,
            power30s: formData.power30s,
            power60s: formData.power60s,
            power180s: formData.power180s,  // 선택사항
            power360s: formData.power360s   // 선택사항
        });
        
        // 4. 분석 결과 저장
        await saveAnalysisResults(session.id, participant.display_name, formData);
        
        console.log('모든 데이터 저장 완료!');
        return { participant, session };
        
    } catch (error) {
        console.error('데이터 저장 실패:', error);
        throw error;
    }
}
```

## 📊 필드 매핑표

| 웹앱 폼 필드 | Supabase 테이블 | 컬럼명 | 데이터 타입 |
|-------------|----------------|--------|------------|
| 측정일 | test_sessions | start_time | timestamp |
| 이름 | participants | name | text |
| 기관 | participants | organization | text |
| 생년월일 | participants | birth_date | date |
| 성별 | participants | gender | text |
| 키 | report_results | analysis_data.height | jsonb |
| 체중 | report_results | analysis_data.weight | jsonb |
| 5초 파워 | stage_intervals | max_power_in_stage (seq=1) | real |
| 15초 파워 | stage_intervals | max_power_in_stage (seq=2) | real |
| 30초 파워 | stage_intervals | max_power_in_stage (seq=3) | real |
| 60초 파워 | stage_intervals | max_power_in_stage (seq=4) | real |
| 왼쪽 밸런스 | report_results | analysis_data.left_balance | jsonb |
| 오른쪽 밸런스 | report_results | analysis_data.right_balance | jsonb |
| 최대 심박수 | report_results | analysis_data.max_heart_rate | jsonb |
| 평균 심박수 | report_results | analysis_data.avg_heart_rate | jsonb |
| 180초 근지구력 | stage_intervals | max_power_in_stage (seq=5) | real |
| 360초 심폐지구력 | stage_intervals | max_power_in_stage (seq=6) | real |

이 가이드를 따라하면 웹앱의 모든 폼 데이터를 Supabase에 올바르게 저장할 수 있습니다.
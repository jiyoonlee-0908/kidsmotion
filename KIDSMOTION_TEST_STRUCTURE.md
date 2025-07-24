# KidsMotion 테스트 구조 설계 (2025.01.09)

## 🎯 새로운 테스트 구조 목표
- **실제 가민 데이터 기반 측정**: 가상 데이터 완전 제거
- **6단계 점진적 테스트**: 5s → 15s → 30s → 60s → 180s → 360s
- **실시간 BLE 연동**: Garmin Rally RS200 페달과 직접 연결
- **과학적 백분위 계산**: 연령별 allometric scaling 적용
- **QR 코드 리포트 시스템**: HTML 스냅샷 + 모바일 최적화

## 📊 Supabase 데이터 구조 정의

### 1. 참가자 등록 (participants)
```sql
- id: 고유 식별자
- name: 학생 이름
- birth_date: 생년월일 (YYYY-MM-DD)
- gender: 성별 (M/F)
- organization: 소속 기관
- height: 키 (cm)
- weight: 몸무게 (kg)
- created_at: 등록 시간
- display_name: 표시명 (중복 제거용)
```

### 2. 측정 세션 (test_sessions)
```sql
- id: 세션 고유 ID
- participant_id: 참가자 ID (FK)
- start_time: 측정 시작 시간
- end_time: 측정 종료 시간
- status: 측정 상태 (진행중/완료/중단)
- test_type: 측정 유형 (6stage_progressive)
```

### 3. 가민 원시 데이터 (garmin_data)
```sql
- id: 데이터 포인트 ID
- session_id: 세션 ID (FK)
- timestamp: 측정 시점
- power: 순간 파워 (W)
- left_balance: 좌측 밸런스 (%)
- right_balance: 우측 밸런스 (%)
- heart_rate: 심박수 (BPM)
- cadence: 케이던스 (RPM)
- user_display_name: 사용자 식별자
```

### 4. 스테이지 구간 (stage_intervals)
```sql
- id: 구간 ID
- session_id: 세션 ID (FK)
- sequence_number: 스테이지 순서 (1-6)
- stage_name: 스테이지 명칭
- start_timestamp: 구간 시작 시간
- end_timestamp: 구간 종료 시간
- duration_seconds: 지속 시간
- max_power_in_stage: 구간 최대 파워
- avg_power_in_stage: 구간 평균 파워
- avg_left_balance: 평균 좌측 밸런스
- avg_right_balance: 평균 우측 밸런스
```

### 5. 분석 결과 (analysis_results)
```sql
- id: 분석 ID
- session_id: 세션 ID (FK)
- power5s: 5초 최대 파워
- power15s: 15초 최대 파워
- power30s: 30초 최대 파워
- power60s: 60초 최대 파워
- power180s: 180초 최대 파워
- power360s: 360초 최대 파워
- percentile5s: 5초 백분위
- percentile15s: 15초 백분위
- percentile30s: 30초 백분위
- percentile60s: 60초 백분위
- percentile180s: 180초 백분위
- percentile360s: 360초 백분위
- overall_percentile: 종합 백분위
- leftBalance: 좌측 밸런스
- rightBalance: 우측 밸런스
- bmi: BMI 지수
- strengths: 강점 영역
- improvements: 개선 영역
- aiCoreInsights: AI 핵심 분석
- balanceStatus: 밸런스 상태
- created_at: 분석 시간
```

## 🔄 데이터 수집 프로세스

### Phase 1: 참가자 등록
1. **웹앱 입력**: 이름, 생년월일, 성별, 소속, 키, 몸무게
2. **중복 검사**: 4개 필드 기준 (이름+생년월일+기관+측정일)
3. **Supabase 저장**: participants 테이블에 등록

### Phase 2: 가민 데이터 수집
1. **BLE 연결**: Garmin Rally RS200 페달 페어링
2. **실시간 측정**: 파워, 밸런스, 심박수 데이터 수집
3. **Raw 데이터 저장**: garmin_data 테이블에 1초 단위 저장

### Phase 3: 스테이지 감지
1. **파워 임계값 분석**: 연속 측정 구간 자동 감지
2. **6단계 매핑**: 지속 시간 기준으로 스테이지 분류
3. **구간 데이터 저장**: stage_intervals 테이블에 저장

### Phase 4: 과학적 분석
1. **Allometric Scaling**: 연령별 지수 적용 (≤9세: 0.75, 10-13세: 0.72, ≥14세: 0.67)
2. **백분위 계산**: 5등급 시스템 (P3, P15, P50, P85, P97)
3. **AI 분석**: GPT-4o 기반 개인화된 피드백 생성

### Phase 5: 리포트 생성
1. **HTML 스냅샷**: 완전한 리포트 HTML 생성
2. **QR 코드**: 모바일 접근용 QR 코드 생성
3. **PDF 내보내기**: 인쇄용 PDF 생성

## 🎮 웹앱 사용자 프롬프트 설계

### 1. 측정 시작 화면
```
"안녕하세요! KidsMotion 체력 측정을 시작합니다.

🎯 측정 순서:
1단계: 5초 폭발적 파워 (순발력)
2단계: 15초 스프린트 파워 (스피드)
3단계: 30초 파워 지속력 (근력)
4단계: 60초 근력 지구력
5단계: 180초 중거리 지구력
6단계: 360초 장거리 지구력

⚡ 가민 페달이 연결되었습니다.
각 단계마다 최대한 힘껏 페달을 밟아주세요!"
```

### 2. 각 스테이지별 안내
```
🚀 [1단계] 5초 순발력 측정
"5초 동안 최대한 빠르게 페달을 밟아주세요!
폭발적인 파워로 시작하세요!"

💨 [2단계] 15초 스프린트
"15초 동안 전력 질주! 
속도를 유지하며 끝까지 밀어붙이세요!"

💪 [3단계] 30초 파워 지속
"30초 동안 강한 힘을 유지하세요!
근력을 보여주는 시간입니다!"

🔥 [4단계] 60초 근지구력
"1분 동안 꾸준한 파워를 유지하세요!
조금씩 힘을 배분하며 끝까지!"

⛰️ [5단계] 180초 중거리 지구력
"3분 동안 자신만의 페이스를 찾아서!
숨 고르기가 중요합니다!"

🏔️ [6단계] 360초 장거리 지구력
"6분 동안 끝까지 완주하세요!
당신의 진짜 체력을 보여주세요!"
```

### 3. 실시간 피드백
```
⚡ 실시간 파워: 125W
💯 현재 백분위: 78% (우수)
⚖️ 좌우 밸런스: 52% / 48%
💓 심박수: 145 BPM

"잘하고 있어요! 조금 더 힘내세요!"
```

### 4. 완료 후 안내
```
🎉 측정 완료!

📊 당신의 종합 체력 등급: 우수 (85%)
🏆 가장 뛰어난 영역: 순발력
🎯 개선이 필요한 영역: 지구력

📱 QR 코드를 스캔하여 상세 리포트를 확인하세요!
```

## 🔧 기술적 구현 방향

### 1. BLE 연결 개선
- Web Bluetooth API 사용
- 실시간 데이터 스트리밍
- 연결 끊김 시 자동 재연결

### 2. 데이터 품질 관리
- 이상값 필터링 (파워 < 0, > 1000W)
- 연결 끊김 구간 보정
- 노이즈 제거 알고리즘

### 3. 성능 최적화
- 실시간 차트 렌더링
- 메모리 효율적 데이터 저장
- 백그라운드 분석 처리

### 4. 사용자 경험
- 직관적인 UI/UX
- 실시간 격려 메시지
- 측정 진행률 표시

## 📈 예상 효과
- **정확도 향상**: 실제 데이터 기반 분석
- **신뢰성 증대**: 과학적 측정 방법론
- **사용자 몰입**: 실시간 피드백 시스템
- **전문성 확보**: 의료급 정밀도 달성
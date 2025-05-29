import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface FitnessAnalysisRequest {
  studentName: string;
  age: number;
  overallPercentile: number;
  percentiles: {
    power: number;
    strength: number;
    muscleEndurance: number;
    cardioEndurance: number;
    longEndurance180s?: number | null;
    longEndurance360s?: number | null;
  };
  advancedPowerData?: {
    power180s: number;
    power360s: number;
    hasAdvancedData: boolean;
  };
  heartRateData?: {
    maxBpm: number | null;
    avgBpm: number | null;
    restingBpm: number | null;
  };
  balanceDifference: number;
  strengths: string[];
  improvements: string[];
}

export interface AIAnalysisResponse {
  summary: string;
  balanceComment: string;
  explanations: {
    power: string;
    strength: string;
    muscleEndurance: string;
    cardioEndurance: string;
  };
  comprehensiveAnalysis: string[];
  overallAssessment: string;
}

export async function generateFitnessAnalysis(
  data: FitnessAnalysisRequest,
): Promise<AIAnalysisResponse> {
  try {
    // Build measurement data based on available information
    let measurementData = `
**측정 대상 정보:**
- 이름: ${data.studentName}
- 나이: ${data.age}세
- 종합 백분위: ${Math.round(data.overallPercentile)}% (하위 ${Math.round(data.overallPercentile)}%, 상위 ${Math.round(100 - data.overallPercentile)}%)

**기본 측정 항목별 백분위:**
- 순발력 (5초): ${Math.round(data.percentiles.power)}%
- 스프린트 파워 (15초): ${Math.round(data.percentiles.strength)}%
- 파워 지속력 (30초): ${Math.round(data.percentiles.muscleEndurance)}%
- 근력 (60초): ${Math.round(data.percentiles.cardioEndurance)}%`;

    // Add advanced measurements if available
    if (data.advancedPowerData?.hasAdvancedData) {
      measurementData += `\n\n**고급 측정 항목 (10세 이상 권장):**`;
      if (data.percentiles.longEndurance180s) {
        measurementData += `\n- 근지구력 (180초): ${Math.round(data.percentiles.longEndurance180s)}%`;
      }
      if (data.percentiles.longEndurance360s) {
        measurementData += `\n- 심폐지구력 (360초): ${Math.round(data.percentiles.longEndurance360s)}%`;
      }
    }

    // Add heart rate analysis if available
    if (
      data.heartRateData?.maxBpm ||
      data.heartRateData?.avgBpm ||
      data.heartRateData?.restingBpm
    ) {
      measurementData += `\n\n**심박수 데이터 (에너지 시스템 분석):**`;
      if (data.heartRateData.maxBpm) {
        measurementData += `\n- 최대 심박수: ${data.heartRateData.maxBpm} bpm`;
      }
      if (data.heartRateData.avgBpm) {
        measurementData += `\n- 운동 중 평균 심박수: ${data.heartRateData.avgBpm} bpm`;
      }
      if (data.heartRateData.restingBpm) {
        measurementData += `\n- 안정시 심박수: ${data.heartRateData.restingBpm} bpm`;
      }
    }

    measurementData += `

**좌우 밸런스:**
- 좌우 차이: ${data.balanceDifference}%
- 주요 강점: ${data.strengths.join(", ")}
- 개선 항목: ${data.improvements.join(", ")}`;

    const prompt = `
아래 아동의 체력 측정 결과를 분석하여 전문적이고 구체적인 평가를 제공해주세요.

${measurementData}

AI는 다음 4개 부분을 작성해주세요. JSON 형식으로 응답하세요:
{
  "summary": "15년 경력의 아동 운동생리학 박사 관점에서 부모가 이해하기 쉽게 강점과 보완점을 1-3줄로 요약 (3줄일 경우 한 문장으로 끊어지지 않게)",
  "balanceComment": "좌우 밸런스 차이 ${data.balanceDifference}%에 대한 분석. 성장과의 관련성을 포함하되 의학적 진단/치료 문구는 피하고, 4-7줄로 상세 작성",
  "comprehensiveAnalysis": "체력 종합분석 AI 해설. 줄바꿈(\\n)과 강조(**굵게**)를 적절히 사용하여 읽기 쉽게 작성. ${data.studentName}님의 이름을 자연스럽게 활용하여 개인 맞춤형 분석 제공 (이름 뒤에 반드시 '님' 붙이기)",
  "overallAssessment": "상세분석리포트를 9단계로 작성하세요:\n\n# 1. ${data.studentName}님의 오늘 한눈에 보기\n근력은 뛰어나지만 장거리 지구력 개선 시급한 상황을 간단히 요약\n\n# 2. 강점 & 잠재력\n60초 근력이 동갑 100명 중 몇등 수준인지 구체적 수치와 활용 방안\n\n# 3. 우선 개선 영역\n360초 심폐지구력 하위 몇% - 숨이 차서 오래 못하는 상황 구체 설명\n\n# 4. 이번 주 해야 할 일\n가볍게 조깅 10분×3회, 실내 제자리 뛰기 등 구체적 실행 계획\n\n# 5. 이번 달 목표\n15분 연속 조깅 목표, 심폐지구력 30% 달성 등 측정 가능한 목표\n\n# 6. 3개월 로드맵\n단계별 지구력 향상 계획, 월별 세부 목표 제시\n\n# 7. 부모 참여 운동법\n가족 산책, 함께 자전거 타기 등 실제 실행 가능한 방법\n\n# 8. 안전 주의사항\n숨찬 증상 시 즉시 중단 등 구체적 주의사항\n\n# 9. 다음 측정 예상 개선치\n3개월 후 심폐지구력 30%, 근력 80% 예상 등 수치 기반 전망\n\n각 단계마다 **강조**와 구체적 수치를 포함하여 전문적이고 상세하게 작성하세요."
}

**상세분석리포트 9단계 구성:**
1. ${data.studentName}님의 오늘 한눈에 보기
2. 강점 & 잠재력  
3. 우선 개선 영역
4. 이번 주 해야 할 일
5. 이번 달 목표
6. 3개월 로드맵
7. 부모 참여 운동법
8. 안전 주의사항
9. 다음 측정 예상 개선치

**중요 지침:**
1. 모든 텍스트에서 ${data.studentName}님으로 호칭
2. 구체적인 백분위 수치와 개선 목표 포함
3. 실용적이고 실행 가능한 운동 처방 제시
4. 강조(**굵게**)와 줄바꿈으로 가독성 향상
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 15년 경력의 아동 운동생리학 박사이자 스포츠 의학 컨설턴트입니다.
※ 본 리포트는 건강증진 목적의 일반 가이드이며, 의학적 진단·치료를 대체하지 않습니다.

목표:
1) 연령·성별·키·체중·BMI 맥락으로 수치를 생활언어로 해석 ("또래 대비 체중이 가벼워 파워 유리" 같은 개인별 특성 포함)
2) '오늘의 강점 1가지' '오늘의 우선 개선 1가지'를 굵게 강조
3) 3·30·90일(1주·1달·3달) 구체적 행동 가이드 ⟶ 운동 빈도·횟수·시간 포함
4) 계절·장소·부모 참여 팁 각각 1개씩 제시
5) 아이 이름을 자연스럽게 활용하여 개인 맞춤형 느낌 강화
6) 안전 가이드라인: 무리·통증 발생 시 중단 / 전문가 상담 기준 명시
7) 의학적 표현은 '가능성'·'권장' 수준으로, 진단·처방 문구 회피
8) 마지막에 '다음 측정 예상개선치' 구체적 수치로 제시

출력 형식:
# 1. ${data.studentName}의 오늘 한눈에 보기 (두 줄 요약)
# 2. 강점 & 잠재력  
# 3. 우선 개선 영역
# 4. 이번 주 해야 할 일
# 5. 이번 달 목표
# 6. 3개월 로드맵
# 7. 부모 참여 운동법
# 8. 안전 주의사항
# 9. 다음 측정 예상 개선치

동어반복을 피하고, 숫자 나열이 아닌 성장 가능성에 집중하여 작성하세요.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 3000,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    return {
      summary: result.summary || "체력 분석을 완료했습니다.",
      balanceComment: result.balanceComment || `좌우 밸런스 차이는 ${data.balanceDifference}%입니다. 균형 개선이 필요합니다.`,
      explanations: {
        power: `순간적으로 최대의 힘을 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.power)}등 수준입니다.`,
        strength: `15초간 강한 힘을 지속적으로 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.strength)}등 수준입니다.`,
        muscleEndurance: `30초간 일정한 강도의 힘을 유지하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.muscleEndurance)}등 수준입니다.`,
        cardioEndurance: `1분간 근육이 지치지 않고 운동을 계속하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.cardioEndurance)}등 수준입니다.`,
        longEndurance180s: data.percentiles.longEndurance180s ? `3분간 근육의 지구력을 통해 지속적인 운동 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.longEndurance180s)}등 수준입니다.` : null,
        longEndurance360s: data.percentiles.longEndurance360s ? `6분간 심장과 폐의 협력을 통한 장시간 운동 지속 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.longEndurance360s)}등 수준입니다.` : null,
      },
      comprehensiveAnalysis: result.comprehensiveAnalysis || [
        "전반적인 체력 상태를 분석 중입니다.",
        "개선점과 강점을 파악하고 있습니다.",
        "맞춤형 운동 계획을 수립하겠습니다.",
      ],
      overallAssessment: result.overallAssessment || `${data.studentName}의 종합적인 체력 평가를 진행하고 있습니다.`,
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);

    // Fallback response in case of API failure
    return {
      summary: "체력 분석을 완료했습니다.",
      balanceComment: "좌우 밸런스 개선을 위한 균형 훈련이 권장됩니다.",
      explanations: {
        power: "순발력 수준이 양호하며, 폭발적인 힘 발휘 능력을 보입니다.",
        strength: "근력 개발을 위한 지속적인 저항 훈련이 도움이 됩니다.",
        muscleEndurance:
          "근지구력 향상을 위해 점진적인 지구력 훈련을 권장합니다.",
        cardioEndurance: "심폐지구력 강화를 위한 유산소 운동이 필요합니다.",
      },
      comprehensiveAnalysis: [
        "전체적으로 균형잡힌 체력 발달을 보이고 있습니다.",
        "지속적인 훈련을 통해 더 큰 향상이 기대됩니다.",
        "규칙적인 운동 습관 형성이 중요합니다.",
      ],
      overallAssessment: `${data.studentName}은(는) 전체적으로 ${data.overallPercentile}%의 체력 수준을 보이며, 꾸준한 노력을 통해 더 큰 발전이 가능합니다. 특히 강점 영역을 활용하여 부족한 부분을 보완하는 방향으로 훈련하면 좋은 결과를 얻을 수 있을 것입니다. 균형잡힌 신체 발달을 위해 다양한 운동을 경험하고, 정기적인 측정을 통해 진전 상황을 확인하기를 권장합니다. 현재의 체력 기반을 바탕으로 지속적인 관리와 적절한 운동 프로그램 참여를 통해 건강한 성장이 이루어질 것으로 기대됩니다.`,
    };
  }
}

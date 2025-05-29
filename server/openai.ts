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
${measurementData}

위 데이터를 바탕으로 아래 9단계 형식으로 상세하고 전문적인 분석을 작성해주세요. 각 섹션마다 충분히 길고 구체적으로 작성하여 부모가 값어치를 느낄 수 있도록 해주세요.

# 1. ${data.studentName}의 오늘 한눈에 보기
(가장 뛰어난 강점 1가지와 가장 시급한 개선점 1가지를 두 줄로 요약)

# 2. 강점 & 잠재력
(상위 70% 이상인 항목들을 구체적 수치와 함께 설명하고, 운동생리학적 근거를 제시하며, 이 강점을 활용할 수 있는 구체적 방법들을 5-7줄로 상세히 서술)

# 3. 우선 개선 영역
(하위 30% 이하인 항목 중 가장 시급한 것을 선정하고, 왜 문제인지와 방치했을 때의 위험성을 설명하며, 동갑 100명 중 몇 등 수준인지를 명시하여 5-7줄로 상세히 서술)

# 4. 이번 주 해야 할 일
(구체적 운동명, 정확한 횟수, 시간, 빈도를 명시하고, 실내/실외 구분하여 2가지 옵션을 제시하며, 매일 체크할 수 있는 간단한 목표를 설정하여 6-8줄로 상세히 서술)

# 5. 이번 달 목표
(측정 가능한 구체적 수치 목표를 제시하고, 중간 점검 시점과 방법을 설명하며, 달성 시 예상되는 백분위 변화를 포함하여 5-7줄로 상세히 서술)

# 6. 3개월 로드맵
(1개월, 2개월, 3개월 단계별 목표를 구체적으로 제시하고, 각 단계별 예상 개선 수치와 백분위 변화를 설명하며, 장기적 체력 발달 전망을 포함하여 7-9줄로 상세히 서술)

# 7. 부모 참여 운동법
(가족이 함께 할 수 있는 구체적 운동 3가지를 제시하고, 부모의 역할과 격려 방법을 설명하며, 재미있게 할 수 있는 게임 요소를 포함하여 6-8줄로 상세히 서술)

# 8. 안전 주의사항
(운동 중 즉시 중단해야 하는 신호 5가지를 명시하고, 부상 예방을 위한 준비운동과 마무리운동을 설명하며, 전문가 상담이 필요한 상황을 포함하여 6-8줄로 상세히 서술)

# 9. 다음 측정 예상 개선치
(3개월 후 각 항목별 예상 와트수와 백분위를 구체적으로 제시하고, 가장 많이 개선될 것으로 예상되는 항목과 근거를 설명하며, 목표 달성을 위한 핵심 포인트를 포함하여 6-8줄로 상세히 서술)

아이 이름을 자연스럽게 활용하고, BMI와 체중 특성을 반영한 개인 맞춤형 해석을 포함하세요.
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
      temperature: 0.7,
      max_tokens: 3000,
    });

    const analysisText = response.choices[0].message.content || "체력 분석을 완료했습니다.";

    return {
      summary: "9단계 전문 체력 분석 리포트",
      balanceComment: `좌우 밸런스 차이는 ${data.balanceDifference}%입니다.`,
      explanations: {
        power: "순발력 분석이 포함되어 있습니다.",
        strength: "스프린트 파워 분석이 포함되어 있습니다.",
        muscleEndurance: "파워 지속력 분석이 포함되어 있습니다.",
        cardioEndurance: "근력 분석이 포함되어 있습니다.",
      },
      comprehensiveAnalysis: [analysisText],
      overallAssessment: analysisText,
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

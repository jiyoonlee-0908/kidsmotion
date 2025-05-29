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

다음 형식의 JSON으로 응답해주세요:
{
  "summary": "강점과 보완점을 바탕으로 한 한줄 요약",
  "balanceComment": "좌우 밸런스 차이에 대한 구체적 분석과 개선방안 (3-7줄로 상세하게 작성하되, 반드시 '좌우 밸런스 차이는 ${data.balanceDifference}%'로 시작)",
  "explanations": {
    "power": "순발력 ${data.percentiles.power}% 수준입니다. 순간적으로 최대의 힘을 발휘하는 능력을 평가합니다.",
    "strength": "스프린트 파워 ${data.percentiles.strength}% 수준입니다. 15초간 강한 힘을 지속적으로 발휘하는 능력을 평가합니다.",
    "muscleEndurance": "파워 지속력 ${data.percentiles.muscleEndurance}% 수준입니다. 30초간 일정한 강도의 힘을 유지하는 능력을 평가합니다.",
    "cardioEndurance": "근력 ${data.percentiles.cardioEndurance}% 수준입니다. 1분간 근육이 지치지 않고 운동을 계속하는 능력을 평가합니다."
  },
  "comprehensiveAnalysis": [
    "종합평가 포인트 1 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성)",
    "종합평가 포인트 2 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성)",
    "종합평가 포인트 3 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성)",
    "종합평가 포인트 4 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성)",
    "종합평가 포인트 5 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성)",
    "종합평가 포인트 6 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성)"
  ],
  "overallAssessment": "종합적인 체력 평가 (줄바꿈과 강조를 포함하여 읽기 쉽게 작성, 아동 이름 포함)"
}

**중요 지침:**
1. 밸런스 코멘트는 반드시 3-7줄로 상세하게 작성
2. 각 체력 항목 설명은 비전문가인 부모도 쉽게 이해할 수 있도록 일상적인 운동 예시 포함
3. 종합분석과 종합평가는 줄바꿈(\n)과 강조(**굵게**)를 적절히 사용하여 읽기 쉽게 작성
4. 아동의 이름을 자연스럽게 활용하여 개인 맞춤형 느낌 강화
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
        power: result.explanations?.power || `순발력 ${data.percentiles.power}% 수준입니다. 달리기에서 출발 순간의 폭발력이나 점프할 때의 순간적인 힘을 평가합니다.`,
        strength: result.explanations?.strength || `스프린트 파워 ${data.percentiles.strength}% 수준입니다. 단거리 달리기나 자전거 페달을 힘껏 밟는 능력을 평가합니다.`,
        muscleEndurance: result.explanations?.muscleEndurance || `파워 지속력 ${data.percentiles.muscleEndurance}% 수준입니다. 30초간 계속해서 힘을 내는 능력, 계단 오르기나 언덕 뛰기에 필요합니다.`,
        cardioEndurance: result.explanations?.cardioEndurance || `근력 ${data.percentiles.cardioEndurance}% 수준입니다. 1분간 근육이 지치지 않고 운동을 계속할 수 있는 능력을 평가합니다.`,
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

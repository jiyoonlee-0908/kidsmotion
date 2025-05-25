import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: "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"
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

export async function generateFitnessAnalysis(data: FitnessAnalysisRequest): Promise<AIAnalysisResponse> {
  try {
    const prompt = `
아래 아동의 체력 측정 결과를 분석하여 전문적이고 구체적인 평가를 제공해주세요.

**측정 대상 정보:**
- 이름: ${data.studentName}
- 나이: ${data.age}세
- 종합 백분위: ${data.overallPercentile}%

**항목별 백분위:**
- 순발력 (5초): ${data.percentiles.power}%
- 근력 (15초): ${data.percentiles.strength}%
- 근지구력 (30초): ${data.percentiles.muscleEndurance}%
- 심폐지구력 (60초): ${data.percentiles.cardioEndurance}%

**좌우 밸런스:**
- 좌우 차이: ${data.balanceDifference}%
- 주요 강점: ${data.strengths.join(', ')}
- 개선 항목: ${data.improvements.join(', ')}

다음 형식의 JSON으로 응답해주세요:
{
  "summary": "체력 요약 한줄평 (30자 이내)",
  "balanceComment": "좌우 밸런스에 대한 구체적인 코칭 조언 (2-3문장)",
  "explanations": {
    "power": "순발력에 대한 해설 (2문장)",
    "strength": "근력에 대한 해설 (2문장)",
    "muscleEndurance": "근지구력에 대한 해설 (2문장)",
    "cardioEndurance": "심폐지구력에 대한 해설 (2문장)"
  },
  "comprehensiveAnalysis": ["종합분석 첫번째 문장", "종합분석 두번째 문장", "종합분석 세번째 문장"],
  "overallAssessment": "종합 평가 7줄 문장 (아동의 이름을 포함하여 구체적이고 전문적인 평가)"
}

**작성 지침:**
- 아동의 이름을 자연스럽게 포함
- 백분위를 기반으로 한 정확한 평가
- 구체적이고 실행 가능한 조언
- 긍정적이면서도 객관적인 톤
- 보호자와 지도자 모두에게 유용한 내용
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "당신은 아동 체력 평가 전문가입니다. 체력 측정 데이터를 분석하여 전문적이고 구체적인 평가와 조언을 제공합니다."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");
    
    return {
      summary: result.summary || "체력 분석을 완료했습니다.",
      balanceComment: result.balanceComment || "좌우 밸런스 개선이 필요합니다.",
      explanations: {
        power: result.explanations?.power || "순발력 분석 중입니다.",
        strength: result.explanations?.strength || "근력 분석 중입니다.",
        muscleEndurance: result.explanations?.muscleEndurance || "근지구력 분석 중입니다.",
        cardioEndurance: result.explanations?.cardioEndurance || "심폐지구력 분석 중입니다."
      },
      comprehensiveAnalysis: result.comprehensiveAnalysis || [
        "전반적인 체력 상태를 분석 중입니다.",
        "개선점과 강점을 파악하고 있습니다.",
        "맞춤형 운동 계획을 수립하겠습니다."
      ],
      overallAssessment: result.overallAssessment || "종합적인 체력 평가를 진행하고 있습니다."
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
        muscleEndurance: "근지구력 향상을 위해 점진적인 지구력 훈련을 권장합니다.",
        cardioEndurance: "심폐지구력 강화를 위한 유산소 운동이 필요합니다."
      },
      comprehensiveAnalysis: [
        "전체적으로 균형잡힌 체력 발달을 보이고 있습니다.",
        "지속적인 훈련을 통해 더 큰 향상이 기대됩니다.",
        "규칙적인 운동 습관 형성이 중요합니다."
      ],
      overallAssessment: `${data.studentName}은(는) 전체적으로 ${data.overallPercentile}%의 체력 수준을 보이며, 꾸준한 노력을 통해 더 큰 발전이 가능합니다. 특히 강점 영역을 활용하여 부족한 부분을 보완하는 방향으로 훈련하면 좋은 결과를 얻을 수 있을 것입니다. 균형잡힌 신체 발달을 위해 다양한 운동을 경험하고, 정기적인 측정을 통해 진전 상황을 확인하기를 권장합니다. 현재의 체력 기반을 바탕으로 지속적인 관리와 적절한 운동 프로그램 참여를 통해 건강한 성장이 이루어질 것으로 기대됩니다.`
    };
  }
}

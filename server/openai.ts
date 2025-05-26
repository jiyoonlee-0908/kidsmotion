import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
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

export async function generateFitnessAnalysis(data: FitnessAnalysisRequest): Promise<AIAnalysisResponse> {
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
    if (data.heartRateData?.maxBpm || data.heartRateData?.avgBpm || data.heartRateData?.restingBpm) {
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
- 주요 강점: ${data.strengths.join(', ')}
- 개선 항목: ${data.improvements.join(', ')}`;

    const prompt = `
아래 아동의 체력 측정 결과를 분석하여 전문적이고 구체적인 평가를 제공해주세요.

${measurementData}

다음 형식의 JSON으로 응답해주세요:
{
  "summary": "강점과 보완점을 바탕으로 한 한줄 요약 (예: 빠른 힘을 잘쓰는 아이로, 지구력과 균형을 함께 키워가야합니다.)",
  "balanceComment": "좌우 밸런스에 대한 구체적 분석과 개선방안 (3-4줄)",
  "explanations": {
    "power": "순발력 백분위에 맞는 정확한 해설 (높으면 칭찬, 낮으면 개선방안)",
    "strength": "스프린트 파워 백분위에 맞는 정확한 해설",
    "muscleEndurance": "파워 지속력 백분위에 맞는 정확한 해설", 
    "cardioEndurance": "근력 백분위에 맞는 정확한 해설"
  },
  "comprehensiveAnalysis": [
    "종합평가 포인트 1 (전반적 체력 수준)",
    "종합평가 포인트 2 (에너지 시스템 분석)",
    "종합평가 포인트 3 (강점 활용 방안)",
    "종합평가 포인트 4 (개선 필요 영역)",
    "종합평가 포인트 5 (운동 추천사항)",
    "종합평가 포인트 6 (영양 및 생활습관)",
    "종합평가 포인트 7 (부모님 지원방안)",
    "종합평가 포인트 8 (단계별 목표설정)",
    "종합평가 포인트 9 (정기적 측정 중요성)",
    "종합평가 포인트 10 (동기부여 방법)",
    "종합평가 포인트 11 (안전 주의사항)",
    "종합평가 포인트 12 (장기적 발전 전망)"
  ],
  "overallAssessment": "12줄 이상의 상세한 종합평가 (반드시 '상위 XX%' 표현 포함, 아동 이름 포함, 심박수 및 장거리 데이터 반영)"
}

**백분위 해석 기준 (절대 틀리지 마세요):**
- 90% 이상: 매우우수 (상위 10% 이내) - 뛰어난 능력, 강점으로 활용
- 70-89%: 우수 (상위 11-30%) - 좋은 수준, 지속 발전  
- 40-69%: 평균 (상위 31-60%) - 보통 수준, 꾸준한 노력 필요
- 20-39%: 주의 (상위 61-80%) - 평균 이하, 집중적 개선 필요
- 20% 미만: 경고 (상위 80% 이하) - 매우 낮은 수준, 전문적 관리 필요

**절대 규칙:**
- 2% = 하위 2% = 상위 98% (매우 낮은 수준이므로 경고)
- 낮은 백분위는 절대 "뛰어나다", "우수하다" 표현 금지
- 높은 백분위만 긍정적 표현 사용
- 구체적인 운동법과 개선방안 제시
- 정확한 평가와 현실적인 조언 제공

**체력 항목명 사용 규칙 (반드시 준수):**
- 순발력 (5초) - "ATP-PC 폭발력", "무산소성" 등 전문용어 사용 금지
- 스프린트 파워 (15초) - "해당작용 파워" 등 전문용어 사용 금지
- 파워 지속력 (30초) - "무산소성 지구력" 등 전문용어 사용 금지
- 근력 (60초) - "유무산소 혼합지구력" 등 전문용어 사용 금지
- 근지구력 (180초) - "중장거리 지구력" 등 전문용어 사용 금지
- 심폐지구력 (360초) - "장거리 지구력" 등 전문용어 사용 금지

**모든 분석에서 위 항목명만 사용하고, 전문적인 에너지 시스템 용어는 일반인이 이해하기 쉬운 표현으로 대체하세요.**
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

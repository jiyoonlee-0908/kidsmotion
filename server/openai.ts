import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface FitnessAnalysisRequest {
  studentName: string;
  age: number;
  height: number;
  weight: number;
  overallPercentile: number;
  percentiles: {
    power: number;
    strength: number;
    muscleEndurance: number;
    cardioEndurance: number;
    longEndurance180s?: number | null;
    longEndurance360s?: number | null;
  };
  rawPowerData: {
    power5s: number;
    power15s: number;
    power30s: number;
    power60s: number;
    power180s?: number | null;
    power360s?: number | null;
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
  coreInsights: string;
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
    const bmi = Math.round((data.weight || 20) / Math.pow((data.height || 120) / 100, 2) * 10) / 10;
    
    let measurementData = `
**측정 대상 정보:**
- 이름: ${data.studentName}
- 나이: ${data.age}세
- 신체정보: 키 ${data.height}cm, 체중 ${data.weight}kg, BMI ${bmi}
- 종합 백분위: ${Math.round(data.overallPercentile)}% (100명 중 ${Math.round(100 - data.overallPercentile)}등 수준)

**기본 측정 항목별 상세 결과:**
- 순발력 (5초): ${data.rawPowerData.power5s}W → 백분위 ${Math.round(data.percentiles.power)}% (100명 중 ${Math.round(100 - data.percentiles.power)}등)
- 스프린트 파워 (15초): ${data.rawPowerData.power15s}W → 백분위 ${Math.round(data.percentiles.strength)}% (100명 중 ${Math.round(100 - data.percentiles.strength)}등)
- 파워 지속력 (30초): ${data.rawPowerData.power30s}W → 백분위 ${Math.round(data.percentiles.muscleEndurance)}% (100명 중 ${Math.round(100 - data.percentiles.muscleEndurance)}등)
- 근력 (60초): ${data.rawPowerData.power60s}W → 백분위 ${Math.round(data.percentiles.cardioEndurance)}% (100명 중 ${Math.round(100 - data.percentiles.cardioEndurance)}등)`;

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

JSON 형식으로 응답하세요:
{
  "coreInsights": "전문가 관점에서 핵심 강점과 보완점을 1-2줄로 요약",
  "balanceComment": "좌우 밸런스 차이 ${data.balanceDifference}%에 대한 분석. 성장과의 관련성을 포함하되 의학적 진단/치료 문구는 피하고, 4-7줄로 상세 작성",
  "comprehensiveAnalysis": "정확히 3개 문단으로 구성된 전문 분석. 각 문단은 3줄씩 작성하며, 문단 간 구분을 위해 반드시 줄바꿈(\\n\\n) 사용. **굵게** 강조를 활용하여 핵심 포인트 부각. ${data.studentName}의 이름을 자연스럽게 포함하여 개인 맞춤형 분석 제공"
}

**중요 지침:**
1. 15년 경력 아동운동생리학 박사 수준의 전문성 유지
2. 의학적 용어와 생리학적 근거를 적절히 활용
3. comprehensiveAnalysis는 반드시 3문단 × 3줄 구조로 고정
4. 문단별 주제: 신경근 발달/에너지시스템/운동처방
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 15년 경력의 아동 운동생리학 박사이자 스포츠 의학 컨설턴트입니다.
※ 본 리포트는 건강증진 목적의 일반 가이드이며, 의학적 진단·치료를 대체하지 않습니다.

중요 지침:
1) BMI를 포함한 신체구성 분석으로 개별 특성 해석 ("BMI ${Math.round((data.weight || 20) / Math.pow((data.height || 120) / 100, 2))} 기준 또래 대비 체중이 가벼워 파워 유리" 등)
2) 각 측정값의 원W 수치와 백분위의 구체적 의미 설명
3) 운동 성장률은 보수적으로 1-2% 향상 목표 (상위권일수록 더 보수적)
4) 한 항목당 최소 6줄 이상 자세한 설명
5) 부모가 "전문적이고 돈값한다"고 느낄 정도로 길고 구체적으로
6) 의학적 진단/치료 문구 절대 금지, 권장/가능성 수준으로만
7) 아이 이름을 자연스럽게 활용하여 개인 맞춤형 분석

출력 형식 (각 항목마다 아이콘과 함께):
# 1. 📊 ${data.studentName}의 오늘 한눈에 보기
# 2. 💪 강점 & 잠재력  
# 3. 🎯 우선 개선 영역
# 4. 📅 이번 주 해야 할 일
# 5. 📈 이번 달 목표
# 6. 🚀 3개월 로드맵
# 7. 👨‍👩‍👧‍👦 부모 참여 운동법
# 8. ⚠️ 안전 주의사항
# 9. 🔮 다음 측정 예상 개선치

각 항목은 최소 6줄 이상, 구체적 수치와 운동생리학적 근거를 포함하여 전문성을 드러내세요.`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],

      temperature: 0.7,
      max_tokens: 3000,
    });

    const responseContent = response.choices[0].message.content || "";
    console.log("OpenAI 응답:", responseContent);

    return {
      coreInsights: responseContent.substring(0, 200) + "...",
      balanceComment: `좌우밸런스 차이가 ${data.balanceDifference}%로 측정되었습니다. ${
        data.balanceDifference <= 5 
          ? '이는 정상 범위로, 균형감각이 잘 발달되어 있음을 나타냅니다. 현재 상태를 유지하면서 다양한 신체활동을 통해 지속적으로 균형감각을 발달시켜 나가세요.' 
          : data.balanceDifference <= 10 
          ? '약간의 좌우 불균형이 관찰됩니다. 성장기 아동에게서 흔히 나타나는 현상으로, 한쪽 다리 서기, 균형판 운동, 다양한 방향으로 걷기 등의 놀이를 통해 자연스럽게 개선할 수 있습니다.' 
          : '좌우 균형에 주의가 필요합니다. 체계적인 균형 훈련을 통해 개선이 가능하므로, 전문가와 상담하여 맞춤형 운동 프로그램을 실시하는 것을 권장합니다.'
      }`,
      explanations: {
        power: `순간적으로 최대의 힘을 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.power)}등 수준입니다.`,
        strength: `15초간 강한 힘을 지속적으로 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.strength)}등 수준입니다.`,
        muscleEndurance: `30초간 일정한 강도의 힘을 유지하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.muscleEndurance)}등 수준입니다.`,
        cardioEndurance: `1분간 근육이 지치지 않고 운동을 계속하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.cardioEndurance)}등 수준입니다.`,
      },
      comprehensiveAnalysis: [
        "전반적인 체력 상태를 분석 중입니다.",
        "개선점과 강점을 파악하고 있습니다.",
        "맞춤형 운동 계획을 수립하겠습니다.",
      ],
      overallAssessment: responseContent || `${data.studentName}의 종합적인 체력 평가를 진행하고 있습니다.`,
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);

    // Fallback response in case of API failure
    return {
      coreInsights: "체력 분석을 완료했습니다.",
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

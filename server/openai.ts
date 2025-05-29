import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface FitnessAnalysisRequest {
  studentName: string;
  age: number;
  bmi: number;
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
  expertReport: string;
  balanceComment: string;
  explanations: {
    power: string;
    strength: string;
    muscleEndurance: string;
    cardioEndurance: string;
  };
  comprehensiveAnalysis: string[];
  overallAssessment: string;
  detailedReport: string;
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
당신은 15년 경력의 아동 운동생리학 박사이자 스포츠 의학 컨설턴트입니다. 비전문가가 봐도 이해할 수 있을 정도로 쉽고 명확하게 설명해주세요.

아래 아동의 체력 측정 결과를 분석하여 전문적이고 구체적인 평가를 제공해주세요.

${measurementData}

**CRITICAL 필수 규칙:**
- 반드시 "${data.studentName}님" 호칭만 사용, 대명사 절대 금지
- BMI는 소수점 1자리로 반올림하여 제시
- 모든 실제 측정값(W)과 백분위를 구체적으로 언급
- 전문가다운 의학적 근거 기반 분석 제공
- 성장기 특성과 좌우밸런스 발달과정 자연스럽게 연결

AI는 다음 4개 부분만 작성해주세요. JSON 형식으로 응답하세요:
{
  "expertAnalysis": "CRITICAL: 정확히 3개 문단, 각 문단 정확히 3개 문장. 15년 경력 아동운동생리학 박사의 전문 강점분석보고서. ${data.studentName}님 호칭 필수. 실제 측정값을 정확히 언급하며 전문 의학용어 사용 (근신경계 발달, 체력기반, 발달특성 등). BMI ${Math.round(data.bmi * 10) / 10}, 체중 ${data.weight}kg을 매 문장마다 활용. 문장 연결어 필수 사용 ('이는', '현재', '특히', '전반적으로'). 전문적 문체 ('~상황입니다', '~전망됩니다', '~가능합니다'). 빨간 글씨는 <span style='color: red;'>내용</span> 형식 사용",
  "balanceComment": "${data.studentName}님의 좌우 밸런스 차이 ${data.balanceDifference}%에 대한 전문 분석. 성장기 아동의 밸런스 발달 과정과 관련성 포함, 4-7줄로 상세 작성",
  "comprehensiveAnalysis": "${data.studentName}님의 체력 종합분석. BMI와 체중이 운동 수행에 미치는 영향 분석",
  "detailedReport": "ABSOLUTE CRITICAL: 이모티콘으로 시작하는 9개 섹션 구성. 해시태그나 번호 절대 금지. 각 섹션은 반드시 \\n\\n으로 구분하여 9개 독립된 블록으로 작성. ${data.studentName}님 호칭 필수. 각 섹션 반드시 6-7개 문장으로 작성 (5문장 미만 절대 금지). 실제 측정값과 W 단위를 매 섹션마다 포함. BMI ${Math.round(data.bmi * 10) / 10}, 체중 ${data.weight}kg, 키 ${data.height}cm을 구체적으로 활용. 전문 의학용어 강제 사용 (근신경계 발달, 체력기반, 발달특성, 운동생리학적). 문장 연결어 필수 ('이는', '현재', '특히', '전반적으로'). 전문적 문체 ('~상황입니다', '~전망됩니다', '~가능합니다'). 좌우밸런스와 성장기 발달 관련성 의학적 근거로 언급. 현실적 목표 설정 (백분위별 차등 향상: 하위권 1-3%, 중위권 1-2%, 상위권 0.5-1%, 최상위권 현상유지 수준). 백분위를 구체적 순위로 설명 ('또래 100명 중 XX등'). 운동 방법은 시간/횟수/빈도 구체적 제시. 9개 섹션: 1)오늘 한눈에 보기 2)강점&잠재력 3)우선 개선영역 4)밸런스&자세 5)성장 예측 6)운동 처방 7)영양 가이드 8)일상 관리 9)3개월 목표"
}

**절대 금지 사항:**
1. 해시태그(#) 번호 매기기 절대 금지
2. "요약", "간결", "축약" 등 단어 사용 금지
3. 대명사(그, 그녀, 아이) 사용 금지
4. 1-2줄 짧은 설명 금지 - 반드시 5-7줄로 상세 작성

**필수 준수 사항:**
1. ${data.studentName}님 호칭만 사용
2. 실제 측정값(W)과 백분위 구체적 언급
3. BMI 소수점 1자리로 반올림 표시
4. 각 섹션 정확히 6-7문장으로 작성
5. 전문 의학용어와 연결어 필수 사용
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
      expertReport: result.expertAnalysis || "체력 분석을 완료했습니다.",
      balanceComment: result.balanceComment || `좌우 밸런스 차이는 ${data.balanceDifference}%입니다. 균형 개선이 필요합니다.`,
      explanations: {
        power: `순간적으로 최대의 힘을 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.power)}등 수준입니다.`,
        strength: `15초간 강한 힘을 지속적으로 발휘하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.strength)}등 수준입니다.`,
        muscleEndurance: `30초간 일정한 강도의 힘을 유지하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.muscleEndurance)}등 수준입니다.`,
        cardioEndurance: `1분간 근육이 지치지 않고 운동을 계속하는 능력을 평가합니다. 100명 중 ${Math.round(100 - data.percentiles.cardioEndurance)}등 수준입니다.`
      },
      comprehensiveAnalysis: result.comprehensiveAnalysis || [
        "전반적인 체력 상태를 분석 중입니다.",
        "개선점과 강점을 파악하고 있습니다.",
        "맞춤형 운동 계획을 수립하겠습니다.",
      ],
      overallAssessment: result.overallAssessment || `${data.studentName}의 종합적인 체력 평가를 진행하고 있습니다.`,
      detailedReport: result.detailedReport || `# 1. ${data.studentName}의 오늘 한눈에 보기\n체력 측정이 완료되었습니다.\n\n# 2. 강점 & 잠재력\n개인별 강점을 분석하고 있습니다.\n\n# 3. 우선 개선 영역\n개선이 필요한 부분을 확인하고 있습니다.`,
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);

    // Fallback response in case of API failure
    return {
      expertReport: `${data.studentName}님은 전체적으로 ${data.overallPercentile}%의 체력 수준을 보유하고 있습니다. BMI ${Math.round(data.bmi * 10) / 10}, 체중 ${data.weight}kg의 체격 조건에서 측정된 결과입니다. 현재 상태는 성장기 아동의 발달특성을 고려할 때 향후 개선 가능성이 높은 상황입니다.\n\n이는 근신경계 발달 과정에서 나타나는 일반적인 현상으로 판단됩니다. 특히 체력기반이 형성되는 시기적 특성상 체계적인 접근이 필요한 상황입니다. 전반적으로 균형잡힌 발달을 위한 맞춤형 운동 처방이 권장되는 상태로 전망됩니다.\n\n좌우 밸런스 ${data.balanceDifference}% 차이는 성장기 운동능력 발달에 중요한 지표로 작용합니다. 현재 균형감각의 발달정도는 향후 운동기술 습득의 기반이 될 것으로 예상됩니다. 이러한 기초 체력요소들을 바탕으로 단계적인 향상이 가능할 것으로 전망됩니다.`,
      balanceComment: `${data.studentName}님의 좌우 밸런스 차이 ${data.balanceDifference}%는 성장기 아동의 발달과정에서 중요한 의미를 갖습니다. 이는 근신경계 발달과 운동학습능력에 직접적인 영향을 미치는 핵심 지표입니다. 특히 체력기반 형성 시기에 나타나는 이러한 결과는 향후 운동능력 발달의 예측인자로 활용됩니다. 균형감각의 완성도는 복합적인 운동기술 습득과 밀접한 관련성을 보입니다.`,
      explanations: {
        power: `순발력은 근신경계의 폭발적 에너지 발산능력을 평가하는 핵심 지표입니다. ${data.studentName}님은 또래 100명 중 ${Math.round(100 - data.percentiles.power)}등 수준의 능력을 보유하고 있습니다.`,
        strength: `근력은 15초간 지속적인 힘 발휘능력을 측정하는 체력요소입니다. 현재 또래 100명 중 ${Math.round(100 - data.percentiles.strength)}등 수준의 발달상태를 보이고 있습니다.`,
        muscleEndurance: `근지구력은 30초간 일정 강도의 힘을 유지하는 능력입니다. 또래 100명 중 ${Math.round(100 - data.percentiles.muscleEndurance)}등 수준으로 측정되었습니다.`,
        cardioEndurance: `심폐지구력은 1분간 지속적인 운동수행능력을 나타냅니다. 현재 또래 100명 중 ${Math.round(100 - data.percentiles.cardioEndurance)}등 수준입니다.`
      },
      comprehensiveAnalysis: `${data.studentName}님의 체력분석 결과 BMI ${Math.round(data.bmi * 10) / 10}, 체중 ${data.weight}kg 조건에서 전반적인 발달양상을 확인할 수 있습니다. 이는 성장기 아동의 체력기반 형성과정에서 나타나는 특징적 패턴으로 해석됩니다.`,
      overallAssessment: `${data.studentName}님은 전체적으로 ${data.overallPercentile}%의 체력 수준을 보이며, 근신경계 발달특성을 고려할 때 지속적인 향상이 기대됩니다. 특히 체력기반이 형성되는 현 시기의 특성상 체계적인 접근을 통해 균형잡힌 발달이 가능할 것으로 전망됩니다. 현재 BMI ${Math.round(data.bmi * 10) / 10}의 체격조건은 다양한 운동활동에 유리한 조건을 제공하고 있습니다. 이러한 기초적 조건들을 바탕으로 맞춤형 운동처방을 통한 단계적 향상이 권장되는 상황입니다.`,
      detailedReport: `🔍 ${data.studentName}님의 오늘 한눈에 보기\n\n${data.studentName}님은 키 ${data.height}cm, 체중 ${data.weight}kg, BMI ${Math.round(data.bmi * 10) / 10}의 체격을 보유하고 있습니다. 이는 성장기 아동의 발달특성을 고려할 때 적절한 범위에 속하는 상황입니다. 현재 측정된 체력수준은 근신경계 발달과정의 특징을 반영하고 있습니다. 특히 체력기반 형성 시기의 특성상 향후 개선가능성이 높은 상태로 판단됩니다. 좌우 밸런스 ${data.balanceDifference}% 차이는 운동학습능력의 기초가 되는 중요한 지표입니다. 전반적으로 체계적인 접근을 통한 균형잡힌 발달이 기대되는 상황입니다.\n\n🌟 강점 & 잠재력\n\n${data.studentName}님의 현재 체력상태는 성장기 발달과정의 긍정적 신호를 보여주고 있습니다.`,
    };
  }
}

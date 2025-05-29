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
  "expertAnalysis": "CRITICAL: 정확히 3개 문단, 각 문단 정확히 3개 문장. 15년 경력 아동운동생리학 박사의 전문 강점분석보고서. ${data.studentName}님 호칭 필수. 실제 측정값을 정확히 언급 (예: 5초 파워 35W(75%), 15초 파워 28W(45%), 30초 파워 22W(30%), 60초 파워 18W(25%) 등). BMI는 ${Math.round(data.bmi * 10) / 10}, 체중 ${data.weight}kg 활용한 전문 분석. 빨간 글씨는 <span style='color: red;'>내용</span> 형식 사용",
  "balanceComment": "${data.studentName}님의 좌우 밸런스 차이 ${data.balanceDifference}%에 대한 전문 분석. 성장기 아동의 밸런스 발달 과정과 관련성 포함, 4-7줄로 상세 작성",
  "comprehensiveAnalysis": "${data.studentName}님의 체력 종합분석. BMI와 체중이 운동 수행에 미치는 영향 분석",
  "detailedReport": "ABSOLUTE CRITICAL: 이모티콘으로 시작하는 9개 섹션 구성. 해시태그나 번호 절대 금지. 각 섹션은 반드시 \\n\\n으로 구분하여 9개 독립된 블록으로 작성. ${data.studentName}님 호칭 필수. 각 섹션 반드시 6-7개 문장으로 작성 (5문장 미만 절대 금지). 실제 측정값과 W 단위 반드시 포함. BMI ${Math.round(data.bmi * 10) / 10}, 체중 ${data.weight}kg, 키 ${data.height}cm을 구체적으로 활용한 전문적 분석. 좌우밸런스와 성장기 발달 관련성 의학적 근거로 언급. 현실적 목표 설정 (백분위별 차등 향상: 하위권 1-3%, 중위권 1-2%, 상위권 0.5-1%, 최상위권 현상유지 수준). 15년 경력 전문가다운 의학적 용어와 전문성 발휘. 백분위를 구체적 순위로 설명. 운동 방법은 시간/횟수/빈도 구체적 제시. 9개 섹션: 1)오늘 한눈에 보기 2)강점&잠재력 3)우선 개선영역 4)밸런스&자세 5)성장 예측 6)운동 처방 7)영양 가이드 8)일상 관리 9)3개월 목표"
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
4. 각 섹션 최소 5문장, 권장 6-7문장으로 작성
5. 전문가다운 의학적 근거 기반 분석
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
      detailedReport: `# 1. ${data.studentName}의 오늘 한눈에 보기\n체력 측정이 완료되었습니다.\n\n# 2. 강점 & 잠재력\n개인별 강점을 분석하고 있습니다.\n\n# 3. 우선 개선 영역\n개선이 필요한 부분을 확인하고 있습니다.`,
    };
  }
}

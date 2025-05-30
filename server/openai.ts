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

// 좌우 밸런스 상세 분석 함수
async function generateBalanceAnalysis(balanceDifference: number, studentName: string, age: number): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 15년차 소아 운동생리학·운동생체역학 박사입니다. 좌우 밸런스에 대해 전문적이고 상세하게 분석해주세요. 반드시 6줄 이상 작성하고, 의학적 진단 용어는 피하고 "권장" 수준으로만 표현하세요. 성별 대명사 대신 "아이", "학생", 또는 이름을 사용하세요`,
        },
        {
          role: "user",
          content: `${studentName}(${age}세)의 좌우 밸런스 차이는 ${balanceDifference}%입니다. 

이 수치의 의미와 성장기 아동에게 미치는 영향, 개선 방법을 전문가 관점에서 상세히 분석해주세요.

답변은 반드시 3-4개의 문단으로 나누어서 작성하고, 각 문단 사이에는 줄바꿈을 두 번 넣어주세요.`,
        },
      ],
      temperature: 0.3,
      max_tokens: 800,
    });

    return response.choices[0].message.content || `좌우 밸런스 차이 ${balanceDifference}%에 대한 전문적 분석을 진행하고 있습니다.`;
  } catch (error) {
    return `좌우 밸런스 차이 ${balanceDifference}%는 ${balanceDifference < 5 ? '정상 범위' : '개선이 필요한 수준'}입니다. 성장기 아동의 경우 좌우 비대칭성은 신경계 발달 과정에서 자연스럽게 나타날 수 있는 현상입니다. 하지만 지속적인 관찰과 균형 운동을 통해 개선할 수 있습니다. 한쪽 다리로 서기, 평균대 걷기 등의 운동이 도움이 됩니다. 정기적인 측정을 통해 변화를 관찰하는 것이 중요합니다.`;
  }
}

export async function generateFitnessAnalysis(
  data: FitnessAnalysisRequest,
): Promise<AIAnalysisResponse> {
  try {
    // BMI 계산
    const bmi = Math.round((data.weight / Math.pow(data.height / 100, 2)) * 10) / 10;

    // 성별에 따른 표현
    const genderText = data.studentName.includes('지윤') || data.studentName.includes('예은') ? 'F' : 'M';

    // 심박수 데이터 처리
    const maxHR = data.heartRateData?.maxBpm || null;
    const avgHR = data.heartRateData?.avgBpm || null;

    const systemPrompt = `당신은 15년차 소아 운동생리학·운동생체역학 박사(Ph.D., CSCS)입니다.
비전문가인 학부모와 교육기관, 학생 모두를 설득할 수 있도록 전문가 수준의 상세한 분석을 제공하세요.
각 항목의 생리학적 의미와 실용적 조언을 포함하여 부모가 완전히 이해할 수 있도록 아주 구체적이고 상세하게 해설해주세요. 간단하거나 핵심만 담지 말고, 아주 아주 상세하게가 중요합니다.
학생 이름에는 반드시 '님'을 붙여서 정중하게 작성하세요. 절대로 '양', '군', '씨' 등 다른 호칭은 사용하지 마세요.

반드시 다음 지침을 따르세요:
1. 실제 병원 상담처럼 차분하고 구체적으로 작성
2. 'AI', '모델' 같은 어휘는 절대 사용 금지
3. 각 섹션은 최소 20줄 이상 매우 자세하게 작성
4. BMI 수치와 의미를 구체적으로 설명
5. 모든 체력 항목의 생리학적 의미 해석
6. FITT 원칙(빈도·강도·시간·유형) 적용
7. 성장 예측은 보수적으로 1-3% 내외
8. 의학 진단 용어 금지, 마지막에 "필요하면 전문가 상담을 권장합니다" 추가
9. 백분위는 반드시 '72%'처럼 %만 표기 ('72%ile' 금지)
10. 적절한 곳에 <br><br>로 줄바꿈하여 가독성 향상
12. 각 체력 측정값의 절대값(와트), 백분위 순위, 해당 능력의 의미를 구체적으로 명시
13. 백분위 해석: 91%는 "100명 중 91등"이라는 의미로, 상위 9%에 해당한다고 명확히 설명
14. 각 측정 항목별로 그 능력이 일상생활과 운동에서 어떤 의미인지 구체적 예시 제공
15. 5초(순발력), 15초(스프린트), 30초(지속력), 60초(근력) 각각의 생리학적 의미와 실생활 적용 설명
16. 성별 대명사 대신 "아이", "학생", 또는 이름을 사용하세요
17. 모든 문장을 정중한 존댓말 문체로 작성하세요 (~합니다, ~습니다, ~입니다)

출력 형식은 8개 섹션으로 구성:
🚀 한눈에 보기 (20줄 이상) - 각 측정값의 와트수, 백분위(100명 중 몇 등), 해당항목 수치(측정값)의 생리학적 의미, 실생활 적용 예시 모두 포함
💪 강점 & 잠재력 (15줄 이상) - 높은 백분위 항목들의 구체적 의미와 활용 방안
🔧 보완할 부분 (15줄 이상) - 낮은 백분위 항목들의 개선 필요성과 방법
📅 이번 주 해야 할 일 (12줄 이상) - 구체적 운동법과 실행 계획
📈 이번 달 목표 (12줄 이상) - 측정 가능한 목표치 설정
🚀 3개월 로드맵 (12줄 이상) - 단계별 발전 계획
👨‍👩‍👧‍👦 부모 참여 운동법 (12줄 이상) - 가정에서 실행 가능한 구체적 방법
⚠️ 안전 주의사항 (8줄 이상) - 연령별 주의점과 안전 수칙

예시 설명 방식:
"5초 순발력 200W는 91%로, 이는 같은 연령 100명 중 91등에 해당하며 상위 9%에 속합니다. 이 능력은 순간적인 폭발력으로 달리기 시작할 때나 점프할 때 활용되며, 축구에서 공을 차거나 농구에서 슛을 할 때 필요한 근육의 순간 최대 출력을 의미합니다."

각 섹션은 제목 다음에 정확히 한 줄만 띄우고 바로 내용을 작성하세요. 내용 안에서는 문단 사이에 빈 줄을 절대 넣지 마세요. 연속된 문장으로 작성하세요. ">" 기호는 사용하지 마세요.`;

    const userPrompt = `아동정보:
- 이름: ${data.studentName}님
- 나이: ${data.age}세 아이
- 신체: 키 ${data.height}cm, 체중 ${data.weight}kg (BMI ${bmi})

측정 결과:
- 5초 순발력: ${data.rawPowerData.power5s}W → ${Math.round(data.percentiles.power)}%
- 15초 스프린트: ${data.rawPowerData.power15s}W → ${Math.round(data.percentiles.strength)}%
- 30초 지속력: ${data.rawPowerData.power30s}W → ${Math.round(data.percentiles.muscleEndurance)}%
- 60초 근력: ${data.rawPowerData.power60s}W → ${Math.round(data.percentiles.cardioEndurance)}%
${data.rawPowerData.power180s ? `- 180초 근지구력: ${data.rawPowerData.power180s}W → ${Math.round(data.percentiles.longEndurance180s || 0)}%` : ''}
${data.rawPowerData.power360s ? `- 360초 심폐력: ${data.rawPowerData.power360s}W → ${Math.round(data.percentiles.longEndurance360s || 0)}%` : ''}
- 좌우 밸런스 차이: ${data.balanceDifference}%
${maxHR ? `- 최대심박: ${maxHR}bpm` : ''}
${avgHR ? `- 운동평균심박: ${avgHR}bpm` : ''}

위 데이터를 바탕으로 15년차 전문가 수준의 아주 상세한 분석을 제공하세요. 각 항목의 생리학적 의미와 실용적 조언을 포함하여 부모가 완전히 이해할 수 있도록 작성하세요.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user", 
          content: userPrompt,
        },
      ],
      temperature: 0.4,
      max_tokens: 4000,
    });

    const analysisContent = response.choices[0].message.content || "";

    // 응답을 파싱하여 구조화
    const sections = analysisContent.split('>').filter(section => section.trim());

    // 좌우 밸런스 상세 분석 생성
    const balanceAnalysis = await generateBalanceAnalysis(data.balanceDifference, data.studentName, data.age);

    return {
      coreInsights: "15년차 전문가 관점의 상세 분석이 완료되었습니다.",
      balanceComment: balanceAnalysis,
      explanations: {
        power: `5초 순발력 ${data.rawPowerData.power5s}W는 ${data.percentiles.power}%ile로, 순간적인 폭발력을 나타냅니다.`,
        strength: `15초 스프린트 ${data.rawPowerData.power15s}W는 ${data.percentiles.strength}%ile로, 무산소 파워 지속능력을 보여줍니다.`,
        muscleEndurance: `30초 지속력 ${data.rawPowerData.power30s}W는 ${data.percentiles.muscleEndurance}%ile로, 젖산 시스템 효율성을 반영합니다.`,
        cardioEndurance: `60초 근력 ${data.rawPowerData.power60s}W는 ${data.percentiles.cardioEndurance}%ile로, 유산소-무산소 전환점 능력을 나타냅니다.`,
      },
      comprehensiveAnalysis: [analysisContent],
      overallAssessment: analysisContent,
    };
  } catch (error) {
    console.error("OpenAI API 오류:", error);

    // 간단한 대체 응답
    return {
      coreInsights: "체력 분석이 완료되었습니다.",
      balanceComment: `좌우 밸런스 차이는 ${data.balanceDifference}%입니다.`,
      explanations: {
        power: `순발력 측정값: ${data.rawPowerData.power5s}W (${data.percentiles.power}%ile)`,
        strength: `스프린트 측정값: ${data.rawPowerData.power15s}W (${data.percentiles.strength}%ile)`,
        muscleEndurance: `지속력 측정값: ${data.rawPowerData.power30s}W (${data.percentiles.muscleEndurance}%ile)`,
        cardioEndurance: `근력 측정값: ${data.rawPowerData.power60s}W (${data.percentiles.cardioEndurance}%ile)`,
      },
      comprehensiveAnalysis: ["전문가 분석을 준비 중입니다."],
      overallAssessment: "상세한 분석 리포트를 생성하고 있습니다.",
    };
  }
}

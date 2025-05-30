import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

    // Add heart rate data if available
    if (data.heartRateData) {
      measurementData += `\n\n**심박수 데이터:**`;
      if (data.heartRateData.maxBpm) {
        measurementData += `\n- 최대 심박수: ${data.heartRateData.maxBpm} bpm`;
      }
      if (data.heartRateData.avgBpm) {
        measurementData += `\n- 평균 심박수: ${data.heartRateData.avgBpm} bpm`;
      }
      if (data.heartRateData.restingBpm) {
        measurementData += `\n- 안정시 심박수: ${data.heartRateData.restingBpm} bpm`;
      }
    }

    // Add balance information
    measurementData += `\n\n**밸런스 분석:**`;
    measurementData += `\n- 좌우 밸런스 차이: ${data.balanceDifference.toFixed(1)}%`;
    
    // Add strengths and improvements
    measurementData += `\n\n**현재 강점:** ${data.strengths.join(", ")}`;
    measurementData += `\n**개선 필요 영역:** ${data.improvements.join(", ")}`;

    const prompt = `위 측정 결과를 바탕으로 전문적인 체력 분석을 작성해주세요.

특별 요구사항:
1. BMI ${bmi} 해석과 체력에 미치는 영향 분석
2. 모든 측정 항목의 구체적 의미와 실생활 적용
3. 심박수 데이터로 심혈관 건강 평가
4. 밸런스 차이의 의미와 개선 방향
5. FITT 원칙 기반 구체적 운동 처방
6. 보수적 성장 예측 (+1-3%p)

${measurementData}`;

    console.log("OpenAI 요청 데이터:", prompt.substring(0, 500) + "...");

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
      max_tokens: 1200,
    });

    const result = JSON.parse(response.choices[0].message.content || "{}");

    console.log("OpenAI 분석 완료:", { 
      coreInsights: result.coreInsights ? "생성됨" : "실패", 
      overallAssessment: result.overallAssessment ? "생성됨" : "실패" 
    });

    return {
      coreInsights: result.coreInsights || `${data.studentName}의 체력 측정이 완료되었습니다.`,
      balanceComment: result.balanceComment || `좌우 밸런스 차이가 ${data.balanceDifference.toFixed(1)}%입니다.`,
      explanations: result.explanations || {
        power: "순발력 분석 중입니다.",
        strength: "스프린트 파워 분석 중입니다.",
        muscleEndurance: "파워 지속력 분석 중입니다.",
        cardioEndurance: "근력 분석 중입니다.",
      },
      comprehensiveAnalysis: result.comprehensiveAnalysis || ["상세 분석을 준비하고 있습니다."],
      overallAssessment: result.overallAssessment || "종합 평가를 생성하고 있습니다.",
    };

  } catch (error) {
    console.error("OpenAI 분석 생성 오류:", error);
    return {
      coreInsights: `${data.studentName}의 체력 측정이 완료되었습니다. 상세 분석을 준비하고 있습니다.`,
      balanceComment: `좌우 밸런스 차이가 ${data.balanceDifference.toFixed(1)}%로 측정되었습니다.`,
      explanations: {
        power: "순발력 데이터를 분석하고 있습니다.",
        strength: "스프린트 파워 데이터를 분석하고 있습니다.",
        muscleEndurance: "파워 지속력 데이터를 분석하고 있습니다.",
        cardioEndurance: "근력 데이터를 분석하고 있습니다.",
      },
      comprehensiveAnalysis: ["전문적인 체력 분석을 준비하고 있습니다."],
      overallAssessment: "종합적인 평가를 생성하고 있습니다.",
    };
  }
}

export async function generateComprehensiveAnalysis(
  data: FitnessAnalysisRequest,
): Promise<string> {
  try {
    const bmi = Math.round((data.weight || 20) / Math.pow((data.height || 120) / 100, 2) * 10) / 10;
    
    let measurementData = `
<아동정보>
이름: ${data.studentName}
나이: ${data.age}
성별: M
키_cm: ${data.height}
몸무게_kg: ${data.weight}

<측정값>
5초 순발력_W: ${data.rawPowerData.power5s}  백분위: ${Math.round(data.percentiles.power)}
15초 스프린트_W: ${data.rawPowerData.power15s}  백분위: ${Math.round(data.percentiles.strength)}
30초 지속력_W: ${data.rawPowerData.power30s}  백분위: ${Math.round(data.percentiles.muscleEndurance)}
60초 근력_W: ${data.rawPowerData.power60s}  백분위: ${Math.round(data.percentiles.cardioEndurance)}`;

    if (data.advancedPowerData?.hasAdvancedData) {
      if (data.percentiles.longEndurance180s) {
        measurementData += `\n180초 근지구력_W: ${data.advancedPowerData.power180s}  백분위: ${Math.round(data.percentiles.longEndurance180s)}`;
      }
      if (data.percentiles.longEndurance360s) {
        measurementData += `\n360초 심폐_W: ${data.advancedPowerData.power360s}  백분위: ${Math.round(data.percentiles.longEndurance360s)}`;
      }
    }

    measurementData += `\n밸런스_%차이: ${data.balanceDifference.toFixed(1)}`;
    if (data.heartRateData?.maxBpm) {
      measurementData += `\n최대심박: ${data.heartRateData.maxBpm}   운동평균: ${data.heartRateData.avgBpm || 'N/A'}`;
    }

    console.log("OpenAI 요청 데이터:", measurementData);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: `당신은 15년차 '소아 운동생리학·운동생체역학' 박사(Ph.D., CSCS)입니다.

문체 지침:
1) "~입니다." "~하세요." 문체로 실제 병원 상담처럼 차분하고 구체적으로 작성
2) 'AI', '모델' 같은 어휘는 사용 금지
3) 군더더기 형용사, 불필요한 반복 금지, 한 문장은 15-25 어절
4) 학술용어는 괄호 속 1줄 풀이를 붙여 부모가 바로 이해하도록

형식 지침:
1) MarkDown 인용 박스 9개 사용
2) 첫 박스 10줄 이상, 나머지 박스 6줄 이상
3) BMI 값과 해석, 모든 체력 항목, 심박을 두 번 이상 언급
4) FITT(빈도·강도·시간·유형) 표기
5) 성장 예측은 보수적으로 +1-3%p 또는 +5%p 내로
6) 의료진단, 질병명, 치료 단어 금지. 마지막 줄에 "필요하면 전문가 상담을 권장합니다." 삽입
7) MarkDown 이외 JSON, HTML, 코드블록 사용 금지

출력 형식 (아이콘+제목 9박스):
> 🚀 오늘 한눈에 보기  
> (10줄 이상)  
>
> 💪 강점 & 잠재력  
> (6줄 이상)  
>
> 🔧 우선 개선 영역
> (6줄 이상)
>
> 📅 이번 주 해야 할 일
> (6줄 이상)
>
> 📈 이번 달 목표
> (6줄 이상)
>
> 🚀 3개월 로드맵
> (6줄 이상)
>
> 👨‍👩‍👧‍👦 부모 참여 운동법
> (6줄 이상)
>
> ⚠️ 안전 주의사항
> (6줄 이상)
>
> 🔮 다음 측정 보수적 예상
> (6줄 이상, 마지막 줄에 "필요하면 전문가 상담을 권장합니다." 포함)

BMI, 모든 측정값의 구체적 의미, 심박수 해석을 포함하여 전문적이고 길게 작성하세요.`,
        },
        {
          role: "user",
          content: measurementData,
        },
      ],
      temperature: 0.4,
      max_tokens: 1500,
    });

    const content = response.choices[0]?.message?.content || "";
    
    console.log("OpenAI 종합 분석 응답:", content.substring(0, 200) + "...");
    
    return content;

  } catch (error) {
    console.error("OpenAI 종합 분석 생성 오류:", error);
    return `
> 🚀 오늘 한눈에 보기
> 
> 측정이 완료되었습니다. 전문적인 분석을 위해 잠시만 기다려 주세요.
> 현재 시스템에서 상세 분석을 준비하고 있습니다.
> 
> 💪 강점 & 잠재력
> 
> 측정 결과를 바탕으로 개별적인 강점을 분석하고 있습니다.
> 
> 🔧 우선 개선 영역
> 
> 체력 향상을 위한 개선 포인트를 정리하고 있습니다.
> 
> 📅 이번 주 해야 할 일
> 
> 맞춤형 운동 계획을 수립하고 있습니다.
> 
> 📈 이번 달 목표
> 
> 단기 목표를 설정하고 있습니다.
> 
> 🚀 3개월 로드맵
> 
> 중장기 발전 계획을 준비하고 있습니다.
> 
> 👨‍👩‍👧‍👦 부모 참여 운동법
> 
> 가정에서 실천할 수 있는 운동법을 정리하고 있습니다.
> 
> ⚠️ 안전 주의사항
> 
> 안전한 운동을 위한 지침을 마련하고 있습니다.
> 
> 🔮 다음 측정 보수적 예상
> 
> 성장 예측과 재측정 일정을 조정하고 있습니다. 필요하면 전문가 상담을 권장합니다.
    `;
  }
}
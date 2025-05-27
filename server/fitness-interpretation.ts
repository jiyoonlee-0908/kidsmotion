// 체력 분석 해석 및 처방 시스템
export interface PowerInterpretation {
  value: number;
  unit: string;
  percentile: number;
  grade: string;
  interpretation: string;
  recommendation: string;
}

export interface GradeRecommendation {
  grade: string;
  generalAdvice: string;
  exerciseProgram: string[];
  frequency: string;
  intensity: string;
  progressionPlan: string;
}

// 상대파워 해석 시스템
export function interpretRelativePower(
  relativePower: number, 
  percentile: number, 
  category: string,
  age: number
): PowerInterpretation {
  const grade = getGradeFromPercentile(percentile);
  
  let interpretation = "";
  let recommendation = "";
  
  switch (grade) {
    case "매우우수":
      interpretation = `${relativePower.toFixed(1)} W/kg^0.67은 또래 아동 중 상위 4% 이내의 뛰어난 수준입니다.`;
      recommendation = "현재 수준을 유지하면서 다른 체력 요소 균형 발달에 집중하세요.";
      break;
    case "우수":
      interpretation = `${relativePower.toFixed(1)} W/kg^0.67은 또래 아동 중 상위 5-20%의 좋은 수준입니다.`;
      recommendation = "꾸준한 훈련을 통해 매우우수 단계로의 발전이 기대됩니다.";
      break;
    case "보통":
      interpretation = `${relativePower.toFixed(1)} W/kg^0.67은 또래 아동의 평균적인 수준입니다.`;
      recommendation = "체계적인 훈련을 통해 충분히 개선 가능한 수준입니다.";
      break;
    case "낮음":
      interpretation = `${relativePower.toFixed(1)} W/kg^0.67은 또래 아동 중 하위 20% 수준으로 개선이 필요합니다.`;
      recommendation = "전문적인 운동 프로그램 참여를 통한 집중적 개선이 필요합니다.";
      break;
    case "매우낮음":
      interpretation = `${relativePower.toFixed(1)} W/kg^0.67은 또래 아동 중 하위 4% 수준으로 즉각적인 관리가 필요합니다.`;
      recommendation = "전문가 상담을 통한 개별 맞춤 프로그램이 반드시 필요합니다.";
      break;
  }
  
  return {
    value: relativePower,
    unit: "W/kg^0.67",
    percentile,
    grade,
    interpretation,
    recommendation
  };
}

// 등급별 상세 처방 시스템
export function getGradeRecommendation(grade: string, category: string, age: number): GradeRecommendation {
  const baseRecommendations: Record<string, GradeRecommendation> = {
    "매우우수": {
      grade: "매우우수",
      generalAdvice: "뛰어난 능력을 유지하면서 다른 체력 요소의 균형 발달에 집중하세요.",
      exerciseProgram: [
        "현재 강점 유지를 위한 주 2-3회 고강도 훈련",
        "약점 보완을 위한 다양한 체력 요소 훈련",
        "스포츠 종목 체험을 통한 전인적 발달",
        "정기적인 측정을 통한 지속적 모니터링"
      ],
      frequency: "주 4-5회",
      intensity: "중-고강도",
      progressionPlan: "강점 유지 + 약점 보완 중심의 균형 발달"
    },
    "우수": {
      grade: "우수",
      generalAdvice: "좋은 수준을 바탕으로 매우우수 단계로의 발전을 목표로 하세요.",
      exerciseProgram: [
        "점진적 강도 증가를 통한 능력 향상",
        "해당 체력 요소 특화 훈련 프로그램",
        "기술적 완성도 향상을 위한 세부 훈련",
        "경쟁 상황을 통한 동기 부여"
      ],
      frequency: "주 4회",
      intensity: "중강도",
      progressionPlan: "단계적 강도 증가를 통한 상위 단계 도약"
    },
    "보통": {
      grade: "보통",
      generalAdvice: "체계적인 훈련을 통해 충분히 개선할 수 있는 수준입니다.",
      exerciseProgram: [
        "기초 체력 향상을 위한 전반적 훈련",
        "재미있는 놀이 형태의 운동 참여",
        "규칙적인 신체활동 습관 형성",
        "점진적 운동량 증가"
      ],
      frequency: "주 3-4회",
      intensity: "중강도",
      progressionPlan: "기초 체력 향상 후 특화 훈련 단계적 진행"
    },
    "낮음": {
      grade: "낮음",
      generalAdvice: "집중적인 관리와 체계적인 훈련이 필요한 수준입니다.",
      exerciseProgram: [
        "기초 근력 및 체력 향상 프로그램",
        "저강도 장시간 훈련으로 시작",
        "전문 지도자의 개별 맞춤 지도",
        "단계별 목표 설정을 통한 동기 부여"
      ],
      frequency: "주 3회",
      intensity: "저-중강도",
      progressionPlan: "기초 체력 확보 → 점진적 강도 증가 → 평균 수준 도달"
    },
    "매우낮음": {
      grade: "매우낮음",
      generalAdvice: "전문가 상담을 통한 개별 맞춤 프로그램이 반드시 필요합니다.",
      exerciseProgram: [
        "의료진 상담을 통한 안전성 확인",
        "초저강도 재활 운동부터 시작",
        "1대1 전문 지도를 통한 세심한 관리",
        "영양 상담 및 생활 습관 개선 병행"
      ],
      frequency: "주 2-3회",
      intensity: "초저강도",
      progressionPlan: "안전성 확보 → 기초 체력 회복 → 정상 범위 도달"
    }
  };
  
  return baseRecommendations[grade] || baseRecommendations["보통"];
}

// 심박수 해석 시스템
export interface HeartRateInterpretation {
  maxBpm: number | null;
  avgBpm: number | null;
  restingBpm: number | null;
  interpretation: string;
  recommendation: string;
  fitnessLevel: string;
}

export function interpretHeartRate(
  maxBpm: number | null, 
  avgBpm: number | null, 
  restingBpm: number | null, 
  age: number
): HeartRateInterpretation {
  // 연령별 기준 심박수 (소아 기준)
  const expectedMaxBpm = 220 - age;
  const expectedRestingBpm = age <= 10 ? 80 : 70; // 소아는 성인보다 높음
  
  let interpretation = "";
  let recommendation = "";
  let fitnessLevel = "";
  
  // 안정시 심박수 분석
  if (restingBpm) {
    if (restingBpm < expectedRestingBpm - 10) {
      fitnessLevel = "우수";
      interpretation += `안정시 심박수 ${restingBpm}bpm은 매우 좋은 수준입니다. `;
    } else if (restingBpm > expectedRestingBpm + 15) {
      fitnessLevel = "개선필요";
      interpretation += `안정시 심박수 ${restingBpm}bpm은 다소 높은 편입니다. `;
      recommendation += "유산소 운동을 통한 심폐기능 개선이 필요합니다. ";
    } else {
      fitnessLevel = "정상";
      interpretation += `안정시 심박수 ${restingBpm}bpm은 정상 범위입니다. `;
    }
  }
  
  // 최대 심박수 분석
  if (maxBpm) {
    const maxBpmRatio = (maxBpm / expectedMaxBpm) * 100;
    if (maxBpmRatio < 85) {
      interpretation += `최대 심박수가 예상치보다 낮아 심폐능력 개선이 필요할 수 있습니다. `;
      recommendation += "점진적인 고강도 훈련을 통한 심폐능력 향상을 권장합니다. ";
    } else if (maxBpmRatio > 105) {
      interpretation += `최대 심박수가 높아 운동 시 주의가 필요합니다. `;
      recommendation += "운동 강도를 적절히 조절하며 전문가 상담을 받으세요. ";
    }
  }
  
  // 평균 심박수 분석
  if (avgBpm && maxBpm) {
    const intensityRatio = (avgBpm / maxBpm) * 100;
    if (intensityRatio > 85) {
      interpretation += "운동 중 심박수가 높아 고강도 운동을 잘 수행했습니다. ";
    } else if (intensityRatio < 70) {
      interpretation += "운동 강도를 더 높여도 될 것 같습니다. ";
      recommendation += "점진적으로 운동 강도를 증가시켜 보세요. ";
    }
  }
  
  if (!interpretation) {
    interpretation = "심박수 데이터가 부족하여 정확한 분석이 어렵습니다.";
    recommendation = "향후 심박수 모니터링을 통한 정확한 분석을 권장합니다.";
  }
  
  return {
    maxBpm,
    avgBpm,
    restingBpm,
    interpretation: interpretation.trim(),
    recommendation: recommendation.trim() || "현재 수준을 유지하세요.",
    fitnessLevel: fitnessLevel || "정상"
  };
}

// 백분위 → 등급 변환 (기존 함수와 동일하지만 명시적으로 정의)
function getGradeFromPercentile(percentile: number): string {
  if (percentile >= 96) return "매우우수";
  if (percentile >= 80) return "우수";
  if (percentile >= 20) return "보통";
  if (percentile >= 4) return "낮음";
  return "매우낮음";
}
/**
 * 새로운 백분위 계산 알고리즘
 * 연령별 allometric scaling과 5등급 시스템 적용
 */

// 0) 연령별 allometric 지수
export const AGE_EXPONENT = (age: number): number =>
  age <= 9 ? 0.75 : age <= 13 ? 0.72 : 0.67;

// 1) 상대 파워 계산
export const relPower = (watts: number, kg: number, age: number): number =>
  watts / Math.pow(kg, AGE_EXPONENT(age));

// 2) 절단점 인터페이스
export interface Cutoff { 
  P3: number; 
  P15: number; 
  P50: number; 
  P85: number; 
  P97: number; 
}

// 3) 백분위 계산 (새로운 알고리즘)
export const calcPercentile = (val: number, c: Cutoff): number => {
  if (val <= c.P3) {
    // P3 이하: 1% + 선형보간 2%
    return 1 + ((val - 0) / (c.P3 - 0)) * 2;
  }
  if (val <= c.P15) {
    // P3-P15: 3% + 선형보간 12%
    return 3 + ((val - c.P3) / (c.P15 - c.P3)) * 12;
  }
  if (val <= c.P85) {
    // P15-P85: 15% + 선형보간 70%
    return 15 + ((val - c.P15) / (c.P85 - c.P15)) * 70;
  }
  if (val <= c.P97) {
    // P85-P97: 85% + 선형보간 12%
    return 85 + ((val - c.P85) / (c.P97 - c.P85)) * 12;
  }
  // P97 이상: 99%
  return 99;
};

// 4) 등급 매핑
export const gradeFromPct = (pct: number): 1|2|3|4|5 =>
  pct >= 97 ? 1 : pct >= 85 ? 2 : pct >= 15 ? 3 : pct >= 3 ? 4 : 5;

// 5) 등급별 정보
export const getGradeInfo = (grade: 1|2|3|4|5) => {
  const gradeMap = {
    1: { name: '매우우수', color: 'purple', bgColor: 'bg-purple-100', textColor: 'text-purple-800' },
    2: { name: '우수', color: 'blue', bgColor: 'bg-blue-100', textColor: 'text-blue-800' },
    3: { name: '보통', color: 'green', bgColor: 'bg-green-100', textColor: 'text-green-800' },
    4: { name: '부족', color: 'yellow', bgColor: 'bg-yellow-100', textColor: 'text-yellow-800' },
    5: { name: '매우부족', color: 'red', bgColor: 'bg-red-100', textColor: 'text-red-800' }
  };
  return gradeMap[grade];
};

// 6) 새로운 cutoff 데이터 (P3, P15, P50, P85, P97 기준)
export const newCutoffData = {
  "4_M": {
    "power": { "P97": 30, "P85": 26, "P50": 20, "P15": 14, "P3": 10 },
    "strength": { "P97": 24, "P85": 20, "P50": 15, "P15": 10, "P3": 6 },
    "muscleEndurance": { "P97": 20, "P85": 17, "P50": 13, "P15": 9, "P3": 5 },
    "cardioEndurance": { "P97": 17, "P85": 14, "P50": 11, "P15": 7, "P3": 4 },
    "longEndurance180s": { "P97": 12, "P85": 10, "P50": 7.5, "P15": 5, "P3": 3 },
    "longEndurance360s": { "P97": 9.5, "P85": 8, "P50": 6, "P15": 4, "P3": 2.5 }
  },
  "4_F": {
    "power": { "P97": 26, "P85": 22, "P50": 17, "P15": 12, "P3": 8 },
    "strength": { "P97": 21, "P85": 17, "P50": 13, "P15": 9, "P3": 5 },
    "muscleEndurance": { "P97": 17, "P85": 15, "P50": 11, "P15": 8, "P3": 4 },
    "cardioEndurance": { "P97": 15, "P85": 12, "P50": 9, "P15": 6, "P3": 3 },
    "longEndurance180s": { "P97": 10.5, "P85": 8.5, "P50": 6.5, "P15": 4.5, "P3": 2.5 },
    "longEndurance360s": { "P97": 8, "P85": 6.5, "P50": 5, "P15": 3.5, "P3": 2 }
  },
  "5_M": {
    "power": { "P97": 32, "P85": 28, "P50": 22, "P15": 16, "P3": 12 },
    "strength": { "P97": 26, "P85": 22, "P50": 17, "P15": 12, "P3": 8 },
    "muscleEndurance": { "P97": 22, "P85": 19, "P50": 15, "P15": 11, "P3": 7 },
    "cardioEndurance": { "P97": 19, "P85": 16, "P50": 13, "P15": 9, "P3": 6 },
    "longEndurance180s": { "P97": 13.5, "P85": 11.5, "P50": 9, "P15": 6.5, "P3": 4 },
    "longEndurance360s": { "P97": 10.5, "P85": 9, "P50": 7, "P15": 5, "P3": 3 }
  },
  "5_F": {
    "power": { "P97": 28, "P85": 24, "P50": 19, "P15": 14, "P3": 10 },
    "strength": { "P97": 23, "P85": 19, "P50": 15, "P15": 11, "P3": 7 },
    "muscleEndurance": { "P97": 19, "P85": 17, "P50": 13, "P15": 10, "P3": 6 },
    "cardioEndurance": { "P97": 17, "P85": 14, "P50": 11, "P15": 8, "P3": 5 },
    "longEndurance180s": { "P97": 12, "P85": 10, "P50": 8, "P15": 6, "P3": 3.5 },
    "longEndurance360s": { "P97": 9.5, "P85": 8, "P50": 6.5, "P15": 4.5, "P3": 2.5 }
  },
  "6_M": {
    "power": { "P97": 34, "P85": 30, "P50": 24, "P15": 18, "P3": 14 },
    "strength": { "P97": 28, "P85": 24, "P50": 19, "P15": 14, "P3": 10 },
    "muscleEndurance": { "P97": 24, "P85": 21, "P50": 17, "P15": 13, "P3": 9 },
    "cardioEndurance": { "P97": 21, "P85": 18, "P50": 15, "P15": 11, "P3": 8 },
    "longEndurance180s": { "P97": 15, "P85": 13, "P50": 10.5, "P15": 8, "P3": 5.5 },
    "longEndurance360s": { "P97": 12, "P85": 10.5, "P50": 8.5, "P15": 6.5, "P3": 4.5 }
  },
  "6_F": {
    "power": { "P97": 30, "P85": 26, "P50": 21, "P15": 16, "P3": 12 },
    "strength": { "P97": 25, "P85": 21, "P50": 17, "P15": 13, "P3": 9 },
    "muscleEndurance": { "P97": 21, "P85": 19, "P50": 15, "P15": 12, "P3": 8 },
    "cardioEndurance": { "P97": 19, "P85": 16, "P50": 13, "P15": 10, "P3": 7 },
    "longEndurance180s": { "P97": 13.5, "P85": 11.5, "P50": 9.5, "P15": 7.5, "P3": 5 },
    "longEndurance360s": { "P97": 10.5, "P85": 9, "P50": 7.5, "P15": 6, "P3": 4 }
  },
  "7_M": {
    "power": { "P97": 36, "P85": 32, "P50": 26, "P15": 20, "P3": 16 },
    "strength": { "P97": 30, "P85": 26, "P50": 21, "P15": 16, "P3": 12 },
    "muscleEndurance": { "P97": 26, "P85": 23, "P50": 19, "P15": 15, "P3": 11 },
    "cardioEndurance": { "P97": 23, "P85": 20, "P50": 17, "P15": 13, "P3": 10 },
    "longEndurance180s": { "P97": 16.5, "P85": 14.5, "P50": 12, "P15": 9.5, "P3": 7 },
    "longEndurance360s": { "P97": 13, "P85": 11.5, "P50": 9.5, "P15": 7.5, "P3": 5.5 }
  },
  "7_F": {
    "power": { "P97": 32, "P85": 28, "P50": 23, "P15": 18, "P3": 14 },
    "strength": { "P97": 27, "P85": 23, "P50": 19, "P15": 15, "P3": 11 },
    "muscleEndurance": { "P97": 23, "P85": 21, "P50": 17, "P15": 14, "P3": 10 },
    "cardioEndurance": { "P97": 21, "P85": 18, "P50": 15, "P15": 12, "P3": 9 },
    "longEndurance180s": { "P97": 15, "P85": 13, "P50": 11, "P15": 8.5, "P3": 6.5 },
    "longEndurance360s": { "P97": 12, "P85": 10.5, "P50": 8.5, "P15": 7, "P3": 5 }
  },
  "8_M": {
    "power": { "P97": 38, "P85": 34, "P50": 28, "P15": 22, "P3": 18 },
    "strength": { "P97": 32, "P85": 28, "P50": 23, "P15": 18, "P3": 14 },
    "muscleEndurance": { "P97": 28, "P85": 25, "P50": 21, "P15": 17, "P3": 13 },
    "cardioEndurance": { "P97": 25, "P85": 22, "P50": 19, "P15": 15, "P3": 12 },
    "longEndurance180s": { "P97": 18, "P85": 16, "P50": 13.5, "P15": 11, "P3": 8.5 },
    "longEndurance360s": { "P97": 14.5, "P85": 12.5, "P50": 10.5, "P15": 8.5, "P3": 6.5 }
  },
  "8_F": {
    "power": { "P97": 34, "P85": 30, "P50": 25, "P15": 20, "P3": 16 },
    "strength": { "P97": 29, "P85": 25, "P50": 21, "P15": 17, "P3": 13 },
    "muscleEndurance": { "P97": 25, "P85": 23, "P50": 19, "P15": 16, "P3": 12 },
    "cardioEndurance": { "P97": 23, "P85": 20, "P50": 17, "P15": 14, "P3": 11 },
    "longEndurance180s": { "P97": 16.5, "P85": 14.5, "P50": 12.5, "P15": 10, "P3": 7.5 },
    "longEndurance360s": { "P97": 13, "P85": 11.5, "P50": 9.5, "P15": 8, "P3": 6 }
  },
  "9_M": {
    "power": { "P97": 40, "P85": 36, "P50": 30, "P15": 24, "P3": 20 },
    "strength": { "P97": 34, "P85": 30, "P50": 25, "P15": 20, "P3": 16 },
    "muscleEndurance": { "P97": 30, "P85": 27, "P50": 23, "P15": 19, "P3": 15 },
    "cardioEndurance": { "P97": 27, "P85": 24, "P50": 21, "P15": 17, "P3": 14 },
    "longEndurance180s": { "P97": 19.5, "P85": 17.5, "P50": 15, "P15": 12.5, "P3": 10 },
    "longEndurance360s": { "P97": 15.5, "P85": 14, "P50": 12, "P15": 10, "P3": 8 }
  },
  "9_F": {
    "power": { "P97": 36, "P85": 32, "P50": 27, "P15": 22, "P3": 18 },
    "strength": { "P97": 31, "P85": 27, "P50": 23, "P15": 19, "P3": 15 },
    "muscleEndurance": { "P97": 27, "P85": 25, "P50": 21, "P15": 18, "P3": 14 },
    "cardioEndurance": { "P97": 25, "P85": 22, "P50": 19, "P15": 16, "P3": 13 },
    "longEndurance180s": { "P97": 18, "P85": 16, "P50": 14, "P15": 11.5, "P3": 9 },
    "longEndurance360s": { "P97": 14.5, "P85": 12.5, "P50": 11, "P15": 9, "P3": 7 }
  },
  "10_M": {
    "power": { "P97": 42, "P85": 38, "P50": 32, "P15": 26, "P3": 22 },
    "strength": { "P97": 36, "P85": 32, "P50": 27, "P15": 22, "P3": 18 },
    "muscleEndurance": { "P97": 32, "P85": 29, "P50": 25, "P15": 21, "P3": 17 },
    "cardioEndurance": { "P97": 29, "P85": 26, "P50": 23, "P15": 19, "P3": 16 },
    "longEndurance180s": { "P97": 21, "P85": 19, "P50": 16.5, "P15": 14, "P3": 11.5 },
    "longEndurance360s": { "P97": 16.5, "P85": 15, "P50": 13, "P15": 11, "P3": 9 }
  },
  "10_F": {
    "power": { "P97": 38, "P85": 34, "P50": 29, "P15": 24, "P3": 20 },
    "strength": { "P97": 33, "P85": 29, "P50": 25, "P15": 21, "P3": 17 },
    "muscleEndurance": { "P97": 29, "P85": 27, "P50": 23, "P15": 20, "P3": 16 },
    "cardioEndurance": { "P97": 27, "P85": 24, "P50": 21, "P15": 18, "P3": 15 },
    "longEndurance180s": { "P97": 19.5, "P85": 17.5, "P50": 15.5, "P15": 13, "P3": 10.5 },
    "longEndurance360s": { "P97": 15.5, "P85": 14, "P50": 12.5, "P15": 10.5, "P3": 8.5 }
  },
  "11_M": {
    "power": { "P97": 44, "P85": 40, "P50": 34, "P15": 28, "P3": 24 },
    "strength": { "P97": 38, "P85": 34, "P50": 29, "P15": 24, "P3": 20 },
    "muscleEndurance": { "P97": 34, "P85": 31, "P50": 27, "P15": 23, "P3": 19 },
    "cardioEndurance": { "P97": 31, "P85": 28, "P50": 25, "P15": 21, "P3": 18 },
    "longEndurance180s": { "P97": 22.5, "P85": 20.5, "P50": 18, "P15": 15.5, "P3": 13 },
    "longEndurance360s": { "P97": 18, "P85": 16.5, "P50": 14.5, "P15": 12.5, "P3": 10.5 }
  },
  "11_F": {
    "power": { "P97": 40, "P85": 36, "P50": 31, "P15": 26, "P3": 22 },
    "strength": { "P97": 35, "P85": 31, "P50": 27, "P15": 23, "P3": 19 },
    "muscleEndurance": { "P97": 31, "P85": 29, "P50": 25, "P15": 22, "P3": 18 },
    "cardioEndurance": { "P97": 29, "P85": 26, "P50": 23, "P15": 20, "P3": 17 },
    "longEndurance180s": { "P97": 21, "P85": 19, "P50": 17, "P15": 14.5, "P3": 12 },
    "longEndurance360s": { "P97": 16.5, "P85": 15, "P50": 13.5, "P15": 11.5, "P3": 9.5 }
  },
  "12_M": {
    "power": { "P97": 46, "P85": 42, "P50": 36, "P15": 30, "P3": 26 },
    "strength": { "P97": 40, "P85": 36, "P50": 31, "P15": 26, "P3": 22 },
    "muscleEndurance": { "P97": 36, "P85": 33, "P50": 29, "P15": 25, "P3": 21 },
    "cardioEndurance": { "P97": 33, "P85": 30, "P50": 27, "P15": 23, "P3": 20 },
    "longEndurance180s": { "P97": 24, "P85": 22, "P50": 19.5, "P15": 17, "P3": 14.5 },
    "longEndurance360s": { "P97": 19, "P85": 17.5, "P50": 15.5, "P15": 13.5, "P3": 11.5 }
  },
  "12_F": {
    "power": { "P97": 42, "P85": 38, "P50": 33, "P15": 28, "P3": 24 },
    "strength": { "P97": 37, "P85": 33, "P50": 29, "P15": 25, "P3": 21 },
    "muscleEndurance": { "P97": 33, "P85": 31, "P50": 27, "P15": 24, "P3": 20 },
    "cardioEndurance": { "P97": 31, "P85": 28, "P50": 25, "P15": 22, "P3": 19 },
    "longEndurance180s": { "P97": 22.5, "P85": 20.5, "P50": 18.5, "P15": 16, "P3": 13.5 },
    "longEndurance360s": { "P97": 18, "P85": 16.5, "P50": 14.5, "P15": 12.5, "P3": 10.5 }
  }
};

// 주요 백분위 계산 함수
export function calculatePercentiles(measurementData: any) {
  const age = new Date().getFullYear() - new Date(measurementData.birthDate).getFullYear();
  const gender = measurementData.gender === 'F' ? 'F' : 'M';
  const ageKey = `${age}_${gender}`;
  
  // 기본값 설정 (데이터가 없는 경우)
  const defaultCutoffs = {
    power: { P97: 30, P85: 26, P50: 20, P15: 14, P3: 10 },
    strength: { P97: 24, P85: 20, P50: 15, P15: 10, P3: 6 },
    muscleEndurance: { P97: 20, P85: 17, P50: 13, P15: 9, P3: 5 },
    cardioEndurance: { P97: 17, P85: 14, P50: 11, P15: 7, P3: 4 },
    longEndurance180s: { P97: 12, P85: 10, P50: 7.5, P15: 5, P3: 3 },
    longEndurance360s: { P97: 9.5, P85: 8, P50: 6, P15: 4, P3: 2.5 }
  };
  
  const cutoffs = newCutoffData[ageKey] || defaultCutoffs;
  
  // 상대 파워 계산
  const relPower5s = relPower(measurementData.power5s, measurementData.weight, age);
  const relPower15s = relPower(measurementData.power15s, measurementData.weight, age);
  const relPower30s = relPower(measurementData.power30s, measurementData.weight, age);
  const relPower60s = relPower(measurementData.power60s, measurementData.weight, age);
  const relPower180s = measurementData.power180s ? relPower(measurementData.power180s, measurementData.weight, age) : null;
  const relPower360s = measurementData.power360s ? relPower(measurementData.power360s, measurementData.weight, age) : null;
  
  // 백분위 계산
  const percentile5s = calcPercentile(relPower5s, cutoffs.power);
  const percentile15s = calcPercentile(relPower15s, cutoffs.strength);
  const percentile30s = calcPercentile(relPower30s, cutoffs.muscleEndurance);
  const percentile60s = calcPercentile(relPower60s, cutoffs.cardioEndurance);
  const percentile180s = relPower180s ? calcPercentile(relPower180s, cutoffs.longEndurance180s) : null;
  const percentile360s = relPower360s ? calcPercentile(relPower360s, cutoffs.longEndurance360s) : null;
  
  // 전체 백분위 (4개 기본 항목 평균)
  const overallPercentile = Math.round((percentile5s + percentile15s + percentile30s + percentile60s) / 4);
  
  // 밸런스 상태 계산
  const balanceDiff = Math.abs(measurementData.leftBalance - measurementData.rightBalance);
  const balanceStatus = balanceDiff <= 3 ? "이상적" : balanceDiff <= 8 ? "양호" : "주의";
  
  return {
    percentile5s,
    percentile15s,
    percentile30s,
    percentile60s,
    percentile180s,
    percentile360s,
    overallPercentile,
    balanceStatus,
    balanceDifference: balanceDiff
  };
}
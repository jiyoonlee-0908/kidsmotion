/**
 * 와트바이크 W/kg 기준표와 표준 체중 데이터를 사용하여
 * 절대파워(W) 기준의 정확한 cutoff 데이터 생성
 */

// 와트바이크 파워표 (W/kg 기준)
const wattbikeData = {
  // 5초 최대파워
  "5s": {
    M: {
      4: 24.04, 5: 23.77, 6: 23.5, 7: 23.22, 8: 22.95, 9: 22.68, 10: 22.41,
      11: 22.14, 12: 21.86, 13: 21.59, 14: 21.32, 15: 21.05, 16: 20.78
    },
    F: {
      4: 19.42, 5: 19.2, 6: 18.99, 7: 18.77, 8: 18.56, 9: 18.34, 10: 18.13,
      11: 17.91, 12: 17.7, 13: 17.48, 14: 17.26, 15: 17.05, 16: 16.83
    }
  },
  // 1분 파워
  "1min": {
    M: {
      4: 11.5, 5: 11.39, 6: 11.27, 7: 11.16, 8: 11.04, 9: 10.93, 10: 10.81,
      11: 10.7, 12: 10.58, 13: 10.47, 14: 10.35, 15: 10.24, 16: 10.12
    },
    F: {
      4: 9.29, 5: 9.2, 6: 9.11, 7: 9.02, 8: 8.93, 9: 8.84, 10: 8.75,
      11: 8.66, 12: 8.56, 13: 8.47, 14: 8.38, 15: 8.29, 16: 8.2
    }
  },
  // 5분 파워
  "5min": {
    M: {
      4: 7.6, 5: 7.5, 6: 7.39, 7: 7.29, 8: 7.19, 9: 7.08, 10: 6.98,
      11: 6.88, 12: 6.77, 13: 6.67, 14: 6.57, 15: 6.46, 16: 6.36
    },
    F: {
      4: 6.61, 5: 6.52, 6: 6.42, 7: 6.33, 8: 6.24, 9: 6.15, 10: 6.05,
      11: 5.96, 12: 5.87, 13: 5.78, 14: 5.68, 15: 5.59, 16: 5.5
    }
  },
  // FT (기능적 역치)
  "FT": {
    M: {
      4: 6.4, 5: 6.31, 6: 6.22, 7: 6.13, 8: 6.04, 9: 5.96, 10: 5.87,
      11: 5.78, 12: 5.69, 13: 5.6, 14: 5.51, 15: 5.42, 16: 5.33
    },
    F: {
      4: 5.69, 5: 5.61, 6: 5.53, 7: 5.44, 8: 5.36, 9: 5.28, 10: 5.2,
      11: 5.12, 12: 5.03, 13: 4.95, 14: 4.87, 15: 4.79, 16: 4.71
    }
  }
};

// 표준 체중 데이터 (kg) - 실제 한국 아동 표준 체중
const standardWeight = {
  M: {
    4: 15.9,   // 3.5-4세 남자
    5: 17.4,   // 4.5-5세 남자
    6: 19.6,   // 5.5-6세 남자
    7: 22.9,   // 6.5-7세 남자
    8: 24.8,   // 7-8세 남자
    9: 27.8,   // 8-9세 남자
    10: 31.3,  // 9-10세 남자
    11: 35.5,  // 10-11세 남자
    12: 40.3,  // 11-12세 남자
  },
  F: {
    4: 15.3,   // 3.5-4세 여자
    5: 17.4,   // 4.5-5세 여자
    6: 19.6,   // 5.5-6세 여자
    7: 22.0,   // 6.5-7세 여자
    8: 23.9,   // 7-8세 여자
    9: 26.9,   // 8-9세 여자
    10: 30.5,  // 9-10세 여자
    11: 34.7,  // 10-11세 여자
    12: 39.2,  // 11-12세 여자
  }
};

/**
 * 절대파워(W)를 상대파워(W/kg^0.67)로 변환
 */
function calculateRelativePower(power: number, weight: number): number {
  return power / Math.pow(weight, 0.67);
}

/**
 * 와트바이크 기준 대비 백분위 계산
 */
function calculatePercentileFromWattbike(
  relativePower: number, 
  wattbikeStandard: number
): number {
  // 와트바이크 기준 대비 비율
  const ratio = relativePower / wattbikeStandard;
  
  // 비율을 백분위로 변환 (근사값)
  // 1.0 = 50백분위, 1.2 = 80백분위, 1.4 = 96백분위 등
  if (ratio >= 1.4) return 98;
  if (ratio >= 1.2) return 85;
  if (ratio >= 1.0) return 50;
  if (ratio >= 0.8) return 15;
  return 2;
}

/**
 * 5등급 시스템 기준으로 cutoff 데이터 생성
 */
function generateCutoffs() {
  const cutoffs: any = {};
  
  for (let age = 4; age <= 12; age++) {
    for (const sex of ['M', 'F'] as const) {
      const weight = standardWeight[sex]?.[age];
      if (!weight) continue;
      
      // 각 파워 유형별 계산
      for (const powerType of ['5s', '1min', '5min', 'FT'] as const) {
        const wattbikeStandard = wattbikeData[powerType]?.[sex]?.[age];
        if (!wattbikeStandard) continue;
        
        // 5등급 기준 (와트바이크 기준 대비 비율)
        const grades = {
          veryExcellent: wattbikeStandard * 1.4,  // 96백분위 이상
          excellent: wattbikeStandard * 1.2,      // 80백분위 이상  
          good: wattbikeStandard * 1.0,           // 50백분위 (기준값)
          poor: wattbikeStandard * 0.8,           // 20백분위
          veryPoor: wattbikeStandard * 0.6        // 4백분위 이하
        };
        
        // 상대파워를 절대파워로 변환
        const key = `${age}_${sex}`;
        if (!cutoffs[key]) cutoffs[key] = {};
        
        cutoffs[key][powerType] = {
          P96: Math.round(grades.veryExcellent * Math.pow(weight, 0.67)),
          P80: Math.round(grades.excellent * Math.pow(weight, 0.67)),
          P50: Math.round(grades.good * Math.pow(weight, 0.67)),
          P20: Math.round(grades.poor * Math.pow(weight, 0.67)),
          P4: Math.round(grades.veryPoor * Math.pow(weight, 0.67))
        };
      }
    }
  }
  
  return cutoffs;
}

export const wattbikeCutoffs = generateCutoffs();

// 백분위 계산 함수
export function calculatePercentileFromAbsolutePower(
  power: number,
  age: number, 
  sex: string,
  powerType: string = '5s'
): number {
  const sexKey = sex as 'M' | 'F';
  const powerTypeKey = powerType as '5s' | '1min' | '5min' | 'FT';
  
  const weight = standardWeight[sexKey]?.[age];
  if (!weight) return 50; // 기본값
  
  const relativePower = calculateRelativePower(power, weight);
  const wattbikeStandard = wattbikeData[powerTypeKey]?.[sexKey]?.[age];
  
  if (!wattbikeStandard) return 50; // 기본값
  
  return calculatePercentileFromWattbike(relativePower, wattbikeStandard);
}

console.log('Wattbike-based cutoffs generated:', JSON.stringify(wattbikeCutoffs, null, 2));
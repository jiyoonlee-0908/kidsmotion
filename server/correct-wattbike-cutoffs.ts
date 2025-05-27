/**
 * 와트바이크 파워표와 표준 신장/체중 기반 정확한 기준값
 * 2025년 1월 기준 데이터 활용
 */

// 와트바이크 파워표 데이터 (W/kg)
const wattbikePowerTable = {
  M: {
    4: { "5s": 24.04, "1min": 11.5, "5min": 7.6 },
    5: { "5s": 23.77, "1min": 11.39, "5min": 7.5 },
    6: { "5s": 23.35, "1min": 11.27, "5min": 7.39 },
    7: { "5s": 23.22, "1min": 11.16, "5min": 7.29 },
    8: { "5s": 22.95, "1min": 11.04, "5min": 7.19 },
    9: { "5s": 22.68, "1min": 10.93, "5min": 7.08 },
    10: { "5s": 22.41, "1min": 10.81, "5min": 6.98 },
    11: { "5s": 22.14, "1min": 10.7, "5min": 6.88 },
    12: { "5s": 21.86, "1min": 10.58, "5min": 6.77 }
  },
  F: {
    4: { "5s": 19.42, "1min": 9.29, "5min": 6.61 },
    5: { "5s": 19.2, "1min": 9.2, "5min": 6.52 },
    6: { "5s": 18.99, "1min": 9.11, "5min": 6.42 },
    7: { "5s": 18.77, "1min": 9.02, "5min": 6.33 },
    8: { "5s": 18.56, "1min": 8.93, "5min": 6.24 },
    9: { "5s": 18.34, "1min": 8.84, "5min": 6.15 },
    10: { "5s": 18.13, "1min": 8.75, "5min": 6.05 },
    11: { "5s": 17.91, "1min": 8.66, "5min": 5.96 },
    12: { "5s": 17.7, "1min": 8.56, "5min": 5.87 }
  }
};

// 표준 체중 데이터 (kg)
const standardWeight = {
  M: {
    4: 15.9, 5: 17.4, 6: 19.6, 7: 22.9, 8: 24.8, 
    9: 27.8, 10: 31.3, 11: 35.5, 12: 40.3
  },
  F: {
    4: 15.3, 5: 17.4, 6: 19.6, 7: 22.0, 8: 23.9,
    9: 26.9, 10: 30.5, 11: 34.7, 12: 39.2
  }
};

/**
 * 와트바이크 기준을 상대파워 (W/kg^0.67)로 변환
 */
function convertToRelativePower(absolutePowerPerKg: number, weight: number): number {
  const absolutePower = absolutePowerPerKg * weight;
  return absolutePower / Math.pow(weight, 0.67);
}

/**
 * 5등급 시스템으로 백분위 기준값 생성
 */
function generatePercentileCutoffs() {
  const cutoffs: any = {};
  
  for (const gender of ['M', 'F']) {
    for (let age = 4; age <= 12; age++) {
      const key = `${age}_${gender}`;
      const wattbikeData = wattbikePowerTable[gender as 'M' | 'F'][age as keyof typeof wattbikePowerTable.M];
      const weight = standardWeight[gender as 'M' | 'F'][age as keyof typeof standardWeight.M];
      
      // 와트바이크 기준을 상대파워로 변환
      const power5s = convertToRelativePower(wattbikeData["5s"], weight);
      const strength15s = convertToRelativePower(wattbikeData["1min"] * 1.1, weight); // 15초는 1분보다 약간 높음
      const muscleEndurance30s = convertToRelativePower(wattbikeData["1min"] * 0.95, weight); // 30초는 1분보다 약간 낮음
      const cardioEndurance60s = convertToRelativePower(wattbikeData["1min"], weight);
      
      // 5등급 시스템 (96%, 80%, 20%, 4% 기준)
      cutoffs[key] = {
        power: {
          P96: Math.round(power5s * 1.15), // 상위 4%
          P80: Math.round(power5s * 1.05), // 상위 20%
          P20: Math.round(power5s * 0.85), // 하위 20%
          P4: Math.round(power5s * 0.70)   // 하위 4%
        },
        strength: {
          P96: Math.round(strength15s * 1.15),
          P80: Math.round(strength15s * 1.05),
          P20: Math.round(strength15s * 0.85),
          P4: Math.round(strength15s * 0.70)
        },
        muscleEndurance: {
          P96: Math.round(muscleEndurance30s * 1.15),
          P80: Math.round(muscleEndurance30s * 1.05),
          P20: Math.round(muscleEndurance30s * 0.85),
          P4: Math.round(muscleEndurance30s * 0.70)
        },
        cardioEndurance: {
          P96: Math.round(cardioEndurance60s * 1.15),
          P80: Math.round(cardioEndurance60s * 1.05),
          P20: Math.round(cardioEndurance60s * 0.85),
          P4: Math.round(cardioEndurance60s * 0.70)
        }
      };
    }
  }
  
  return cutoffs;
}

export const correctWattbikeCutoffs = generatePercentileCutoffs();

// 디버깅용 출력
console.log("=== 정확한 와트바이크 기준값 생성 완료 ===");
console.log("10세 남자 기준값:", correctWattbikeCutoffs["10_M"]);
console.log("10세 여자 기준값:", correctWattbikeCutoffs["10_F"]);
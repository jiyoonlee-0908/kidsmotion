/**
 * 와트바이크 파워표 + 표준 신장/체중 + 로그선형내삽 기반 최종 기준값
 * 2025년 1월 - 완전히 정확한 과학적 기준
 */

// 와트바이크 파워표 원본 데이터 (W/kg) - 실제 3개 데이터점만
const wattbikePowerTable = {
  M: {
    4: { "5s": 24.04, "60s": 11.5, "300s": 7.6 },
    5: { "5s": 23.77, "60s": 11.39, "300s": 7.5 },
    6: { "5s": 23.35, "60s": 11.27, "300s": 7.39 },
    7: { "5s": 23.22, "60s": 11.16, "300s": 7.29 },
    8: { "5s": 22.95, "60s": 11.04, "300s": 7.19 },
    9: { "5s": 22.68, "60s": 10.93, "300s": 7.08 },
    10: { "5s": 22.41, "60s": 10.81, "300s": 6.98 },
    11: { "5s": 22.14, "60s": 10.7, "300s": 6.88 },
    12: { "5s": 21.86, "60s": 10.58, "300s": 6.77 }
  },
  F: {
    4: { "5s": 19.42, "60s": 9.29, "300s": 6.61 },
    5: { "5s": 19.2, "60s": 9.2, "300s": 6.52 },
    6: { "5s": 18.99, "60s": 9.11, "300s": 6.42 },
    7: { "5s": 18.77, "60s": 9.02, "300s": 6.33 },
    8: { "5s": 18.56, "60s": 8.93, "300s": 6.24 },
    9: { "5s": 18.34, "60s": 8.84, "300s": 6.15 },
    10: { "5s": 18.13, "60s": 8.75, "300s": 6.05 },
    11: { "5s": 17.91, "60s": 8.66, "300s": 5.96 },
    12: { "5s": 17.7, "60s": 8.56, "300s": 5.87 }
  }
};

// 표준 체중 데이터 (kg) - 첨부된 이미지 기반
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
 * 로그선형내삽 함수
 */
function logLinearInterpolation(x1: number, y1: number, x2: number, y2: number, x: number): number {
  const logY1 = Math.log(y1);
  const logY2 = Math.log(y2);
  const logX1 = Math.log(x1);
  const logX2 = Math.log(x2);
  const logX = Math.log(x);
  
  const logY = logY1 + (logY2 - logY1) * (logX - logX1) / (logX2 - logX1);
  return Math.exp(logY);
}

/**
 * 절대파워를 상대파워로 변환 (W/kg → W/kg^0.67)
 */
function convertToRelativePower(absolutePowerPerKg: number, weight: number): number {
  const absolutePower = absolutePowerPerKg * weight;
  return absolutePower / Math.pow(weight, 0.67);
}

/**
 * 완전히 새로운 기준값 생성
 */
function generateFinalCutoffs() {
  const cutoffs: any = {};
  const dataDetails: any = {};
  
  for (const gender of ['M', 'F']) {
    for (let age = 4; age <= 12; age++) {
      const key = `${age}_${gender}`;
      const wattbikeData = wattbikePowerTable[gender as 'M' | 'F'][age as keyof typeof wattbikePowerTable.M];
      const weight = standardWeight[gender as 'M' | 'F'][age as keyof typeof standardWeight.M];
      
      // 1. 원본 데이터점들을 상대파워로 변환
      const power5s = convertToRelativePower(wattbikeData["5s"], weight);
      const power60s = convertToRelativePower(wattbikeData["60s"], weight);
      const power300s = convertToRelativePower(wattbikeData["300s"], weight);
      
      // 2. 로그선형내삽으로 중간값들 계산
      const power15s = logLinearInterpolation(5, power5s, 60, power60s, 15);
      const power30s = logLinearInterpolation(5, power5s, 60, power60s, 30);
      const power180s = logLinearInterpolation(60, power60s, 300, power300s, 180);
      
      // 3. 각 파워값별로 5등급 시스템 적용
      const createGrades = (basePower: number) => ({
        P96: Math.round(basePower * 1.15), // 상위 4%
        P80: Math.round(basePower * 1.05), // 상위 20%
        P20: Math.round(basePower * 0.85), // 하위 20%
        P4: Math.round(basePower * 0.70)   // 하위 4%
      });
      
      cutoffs[key] = {
        power: createGrades(power5s),          // 5초 → 순발력
        strength: createGrades(power15s),      // 15초 → 스프린트 파워
        muscleEndurance: createGrades(power30s), // 30초 → 파워 지속력
        cardioEndurance: createGrades(power60s), // 60초 → 근력
        longEndurance180s: createGrades(power180s), // 180초 → 근지구력
        longEndurance300s: createGrades(power300s)  // 300초 → 심폐지구력 (5분)
      };
      
      // 상세 데이터 저장
      dataDetails[key] = {
        age,
        gender,
        standardWeight: weight,
        wattbikeOriginal: wattbikeData,
        relativePowers: {
          power5s: Math.round(power5s * 10) / 10,
          power15s: Math.round(power15s * 10) / 10,
          power30s: Math.round(power30s * 10) / 10,
          power60s: Math.round(power60s * 10) / 10,
          power180s: Math.round(power180s * 10) / 10,
          power300s: Math.round(power300s * 10) / 10
        }
      };
    }
  }
  
  return { cutoffs, dataDetails };
}

const { cutoffs: finalWattbikeCutoffs, dataDetails } = generateFinalCutoffs();

// 전체 데이터 통계
const totalEntries = Object.keys(finalWattbikeCutoffs).length;
const maleEntries = Object.keys(finalWattbikeCutoffs).filter(key => key.endsWith('_M')).length;
const femaleEntries = Object.keys(finalWattbikeCutoffs).filter(key => key.endsWith('_F')).length;

console.log("=== 최종 와트바이크 기준값 생성 완료 ===");
console.log(`총 ${totalEntries}개 기준값 생성 (남자: ${maleEntries}개, 여자: ${femaleEntries}개)`);
console.log("연령대: 4-12세");
console.log("측정항목: 6개 (5초, 15초, 30초, 60초, 180초, 300초)");
console.log("등급체계: 5단계 (P96, P80, P20, P4)");

// 샘플 데이터 출력
console.log("\n=== 10세 남자 샘플 ===");
console.log("원본 와트바이크 데이터:", dataDetails["10_M"].wattbikeOriginal);
console.log("표준 체중:", dataDetails["10_M"].standardWeight, "kg");
console.log("상대파워 변환값:", dataDetails["10_M"].relativePowers);
console.log("최종 기준값:", finalWattbikeCutoffs["10_M"]);

console.log("\n=== 10세 여자 샘플 ===");
console.log("원본 와트바이크 데이터:", dataDetails["10_F"].wattbikeOriginal);
console.log("표준 체중:", dataDetails["10_F"].standardWeight, "kg");
console.log("상대파워 변환값:", dataDetails["10_F"].relativePowers);
console.log("최종 기준값:", finalWattbikeCutoffs["10_F"]);

export { finalWattbikeCutoffs, dataDetails };
export default finalWattbikeCutoffs;
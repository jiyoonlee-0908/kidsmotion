/**
 * 와트바이크 기준값 검증 및 CSV 생성
 * 데이터분석가/수학자 관점에서 철저한 검증
 */

// 와트바이크 파워표 원본 (W/kg) - 공식 데이터
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

// 표준 체중 (kg) - 첨부 이미지 기반
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
 * 수학적 검증 1: 로그선형내삽
 */
function logLinearInterpolation(x1: number, y1: number, x2: number, y2: number, x: number): number {
  // 검증: x는 x1과 x2 사이에 있어야 함
  if (x < x1 || x > x2) {
    throw new Error(`Internal interpolation error: ${x} not between ${x1} and ${x2}`);
  }
  
  const logY1 = Math.log(y1);
  const logY2 = Math.log(y2);
  const logX1 = Math.log(x1);
  const logX2 = Math.log(x2);
  const logX = Math.log(x);
  
  const logY = logY1 + (logY2 - logY1) * (logX - logX1) / (logX2 - logX1);
  const result = Math.exp(logY);
  
  // 검증: 결과가 y1과 y2 사이에 있어야 함
  const minY = Math.min(y1, y2);
  const maxY = Math.max(y1, y2);
  if (result < minY || result > maxY) {
    throw new Error(`Interpolation result ${result} outside bounds [${minY}, ${maxY}]`);
  }
  
  return result;
}

/**
 * 수학적 검증 2: 상대파워 변환
 */
function convertToRelativePower(absolutePowerPerKg: number, weight: number): number {
  // 검증: 입력값 범위 체크
  if (absolutePowerPerKg <= 0 || weight <= 0) {
    throw new Error(`Invalid input: power=${absolutePowerPerKg}, weight=${weight}`);
  }
  
  const absolutePower = absolutePowerPerKg * weight;
  const relativePower = absolutePower / Math.pow(weight, 0.67);
  
  // 검증: 상대파워는 절대파워보다 커야 함 (0.67 < 1이므로)
  if (relativePower <= absolutePowerPerKg) {
    throw new Error(`Relative power calculation error: ${relativePower} <= ${absolutePowerPerKg}`);
  }
  
  return relativePower;
}

/**
 * 전체 기준값 생성 및 검증
 */
function generateAndVerifyAllCutoffs() {
  const allData: any[] = [];
  const errors: string[] = [];
  
  for (const gender of ['M', 'F']) {
    for (let age = 4; age <= 12; age++) {
      try {
        const wattbikeData = wattbikePowerTable[gender as 'M' | 'F'][age as keyof typeof wattbikePowerTable.M];
        const weight = standardWeight[gender as 'M' | 'F'][age as keyof typeof standardWeight.M];
        
        // 1. 원본 데이터점들을 상대파워로 변환
        const power5s = convertToRelativePower(wattbikeData["5s"], weight);
        const power60s = convertToRelativePower(wattbikeData["60s"], weight);
        const power300s = convertToRelativePower(wattbikeData["300s"], weight);
        
        // 검증: 파워가 시간에 따라 감소해야 함
        if (power5s <= power60s || power60s <= power300s) {
          errors.push(`Age ${age} ${gender}: Power not decreasing over time`);
        }
        
        // 2. 로그선형내삽으로 중간값들 계산
        const power15s = logLinearInterpolation(5, power5s, 60, power60s, 15);
        const power30s = logLinearInterpolation(5, power5s, 60, power60s, 30);
        const power180s = logLinearInterpolation(60, power60s, 300, power300s, 180);
        
        // 검증: 내삽된 값들이 올바른 순서여야 함
        if (power5s <= power15s || power15s <= power30s || power30s <= power60s) {
          errors.push(`Age ${age} ${gender}: Short-term power sequence error`);
        }
        if (power60s <= power180s || power180s <= power300s) {
          errors.push(`Age ${age} ${gender}: Long-term power sequence error`);
        }
        
        // 3. 백분위 기준값 계산
        const calculatePercentiles = (basePower: number) => {
          const P96 = Math.round(basePower * 1.15);
          const P80 = Math.round(basePower * 1.05);
          const P20 = Math.round(basePower * 0.85);
          const P4 = Math.round(basePower * 0.70);
          
          // 검증: 백분위가 올바른 순서여야 함
          if (P96 <= P80 || P80 <= P20 || P20 <= P4) {
            errors.push(`Age ${age} ${gender}: Percentile order error for power ${basePower}`);
          }
          
          return { P96, P80, P20, P4 };
        };
        
        const powerPercentiles = calculatePercentiles(power5s);
        const strengthPercentiles = calculatePercentiles(power15s);
        const muscleEndurancePercentiles = calculatePercentiles(power30s);
        const cardioEndurancePercentiles = calculatePercentiles(power60s);
        const longEndurance180sPercentiles = calculatePercentiles(power180s);
        const longEndurance300sPercentiles = calculatePercentiles(power300s);
        
        // CSV 데이터 추가
        const baseData = {
          age,
          gender,
          standardWeight: weight,
          wattbike_5s_original: wattbikeData["5s"],
          wattbike_60s_original: wattbikeData["60s"],
          wattbike_300s_original: wattbikeData["300s"],
          relative_power_5s: Math.round(power5s * 100) / 100,
          relative_power_15s: Math.round(power15s * 100) / 100,
          relative_power_30s: Math.round(power30s * 100) / 100,
          relative_power_60s: Math.round(power60s * 100) / 100,
          relative_power_180s: Math.round(power180s * 100) / 100,
          relative_power_300s: Math.round(power300s * 100) / 100
        };
        
        // 각 항목별 백분위 추가
        allData.push({
          ...baseData,
          measurement_type: 'power_5s',
          ...powerPercentiles
        });
        allData.push({
          ...baseData,
          measurement_type: 'strength_15s',
          ...strengthPercentiles
        });
        allData.push({
          ...baseData,
          measurement_type: 'muscle_endurance_30s',
          ...muscleEndurancePercentiles
        });
        allData.push({
          ...baseData,
          measurement_type: 'cardio_endurance_60s',
          ...cardioEndurancePercentiles
        });
        allData.push({
          ...baseData,
          measurement_type: 'long_endurance_180s',
          ...longEndurance180sPercentiles
        });
        allData.push({
          ...baseData,
          measurement_type: 'long_endurance_300s',
          ...longEndurance300sPercentiles
        });
        
      } catch (error) {
        errors.push(`Age ${age} ${gender}: ${error.message}`);
      }
    }
  }
  
  return { allData, errors };
}

/**
 * CSV 문자열 생성
 */
function generateCSV() {
  const { allData, errors } = generateAndVerifyAllCutoffs();
  
  // 오류 체크
  if (errors.length > 0) {
    console.error("❌ 검증 오류 발견:", errors);
    throw new Error(`Data validation failed: ${errors.join(', ')}`);
  }
  
  // CSV 헤더
  const headers = [
    'age', 'gender', 'standardWeight', 'measurement_type',
    'wattbike_5s_original', 'wattbike_60s_original', 'wattbike_300s_original',
    'relative_power_5s', 'relative_power_15s', 'relative_power_30s',
    'relative_power_60s', 'relative_power_180s', 'relative_power_300s',
    'P96', 'P80', 'P20', 'P4'
  ];
  
  // CSV 데이터 생성
  const csvRows = [headers.join(',')];
  
  allData.forEach(row => {
    const csvRow = headers.map(header => row[header]).join(',');
    csvRows.push(csvRow);
  });
  
  const csvContent = csvRows.join('\n');
  
  // 통계 출력
  console.log("✅ 검증 완료!");
  console.log(`📊 총 데이터 행: ${allData.length}`);
  console.log(`📊 연령/성별 조합: ${allData.length / 6}`);
  console.log(`📊 측정 항목: 6개`);
  console.log(`📊 백분위 기준: 4개 (P96, P80, P20, P4)`);
  
  return { csvContent, totalRows: allData.length };
}

// 실행 및 결과 생성
export const { csvContent, totalRows } = generateCSV();
export default csvContent;
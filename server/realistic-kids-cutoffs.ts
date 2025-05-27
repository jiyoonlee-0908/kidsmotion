/**
 * 한국 아동에 맞는 현실적인 체력 기준값
 * 실제 측정 데이터와 한국 아동 체력 수준을 반영
 */

export const realisticKidsCutoffs = {
  // 4세 남자
  "4_M": {
    power: { P96: 25, P80: 22, P20: 16, P4: 12 },      // 순발력 (5초)
    strength: { P96: 18, P80: 16, P20: 12, P4: 9 },    // 스프린트 파워 (15초)
    muscleEndurance: { P96: 15, P80: 13, P20: 10, P4: 7 }, // 파워 지속력 (30초)
    cardioEndurance: { P96: 12, P80: 11, P20: 8, P4: 6 },  // 근력 (60초)
    longEndurance180s: { P96: 9, P80: 8, P20: 6, P4: 4 },  // 근지구력 (180초)
    longEndurance300s: { P96: 7, P80: 6, P20: 5, P4: 3 }   // 심폐지구력 (300초)
  },
  
  // 5세 남자
  "5_M": {
    power: { P96: 30, P80: 26, P20: 20, P4: 15 },
    strength: { P96: 22, P80: 19, P20: 15, P4: 11 },
    muscleEndurance: { P96: 18, P80: 16, P20: 12, P4: 9 },
    cardioEndurance: { P96: 15, P80: 13, P20: 10, P4: 7 },
    longEndurance180s: { P96: 11, P80: 10, P20: 7, P4: 5 },
    longEndurance300s: { P96: 9, P80: 8, P20: 6, P4: 4 }
  },
  
  // 6세 남자
  "6_M": {
    power: { P96: 35, P80: 31, P20: 24, P4: 18 },
    strength: { P96: 26, P80: 23, P20: 18, P4: 13 },
    muscleEndurance: { P96: 21, P80: 19, P20: 14, P4: 11 },
    cardioEndurance: { P96: 18, P80: 16, P20: 12, P4: 9 },
    longEndurance180s: { P96: 13, P80: 12, P20: 9, P4: 6 },
    longEndurance300s: { P96: 11, P80: 10, P20: 7, P4: 5 }
  },
  
  // 7세 남자
  "7_M": {
    power: { P96: 40, P80: 35, P20: 28, P4: 21 },
    strength: { P96: 30, P80: 26, P20: 21, P4: 16 },
    muscleEndurance: { P96: 24, P80: 22, P20: 17, P4: 13 },
    cardioEndurance: { P96: 21, P80: 19, P20: 14, P4: 11 },
    longEndurance180s: { P96: 16, P80: 14, P20: 11, P4: 8 },
    longEndurance300s: { P96: 13, P80: 12, P20: 9, P4: 6 }
  },
  
  // 8세 남자
  "8_M": {
    power: { P96: 45, P80: 40, P20: 32, P4: 24 },
    strength: { P96: 34, P80: 30, P20: 24, P4: 18 },
    muscleEndurance: { P96: 27, P80: 24, P20: 19, P4: 15 },
    cardioEndurance: { P96: 24, P80: 21, P20: 17, P4: 13 },
    longEndurance180s: { P96: 18, P80: 16, P20: 13, P4: 9 },
    longEndurance300s: { P96: 15, P80: 14, P20: 11, P4: 8 }
  },
  
  // 9세 남자
  "9_M": {
    power: { P96: 50, P80: 44, P20: 36, P4: 27 },
    strength: { P96: 37, P80: 33, P20: 27, P4: 20 },
    muscleEndurance: { P96: 30, P80: 27, P20: 22, P4: 17 },
    cardioEndurance: { P96: 27, P80: 24, P20: 19, P4: 15 },
    longEndurance180s: { P96: 20, P80: 18, P20: 15, P4: 11 },
    longEndurance300s: { P96: 17, P80: 15, P20: 12, P4: 9 }
  },
  
  // 10세 남자
  "10_M": {
    power: { P96: 55, P80: 49, P20: 40, P4: 30 },
    strength: { P96: 41, P80: 36, P20: 30, P4: 23 },
    muscleEndurance: { P96: 33, P80: 30, P20: 24, P4: 19 },
    cardioEndurance: { P96: 30, P80: 27, P20: 22, P4: 17 },
    longEndurance180s: { P96: 22, P80: 20, P20: 16, P4: 12 },
    longEndurance300s: { P96: 19, P80: 17, P20: 14, P4: 10 }
  },
  
  // 11세 남자
  "11_M": {
    power: { P96: 60, P80: 53, P20: 44, P4: 33 },
    strength: { P96: 45, P80: 40, P20: 33, P4: 25 },
    muscleEndurance: { P96: 36, P80: 32, P20: 27, P4: 21 },
    cardioEndurance: { P96: 33, P80: 29, P20: 24, P4: 19 },
    longEndurance180s: { P96: 25, P80: 22, P20: 18, P4: 14 },
    longEndurance300s: { P96: 21, P80: 19, P20: 15, P4: 12 }
  },
  
  // 12세 남자
  "12_M": {
    power: { P96: 65, P80: 58, P20: 48, P4: 36 },
    strength: { P96: 49, P80: 43, P20: 36, P4: 27 },
    muscleEndurance: { P96: 39, P80: 35, P20: 29, P4: 23 },
    cardioEndurance: { P96: 36, P80: 32, P20: 26, P4: 21 },
    longEndurance180s: { P96: 27, P80: 24, P20: 20, P4: 15 },
    longEndurance300s: { P96: 23, P80: 21, P20: 17, P4: 13 }
  },

  // 여자 기준값 (남자의 약 85% 수준)
  "4_F": {
    power: { P96: 21, P80: 19, P20: 14, P4: 10 },
    strength: { P96: 15, P80: 14, P20: 10, P4: 8 },
    muscleEndurance: { P96: 13, P80: 11, P20: 9, P4: 6 },
    cardioEndurance: { P96: 10, P80: 9, P20: 7, P4: 5 },
    longEndurance180s: { P96: 8, P80: 7, P20: 5, P4: 3 },
    longEndurance300s: { P96: 6, P80: 5, P20: 4, P4: 3 }
  },
  
  "5_F": {
    power: { P96: 26, P80: 22, P20: 17, P4: 13 },
    strength: { P96: 19, P80: 16, P20: 13, P4: 9 },
    muscleEndurance: { P96: 15, P80: 14, P20: 10, P4: 8 },
    cardioEndurance: { P96: 13, P80: 11, P20: 9, P4: 6 },
    longEndurance180s: { P96: 9, P80: 9, P20: 6, P4: 4 },
    longEndurance300s: { P96: 8, P80: 7, P20: 5, P4: 3 }
  },
  
  "6_F": {
    power: { P96: 30, P80: 26, P20: 20, P4: 15 },
    strength: { P96: 22, P80: 20, P20: 15, P4: 11 },
    muscleEndurance: { P96: 18, P80: 16, P20: 12, P4: 9 },
    cardioEndurance: { P96: 15, P80: 14, P20: 10, P4: 8 },
    longEndurance180s: { P96: 11, P80: 10, P20: 8, P4: 5 },
    longEndurance300s: { P96: 9, P80: 9, P20: 6, P4: 4 }
  },
  
  "7_F": {
    power: { P96: 34, P80: 30, P20: 24, P4: 18 },
    strength: { P96: 26, P80: 22, P20: 18, P4: 14 },
    muscleEndurance: { P96: 20, P80: 19, P20: 14, P4: 11 },
    cardioEndurance: { P96: 18, P80: 16, P20: 12, P4: 9 },
    longEndurance180s: { P96: 14, P80: 12, P20: 9, P4: 7 },
    longEndurance300s: { P96: 11, P80: 10, P20: 8, P4: 5 }
  },
  
  "8_F": {
    power: { P96: 38, P80: 34, P20: 27, P4: 20 },
    strength: { P96: 29, P80: 26, P20: 20, P4: 15 },
    muscleEndurance: { P96: 23, P80: 20, P20: 16, P4: 13 },
    cardioEndurance: { P96: 20, P80: 18, P20: 14, P4: 11 },
    longEndurance180s: { P96: 15, P80: 14, P20: 11, P4: 8 },
    longEndurance300s: { P96: 13, P80: 12, P20: 9, P4: 7 }
  },
  
  "9_F": {
    power: { P96: 43, P80: 37, P20: 31, P4: 23 },
    strength: { P96: 31, P80: 28, P20: 23, P4: 17 },
    muscleEndurance: { P96: 26, P80: 23, P20: 19, P4: 14 },
    cardioEndurance: { P96: 23, P80: 20, P20: 16, P4: 13 },
    longEndurance180s: { P96: 17, P80: 15, P20: 13, P4: 9 },
    longEndurance300s: { P96: 14, P80: 13, P20: 10, P4: 8 }
  },
  
  "10_F": {
    power: { P96: 47, P80: 42, P20: 34, P4: 26 },
    strength: { P96: 35, P80: 31, P20: 26, P4: 20 },
    muscleEndurance: { P96: 28, P80: 26, P20: 20, P4: 16 },
    cardioEndurance: { P96: 26, P80: 23, P20: 19, P4: 14 },
    longEndurance180s: { P96: 19, P80: 17, P20: 14, P4: 10 },
    longEndurance300s: { P96: 16, P80: 14, P20: 12, P4: 9 }
  },
  
  "11_F": {
    power: { P96: 51, P80: 45, P20: 37, P4: 28 },
    strength: { P96: 38, P80: 34, P20: 28, P4: 21 },
    muscleEndurance: { P96: 31, P80: 27, P20: 23, P4: 18 },
    cardioEndurance: { P96: 28, P80: 25, P20: 20, P4: 16 },
    longEndurance180s: { P96: 21, P80: 19, P20: 15, P4: 12 },
    longEndurance300s: { P96: 18, P80: 16, P20: 13, P4: 10 }
  },
  
  "12_F": {
    power: { P96: 55, P80: 49, P20: 41, P4: 31 },
    strength: { P96: 42, P80: 37, P20: 31, P4: 23 },
    muscleEndurance: { P96: 33, P80: 30, P20: 25, P4: 20 },
    cardioEndurance: { P96: 31, P80: 27, P20: 22, P4: 18 },
    longEndurance180s: { P96: 23, P80: 20, P20: 17, P4: 13 },
    longEndurance300s: { P96: 20, P80: 18, P20: 14, P4: 11 }
  }
};
export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function calculateBMI(height: number, weight: number): number {
  const heightInMeters = height / 100;
  return weight / (heightInMeters * heightInMeters);
}

// 연령별 allometric 지수
export const AGE_EXPONENT = (age: number): number =>
  age <= 9 ? 0.75 : age <= 13 ? 0.72 : 0.67;

// 새로운 상대 파워 계산 (연령별 지수 적용)
export function calculateRelativePower(power: number, weight: number, age: number): number {
  return power / Math.pow(weight, AGE_EXPONENT(age));
}

export function getBalanceStatus(leftBalance: number, rightBalance: number): string {
  const difference = Math.abs(leftBalance - rightBalance);
  if (difference <= 5) return "이상적";
  if (difference <= 7) return "주의";
  return "경고";
}

// 새로운 5등급 시스템
export function getGrade(percentile: number): string {
  if (percentile >= 97) return "매우우수";
  if (percentile >= 85) return "우수";
  if (percentile >= 15) return "보통";
  if (percentile >= 3) return "부족";
  return "매우부족";
}

export function getGradeColor(percentile: number): string {
  if (percentile >= 97) return "purple";
  if (percentile >= 85) return "blue";
  if (percentile >= 15) return "green";
  if (percentile >= 3) return "yellow";
  return "red";
}

export function getGradeNumber(percentile: number): 1|2|3|4|5 {
  if (percentile >= 97) return 1;
  if (percentile >= 85) return 2;
  if (percentile >= 15) return 3;
  if (percentile >= 3) return 4;
  return 5;
}

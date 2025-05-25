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

export function calculateRelativePower(power: number, weight: number, exponent: number = 0.67): number {
  return power / Math.pow(weight, exponent);
}

export function getBalanceStatus(leftBalance: number, rightBalance: number): string {
  const difference = Math.abs(leftBalance - rightBalance);
  if (difference <= 5) return "이상적";
  if (difference <= 7) return "주의";
  return "경고";
}

export function getGrade(percentile: number): string {
  if (percentile >= 80) return "A급";
  if (percentile >= 60) return "B급";
  if (percentile >= 40) return "C급";
  return "D급";
}

export function getGradeColor(percentile: number): string {
  if (percentile >= 80) return "green";
  if (percentile >= 60) return "blue";
  if (percentile >= 40) return "yellow";
  return "orange";
}

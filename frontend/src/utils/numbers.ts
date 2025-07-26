export const calculatePercentage = (value: number, total: number) =>
  Math.min((value / total) * 100, 100);

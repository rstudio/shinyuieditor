// Roundabout way to avoid ugly machine-epsilon floating point numbers like
// 1.4999999999991
export const cleanNumber = (num: number) => Number(num.toFixed(4));

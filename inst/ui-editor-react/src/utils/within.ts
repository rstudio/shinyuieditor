export function within(x: number, a: number, b: number) {
  const low = a < b ? a : b;
  const high = a < b ? b : a;

  return x >= low && x <= high;
}

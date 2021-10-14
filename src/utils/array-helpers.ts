export const seqArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export function removeAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

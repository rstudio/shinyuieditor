export const seqArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export function removeAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function uniqueMatrixElements<ElementType>(
  mat: ElementType[][]
): ElementType[] {
  const seen = new Set<ElementType>();

  for (let row of mat) {
    for (let el of row) {
      seen.add(el);
    }
  }

  return [...seen];
}

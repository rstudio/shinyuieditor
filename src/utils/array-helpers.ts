export const seqArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export function arrayRange(
  arr: number[] | Set<number>
): { minVal: number; maxVal: number; span: number; isSequence: boolean } {
  let minVal: number = Infinity;
  let maxVal: number = -Infinity;

  for (let el of arr) {
    if (el < minVal) minVal = el;
    if (el > maxVal) maxVal = el;
  }

  const span = maxVal - minVal;
  const numEls = Array.isArray(arr) ? arr.length : arr.size;

  return { minVal, maxVal, span, isSequence: span === numEls - 1 };
}

export function subtractElements<T extends string | number>(
  arr: T[],
  toRemove: T[]
): T[] {
  return arr.filter((x) => !toRemove.includes(x));
}

export function removeAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export type Matrix<T> = T[][];

export function matrixDimensions<ElementType>(mat: Matrix<ElementType>) {
  const numRows = mat.length;
  const numCols = mat[0].length;

  // Make sure the matrix is properly formed
  for (let row of mat) {
    if (row.length !== numCols)
      throw new Error("Inconsistant number of columns in matrix");
  }

  return { numRows, numCols };
}
export function uniqueMatrixElements<ElementType>(
  mat: Matrix<ElementType>
): ElementType[] {
  const seen = new Set<ElementType>();

  for (let row of mat) {
    for (let el of row) {
      seen.add(el);
    }
  }

  return [...seen];
}

import clone from "just-clone";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { addAtIndex, removeAtIndex } from "./array-helpers";

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

export function insertRowOrCol<T>({
  mat,
  index,
  arr,
  dir,
}: {
  mat: Matrix<T>;
  index: number;
  dir: TractDirection;
  arr: T[];
}): Matrix<T> {
  const clonedMat = clone(mat);
  switch (dir) {
    case "rows":
      return addAtIndex(clonedMat, index, arr);
    case "cols":
      return clonedMat.map((row, rowIndex) =>
        addAtIndex(row, index, arr[rowIndex])
      );
  }
}

export function removeRowOrCol<T>({
  mat,
  index,
  dir,
}: {
  mat: Matrix<T>;
  index: number;
  dir: TractDirection;
}) {
  const clonedMat = clone(mat);
  switch (dir) {
    case "rows":
      return removeAtIndex(clonedMat, index);
    case "cols":
      return clonedMat.map((row, rowIndex) => removeAtIndex(row, index));
  }
}

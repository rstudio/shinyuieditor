export const seqArray = (
  length: number,
  opts?: { from: number; to: number }
): number[] => {
  return Array.from({ length }, (_, i) => i);
};

export const buildRange = (from: number, to: number): number[] => {
  const numEls = Math.abs(to - from) + 1;
  const step = from < to ? 1 : -1;
  return Array.from({ length: numEls }, (_, i) => from + i * step);
};

export function arrayRange(arr: number[] | Set<number>): {
  minVal: number;
  maxVal: number;
  span: number;
  isSequence: boolean;
} {
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

export function fillArr<T>(val: T, length: number): T[] {
  return [...new Array(length)].fill(val);
}

/**
 *
 * @param arr Array of elements that will be filtered
 * @param toRemove Array of elements to be removed from the first array
 * @returns A subset of arr with any elements in toRemove taken out
 */
export function subtractElements<T extends string | number>(
  arr: T[],
  toRemove: T[]
): T[] {
  return arr.filter((x) => !toRemove.includes(x));
}

/**
 *
 * @param A Array of elements
 * @param B Array of elements
 * @returns Subset of A that is not contained in B
 */
export function inANotInB<T extends string | number>(A: T[], B: T[]): T[] {
  return A.filter((x) => !B.includes(x));
}

export function removeAtIndex<T>(arr: T[], index: number): T[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}

export function addAtIndex<T>(arr: T[], index: number, val: T) {
  if (index < 0) {
    throw new Error("Can't add item at a negative index");
  }
  const newArr = [...arr];

  // Make sure that the array is long enough to have elements placed where desired
  if (index > newArr.length - 1) {
    newArr.length = index;
  }

  newArr.splice(index, 0, val);

  // If we try and do something like placing an element at index 2 where the
  // array only has 1 element, then we're get an undefined location, filter
  // these out to make function more robust

  return newArr;
}

/**
 *
 * @param arr Array to update. Note that any undefined elements will be removed by this
 * @param fromIndex Index of element in `arr`
 * @param toIndex Index to move element (will get placed _before_ element existing in that index)
 * @returns Updated array with element moved
 */
export function moveElement<T>(
  arr: T[],
  fromIndex: number,
  toIndex: number
): T[] {
  if (toIndex < 0) {
    throw new Error("Can't add item at a negative index");
  }

  // Make sure something actually exists at the index
  if (fromIndex < 0 || fromIndex > arr.length) {
    throw new Error("Requested to move an element that is not in array");
  }

  // First we remove the item being moved from the array and put a placeholder
  // within the array at its position. The palceholder is needed so the array
  // doesn't change shape when removing the item and thus the indices for moving
  // remain valid
  let newArr = [...arr] as (T | undefined)[];
  const movedElement = newArr[fromIndex];
  newArr[fromIndex] = undefined;

  // Now we add the element to the desired position
  newArr = addAtIndex(newArr, toIndex, movedElement);

  // Last we filter out the undefined element we added as a placeholder to finish
  return newArr.filter((el) => typeof el !== "undefined") as T[];
}

export function joinPretty(
  arr: string[],
  sep: string = ", ",
  finalSep: string = " and "
) {
  const n = arr.length;

  // Just a single item doesn't need separators
  if (n === 1) return arr[0];

  const lastItem = arr[n - 1];

  return [...arr].splice(0, n - 1).join(sep) + finalSep + lastItem;
}

export function removeDuplicates(arr: string[]): string[] {
  return [...new Set(arr)];
}

export function ensureArray<T>(x: T[] | T): T[] {
  if (Array.isArray(x)) return x;

  return [x];
}

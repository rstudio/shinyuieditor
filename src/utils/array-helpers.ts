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

export function fillArr<T>(val: T, length: number): T[] {
  return [...new Array(length)].fill(val);
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

export function addAtIndex<T>(arr: T[], index: number, val: T) {
  const newArr = [...arr];
  newArr.splice(index, 0, val);
  return newArr;
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

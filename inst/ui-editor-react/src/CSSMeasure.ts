export type CSSMeasure = `${number}${CSSUnits}` | "auto";
export type CSSUnits = "fr" | "px" | "rem" | "%";

const findMeasureRegex = /(^[\d|.])\s*(px|%|rem|fr)|(^auto$)/g;
export function isCSSMeasure(x: string): x is CSSMeasure {
  return findMeasureRegex.test(x);
}

import type { CSSMeasure, CSSUnits } from "../types";

export function parseCSSMeasure(measure: string): CSSMeasure {
  const parsedMeasure: CSSMeasure = {
    unit: (measure.match(/(px|\%|rem|fr|auto)/g)?.[0] || "px") as CSSUnits,
  };

  const parsedCount = measure.match(/^[\d|\.]*/g)?.[0];
  if (parsedCount) {
    parsedMeasure.count = Number(parsedCount);
  }

  return parsedMeasure;
}

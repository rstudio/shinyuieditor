import type { CSSMeasure, CSSUnits } from "../types";

type ParsedCSSMeasure = { count: number; unit: CSSUnits };
export function parseCSSMeasure(measure: string): ParsedCSSMeasure {
  const unit = (measure.match(/(px|\%|rem|fr|auto)/g)?.[0] || "px") as CSSUnits;

  const count = Number(measure.match(/^[\d|\.]*/g)?.[0]) || 1;

  return { count, unit };
}

export function sanatizeCSSMeasure(rawCSS: string) {
  return deparseCSSMeasure(parseCSSMeasure(rawCSS));
}

export function deparseCSSMeasure(parsed: ParsedCSSMeasure): CSSMeasure {
  return `${parsed.count}${parsed.unit}`;
}

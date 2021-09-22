import { CSSMeasure, CSSUnits } from "./GridTypes";

type ParsedCSSMeasure = { count: number; unit: CSSUnits };
export function parseCSSMeasure(measure: string): ParsedCSSMeasure {
  // eslint-disable-next-line no-useless-escape
  const unit = (measure.match(/(px|\%|rem|fr|auto)/g)?.[0] || "px") as CSSUnits;

  // eslint-disable-next-line no-useless-escape
  const count = Number(measure.match(/^[\d|\.]*/g)?.[0]) || 1;

  if (unit === "auto" && count !== null) {
    throw new Error("Cant have a count value for auto.");
  }

  return { count, unit };
}

export function sanatizeCSSMeasure(rawCSS: string) {
  return deparseCSSMeasure(parseCSSMeasure(rawCSS));
}

export function deparseCSSMeasure(parsed: ParsedCSSMeasure): CSSMeasure {
  return `${parsed.count}${parsed.unit}`;
}

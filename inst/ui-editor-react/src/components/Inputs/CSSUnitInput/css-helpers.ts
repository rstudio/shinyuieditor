import type { CSSMeasure, CSSUnits } from "CSSMeasure";

export type ParsedCSSMeasure =
  | { count: number; unit: CSSUnits }
  | { count: null; unit: "auto" };

export function parseCSSMeasure(measure: string): ParsedCSSMeasure {
  // eslint-disable-next-line no-useless-escape
  const unit = (measure.match(/(px|\%|rem|fr|auto)/g)?.[0] || "px") as
    | CSSUnits
    | "auto";

  // eslint-disable-next-line no-useless-escape
  const countMatch = measure.match(/^[\d|\.]*/g)?.[0];
  // If we didn't find a unit then just
  const count = !countMatch ? null : Number(countMatch);

  if (unit === "auto") {
    if (count !== null) {
      throw new Error("Cant have a count value with auto units.");
    }

    return { count: null, unit: "auto" };
  }

  if (count === null) {
    throw new Error("You must have a count for non-auto units.");
  }

  // Make sure that units that cant go below zero... dont go below zero
  if (unit === "fr" && count < 0) {
    throw new Error(`Can't have a negative count with ${unit} units.`);
  }

  return { count, unit };
}

export function deparseCSSMeasure(parsed: ParsedCSSMeasure): CSSMeasure {
  if (parsed.unit === "auto") return "auto";
  return `${parsed.count}${parsed.unit}`;
}

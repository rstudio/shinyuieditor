export type CSSMeasure = `${number}${CSSUnit}` | "auto";
export type CSSUnit = "fr" | "px" | "rem" | "%";

const findMeasureRegex = /(^[\d|.]+)\s*(px|%|rem|fr)|(^auto$)/;
export function isCSSMeasure(x: string): x is CSSMeasure {
  return findMeasureRegex.test(x);
}

type ParsedCSSMeasure =
  | { count: number; unit: CSSUnit }
  | { count: null; unit: "auto" };

const unitRegex = /(px|%|rem|fr|auto)/g;
const countRegex = /^[\d|.]*/g;

export function parseCSSMeasure(measure: string): ParsedCSSMeasure {
  const unit = (measure.match(unitRegex)?.[0] || "px") as CSSUnit | "auto";

  const countMatch = measure.match(countRegex)?.[0];
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

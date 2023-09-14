export type CSSMeasure = `${number}${CSSUnit}` | "auto";
export type CSSUnit = "fr" | "px" | "rem" | "%";
export type CSSUnitWAuto = CSSUnit | "auto";

// Regexes to detect css measures
// Detect a number at the start of a string. The number may also start with a negative symbol
const countRegex = /^-?[\d|.]*/g;
// Detect the units at the end of a string
const unitRegex = /(px|%|rem|fr|auto)/g;
// Detect a full measure
const findMeasureRegex = /(^-?[\d|.]+)\s*(px|%|rem|fr)|(^auto$)/;

export function isCSSMeasure(x: string): x is CSSMeasure {
  return findMeasureRegex.test(x);
}

/**
 * Information about the units that we use to render the input. This is used to
 * determine the default value for the input and the step size.
 * @param defaultCount The default value for the input
 * @param step The step size for the input
 * @param min The minimum value for the input
 * @param max The maximum value for the input
 */
export const infoForUnits: Record<
  CSSUnitWAuto,
  { defaultCount: number; step: number; min: number; max: number }
> = {
  fr: { defaultCount: 1, step: 0.1, min: 0, max: Infinity },
  px: { defaultCount: 10, step: 1, min: 0, max: 10000 },
  rem: { defaultCount: 1, step: 0.1, min: 0, max: 10000 },
  "%": { defaultCount: 1, step: 1, min: 0, max: 100 },
  auto: { defaultCount: 0, step: 1, min: 0, max: 0 },
};

export type ParsedCSSMeasure =
  | { count: number; unit: CSSUnit }
  | { count: null; unit: "auto" };

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

/**
 * Takes a count value and makes sure it fits within the allowed bounds for the given unit
 * @param count Count for current measure. If null, will return the default count for the unit
 * @param newUnit Unit for current measure
 * @returns The count value
 */
export function validateCountAfterUnitChange(
  count: number | null,
  newUnit: CSSUnitWAuto
): ParsedCSSMeasure {
  if (newUnit === "auto") {
    return { count: null, unit: "auto" };
  }

  const unitInfo = infoForUnits[newUnit];

  const validCount =
    count === null
      ? unitInfo.defaultCount
      : count < unitInfo.min
      ? unitInfo.min
      : count > unitInfo.max
      ? unitInfo.max
      : count;

  return { count: validCount, unit: newUnit };
}

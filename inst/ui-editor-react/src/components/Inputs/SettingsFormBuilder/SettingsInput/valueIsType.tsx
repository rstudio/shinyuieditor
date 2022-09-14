import { isCSSMeasure } from "CSSMeasure";
import { ArgTypesNames, PossibleArgTypes } from "../ArgumentInfo";

export function valueIsType(
  value: PossibleArgTypes,
  type: ArgTypesNames
): boolean {
  if (value === undefined) {
    return true;
  }

  if (type === "number") {
    return typeof value === "number";
  }

  if (type === "string") {
    return typeof value === "string";
  }

  if (type === "cssMeasure") {
    return isCSSMeasure(value as string);
  }

  if (type === "boolean") {
    return typeof value === "boolean";
  }

  throw new Error("Unimplemented argument type check", type);
}

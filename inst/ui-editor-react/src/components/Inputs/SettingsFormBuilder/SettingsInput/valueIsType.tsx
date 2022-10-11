import { isCSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import { isNamedList } from "components/Inputs/ListInput/NamedListInput";

import type {
  InputFieldEntryNames,
  KnownInputFieldTypes,
} from "../inputFieldTypes";

export function valueIsType(
  value: KnownInputFieldTypes | undefined,
  type: InputFieldEntryNames
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

  if (type === "list") {
    return isNamedList(value);
  }

  if (type === "dropdown") {
    return typeof value === "string";
  }

  if (type === "radio") {
    return typeof value === "string";
  }

  throw new Error("Unimplemented argument type check", type);
}

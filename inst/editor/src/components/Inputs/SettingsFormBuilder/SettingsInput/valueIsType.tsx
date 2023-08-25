import type {
  KnownInputFieldTypes,
  InputTypeNames,
} from "../../../../ui-node-definitions/inputFieldTypes";
import { isShinyUiNode } from "../../../../ui-node-definitions/isShinyUiNode";
import { isCSSMeasure } from "../../CSSUnitInput/CSSMeasure";
import { isNamedList } from "../../ListInput/NamedListInput";
// import type { InputTypeNames, KnownInputFieldTypes } from "../inputFieldTypes";

export function valueIsType(
  value: KnownInputFieldTypes | undefined,
  type: InputTypeNames
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

  if (type === "string-array") {
    return Array.isArray(value) && typeof value[0] === "string";
  }

  if (type === "ui-node") {
    return isShinyUiNode(value);
  }

  if (type === "omitted") {
    return true;
  }

  throw new Error("Unimplemented argument type check", type);
}

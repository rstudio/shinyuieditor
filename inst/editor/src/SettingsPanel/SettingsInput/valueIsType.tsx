import { isCSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { isNamedList } from "../../ui-node-definitions/code_generation/print_named_list";
import type {
  KnownInputFieldTypes,
  InputTypeNames,
} from "../../ui-node-definitions/inputFieldTypes";
import { isShinyUiNode } from "../../ui-node-definitions/utils/isShinyUiNode";

// import type { InputTypeNames, KnownInputFieldTypes } from "../inputFieldTypes";

export function valueIsType(
  value: KnownInputFieldTypes | undefined,
  type: InputTypeNames
): boolean {
  if (value === undefined) {
    return true;
  }

  if (type === "number") {
    return (
      typeof value === "number" ||
      // Number may be a negative number or something akin to that so we should try coercing it to a number
      (typeof value === "string" && !isNaN(Number(value)))
    );
  }

  if (type === "string" || type === "id") {
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

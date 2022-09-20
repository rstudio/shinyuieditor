import type { DynamicFieldInfoByType } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

export const outputIdInfo: DynamicFieldInfoByType["string"] = {
  label: "Output ID",
  inputType: "string",
  defaultValue: "outputId",
};

function makeStringInputInfo(
  label: string,
  defaultValue: string
): DynamicFieldInfoByType["string"] {
  return {
    label: label,
    inputType: "string",
    defaultValue: defaultValue,
  };
}

export function stringInput(
  args: Omit<DynamicFieldInfoByType["string"], "inputType">
): DynamicFieldInfoByType["string"] {
  return {
    inputType: "string",
    ...args,
  };
}

/**
 * Make info object for the common `outputId` argument
 * @param defaultValue Default value for `outputId` input
 * @returns String input info object with label of "Output ID" and provided
 * default value
 */
export function makeOutputIdInfo(
  defaultValue: string
): DynamicFieldInfoByType["string"] {
  return stringInput({
    label: "Output ID",
    defaultValue,
  });
}

/**
 * Make info object for the common `inputId` argument
 * @param defaultValue Default value for inputId input
 * @returns String input info object with label of "Input ID" and provided
 * default value
 */
export function makeInputIdInfo(
  defaultValue: string
): DynamicFieldInfoByType["string"] {
  return makeStringInputInfo("Input ID", defaultValue);
}

/**
 * Make info object for the common `label` argument
 * @param defaultValue Default value for label input
 * @returns String input info object with label of "Label text" and provided
 * default value
 */
export function makeLabelInputInfo(
  defaultValue: string
): DynamicFieldInfoByType["string"] {
  return makeStringInputInfo("Label text", defaultValue);
}

export const inputIdInfo: DynamicFieldInfoByType["string"] = {
  label: "Input ID",
  inputType: "string",
  defaultValue: "inputId",
};

function makeWidthInfo(
  optional: boolean
): DynamicFieldInfoByType["cssMeasure"] {
  return {
    inputType: "cssMeasure",
    label: "Width",
    defaultValue: "100%",
    units: ["%", "px", "rem"],
    ...(optional ? { optional: true } : {}),
  };
}

export const requiredWidthInfo: DynamicFieldInfoByType["cssMeasure"] =
  makeWidthInfo(true);

export const optionalWidthInfo: DynamicFieldInfoByType["cssMeasure"] =
  makeWidthInfo(false);

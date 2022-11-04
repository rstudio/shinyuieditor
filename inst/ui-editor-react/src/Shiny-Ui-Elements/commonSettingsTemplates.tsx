import type { DynamicFieldInfoByType } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

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

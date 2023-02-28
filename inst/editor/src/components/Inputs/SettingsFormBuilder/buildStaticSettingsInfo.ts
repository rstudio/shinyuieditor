import type { ShinyUiNode } from "../../../main";

import type {
  ArgsToDynamicInfo,
  ArgsToStaticInfo,
  DynamicFieldInfo,
  InputFieldEntryNames,
  InputTypeToDynamicInfo,
  InputTypeToStaticInfo,
  NodeToValueFn,
  StaticFieldInfo,
  UiArgumentsObject,
} from "./inputFieldTypes";

function isNodeToValueFn<T>(x: T | NodeToValueFn<T>): x is NodeToValueFn<T> {
  return typeof x === "function";
}

function getValueFromProperty<T>(
  x: T | NodeToValueFn<T>,
  node?: ShinyUiNode
): T {
  if (isNodeToValueFn(x)) {
    return x(node);
  }
  return x;
}

/**
 * Convert a single argument from dynamic form to static form
 * @param dynamicFieldInfo Argument info about an argument
 * @param node ShinyUiNode that represents the argument being converted belongs
 * to the settings/uiArguments of
 * @returns A static version of the argument info where the callback versions of
 * info have been evaluated to their output types
 */
export function buildStaticFieldInfo<InputType extends InputFieldEntryNames>(
  dynamicFieldInfo: InputTypeToDynamicInfo<InputType>,
  node?: ShinyUiNode
): InputTypeToStaticInfo<InputType> {
  let staticArgumentInfo: Record<string, any> = {};

  for (let prop in dynamicFieldInfo) {
    const dynamicVal = dynamicFieldInfo[prop as keyof DynamicFieldInfo];
    staticArgumentInfo[prop] = getValueFromProperty(dynamicVal, node);
  }

  return staticArgumentInfo as InputTypeToStaticInfo<InputType>;
}

/**
 * Convert a whole settings info object from dynamic callback form to static
 * form
 * @param dynamicFormInfo A full settings info object for all settings in a
 * ui nodes uiArguments object
 * @param node ShinyUiNode for which the dynamicSettingsInfo represents the
 * settings/uiArguments for
 * @returns A static version of the settings info for all arugments where
 * functions have been evaluated to their constant values
 */
export function buildStaticFormInfo<Args extends UiArgumentsObject>(
  dynamicFormInfo: ArgsToDynamicInfo<Args>,
  node?: ShinyUiNode
): ArgsToStaticInfo<Args> {
  let staticSettingsInfo: Record<string, StaticFieldInfo> = {};

  for (let argName in dynamicFormInfo) {
    const dynamicVal = dynamicFormInfo[argName];
    const inputType = dynamicVal.inputType;

    staticSettingsInfo[argName] = (
      inputType !== "omitted"
        ? buildStaticFieldInfo<typeof inputType>(
            dynamicVal as InputTypeToDynamicInfo<typeof inputType>,
            node
          )
        : dynamicVal
    ) as StaticFieldInfo;
  }

  return staticSettingsInfo as ArgsToStaticInfo<Args>;
}

/**
 * Convert a whole settings info object from dynamic callback form to static
 * form
 * @param dynamicFormInfo A full settings info object for all settings in a
 * ui nodes uiArguments object
 * @param node ShinyUiNode for which the dynamicSettingsInfo represents the
 * settings/uiArguments for
 * @returns A static version of the settings info for all arugments where
 * functions have been evaluated to their constant values
 */
export function getDefaultSettings<Args extends UiArgumentsObject>(
  dynamicFormInfo: ArgsToDynamicInfo<Args>,
  node?: ShinyUiNode
): Args {
  let defaultArgs: Record<string, any> = {};

  for (let argName in dynamicFormInfo) {
    const argInfo = dynamicFormInfo[argName];
    const isOptional = "optional" in argInfo;
    const forceDefault = "useDefaultIfOptional" in argInfo;
    if (
      argInfo.inputType !== "omitted" &&
      "defaultValue" in argInfo &&
      (forceDefault || !isOptional)
    ) {
      defaultArgs[argName] =
        typeof argInfo.defaultValue === "function"
          ? argInfo.defaultValue(node)
          : argInfo.defaultValue;
    }
  }

  return defaultArgs as Args;
}

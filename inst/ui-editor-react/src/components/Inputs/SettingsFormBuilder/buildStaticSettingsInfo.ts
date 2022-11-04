import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type {
  DynamicFieldInfoByType,
  FormInfo,
  NodeToValueFn,
  StaticFieldInfo,
  StaticFieldInfoByType,
  UiNodeSettingsInfo,
} from "./inputFieldTypes";

export type ToStaticFormInfo<DynSettings extends UiNodeSettingsInfo> = {
  [ArgName in keyof DynSettings]: StaticFieldInfoByType[DynSettings[ArgName]["inputType"]];
};

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
export function buildStaticFieldInfo<
  ArgType extends keyof DynamicFieldInfoByType
>(
  dynamicFieldInfo: DynamicFieldInfoByType[ArgType],
  node?: ShinyUiNode
): StaticFieldInfoByType[ArgType] {
  let staticArgumentInfo: Record<string, any> = {};

  for (let prop in dynamicFieldInfo) {
    const dynamicVal = dynamicFieldInfo[prop];
    staticArgumentInfo[prop] = getValueFromProperty(dynamicVal, node);
  }

  return staticArgumentInfo as StaticFieldInfoByType[ArgType];
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
export function buildStaticFormInfo<DynInfo extends UiNodeSettingsInfo>(
  dynamicFormInfo: DynInfo,
  node: ShinyUiNode
): FormInfo {
  let staticSettingsInfo: Record<string, StaticFieldInfo> = {};

  for (let argName in dynamicFormInfo) {
    const dynamicVal = dynamicFormInfo[argName];
    staticSettingsInfo[argName] = buildStaticFieldInfo(dynamicVal, node);
  }

  return staticSettingsInfo as FormInfo;
}

export type DefaultSettingsFromInfo<DynInfo extends UiNodeSettingsInfo> = {
  [ArgName in keyof DynInfo]: DynInfo[ArgName] extends { optional: true }
    ? never
    : DynInfo[ArgName]["defaultValue"];
  // : GetValueFromDynamicProp<DynInfo[ArgName]["defaultValue"]>;
};

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
export function getDefaultSettings<DynInfo extends UiNodeSettingsInfo>(
  dynamicFormInfo: DynInfo,
  node?: ShinyUiNode
): DefaultSettingsFromInfo<DynInfo> {
  let defaultArgs: Record<string, any> = {};

  for (let argName in dynamicFormInfo) {
    const argInfo = dynamicFormInfo[argName];

    const isOptional = "optional" in argInfo;
    const forceDefault =
      "useDefaultIfOptional" in argInfo && argInfo.useDefaultIfOptional;

    if (isOptional && !forceDefault) {
      continue;
    }

    if ("defaultValue" in argInfo) {
      defaultArgs[argName] = buildStaticFieldInfo(
        dynamicFormInfo[argName],
        node
      ).defaultValue;
    }
  }

  return defaultArgs as DefaultSettingsFromInfo<DynInfo>;
}

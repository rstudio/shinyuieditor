import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type {
  InputFieldTypesMap,
  InputFieldTypeNames,
} from "./inputFieldTypes";

type NodeToValueFn<T> = (node: ShinyUiNode) => T;

/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
export type ArgumentsOrCallbacks<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] | NodeToValueFn<Obj[Key]>;
};

type DynamicFieldInfoByType = {
  [ArgType in InputFieldTypeNames]: {
    inputType: ArgType;
    label?: string;
    optional?: true;
  } & ArgumentsOrCallbacks<
    {
      defaultValue: InputFieldTypesMap[ArgType]["value"];
    } & Omit<InputFieldTypesMap[ArgType], "inputType" | "value">
  >;
};
export type DynamicFieldInfo = DynamicFieldInfoByType[InputFieldTypeNames];
export type DynamicFormInfo = Record<string, DynamicFieldInfo>;

type StaticFieldInfoByType = {
  [ArgType in InputFieldTypeNames]: {
    inputType: ArgType;
    label?: string;
    optional?: true;
  } & {
    defaultValue: InputFieldTypesMap[ArgType]["value"];
  } & Omit<InputFieldTypesMap[ArgType], "inputType" | "value">;
};
export type StaticFieldInfo = StaticFieldInfoByType[InputFieldTypeNames];
export type StaticFormInfo = Record<string, StaticFieldInfo>;

type ToStaticFormInfo<DynSettings extends DynamicFormInfo> = {
  [ArgName in keyof DynSettings]: StaticFieldInfoByType[DynSettings[ArgName]["inputType"]];
};

function isNodeToValueFn<T>(x: T | NodeToValueFn<T>): x is NodeToValueFn<T> {
  return typeof x === "function";
}

function getValueFromProperty<T>(
  x: T | NodeToValueFn<T>,
  node: ShinyUiNode
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
export function buildStaticFieldInfo<ArgType extends InputFieldTypeNames>(
  dynamicFieldInfo: DynamicFieldInfoByType[ArgType],
  node: ShinyUiNode
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
export function buildStaticFormInfo<DynInfo extends DynamicFormInfo>(
  dynamicFormInfo: DynInfo,
  node: ShinyUiNode
): ToStaticFormInfo<DynInfo> {
  let staticSettingsInfo: Record<string, StaticFieldInfo> = {};

  for (let argName in dynamicFormInfo) {
    const dynamicVal = dynamicFormInfo[argName];
    staticSettingsInfo[argName] = buildStaticFieldInfo(dynamicVal, node);
  }

  return staticSettingsInfo as ToStaticFormInfo<DynInfo>;
}

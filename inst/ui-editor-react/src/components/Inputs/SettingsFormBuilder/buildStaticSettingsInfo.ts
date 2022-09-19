import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import type { MapDiscriminatedUnion } from "TypescriptUtils";

import type { ArgTypesNames, ArgumentTypeUnion } from "./ArgumentInfo";

export type ArgTypesMap = MapDiscriminatedUnion<ArgumentTypeUnion, "inputType">;

type NodeToValueFn<T> = (node: ShinyUiNode) => T;

/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
export type ArgumentsOrCallbacks<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] | NodeToValueFn<Obj[Key]>;
};

export type DynamicArgumentInfoByType = {
  [ArgType in ArgTypesNames]: {
    inputType: ArgType;
    label?: string;
    optional?: true;
  } & ArgumentsOrCallbacks<
    {
      defaultValue: ArgTypesMap[ArgType]["value"];
    } & Omit<ArgTypesMap[ArgType], "inputType" | "value">
  >;
};
export type DynamicArgumentInfo = DynamicArgumentInfoByType[ArgTypesNames];
export type DynamicSettingsInfo = Record<string, DynamicArgumentInfo>;

type StaticArgumentInfoByType = {
  [ArgType in ArgTypesNames]: {
    inputType: ArgType;
    label?: string;
    optional?: true;
  } & {
    defaultValue: ArgTypesMap[ArgType]["value"];
  } & Omit<ArgTypesMap[ArgType], "inputType" | "value">;
};
export type StaticArgumentInfo = StaticArgumentInfoByType[ArgTypesNames];
export type StaticSettingsInfo = Record<string, StaticArgumentInfo>;

type ToStaticSettingsInfo<DynSettings extends DynamicSettingsInfo> = {
  [ArgName in keyof DynSettings]: StaticArgumentInfoByType[DynSettings[ArgName]["inputType"]];
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
 * @param dynamicArgumentInfo Argument info about an argument
 * @param node ShinyUiNode that represents the argument being converted belongs
 * to the settings/uiArguments of
 * @returns A static version of the argument info where the callback versions of
 * info have been evaluated to their output types
 */
export function buildStaticArgumentInfo<ArgType extends ArgTypesNames>(
  dynamicArgumentInfo: DynamicArgumentInfoByType[ArgType],
  node: ShinyUiNode
): StaticArgumentInfoByType[ArgType] {
  let staticArgumentInfo: Record<string, any> = {};

  for (let prop in dynamicArgumentInfo) {
    const dynamicVal = dynamicArgumentInfo[prop];
    staticArgumentInfo[prop] = getValueFromProperty(dynamicVal, node);
  }

  return staticArgumentInfo as StaticArgumentInfoByType[ArgType];
}

/**
 * Convert a whole settings info object from dynamic callback form to static
 * form
 * @param dynamicSettingsInfo A full settings info object for all settings in a
 * ui nodes uiArguments object
 * @param node ShinyUiNode for which the dynamicSettingsInfo represents the
 * settings/uiArguments for
 * @returns A static version of the settings info for all arugments where
 * functions have been evaluated to their constant values
 */
export function buildStaticSettingsInfo<DynInfo extends DynamicSettingsInfo>(
  dynamicSettingsInfo: DynInfo,
  node: ShinyUiNode
): ToStaticSettingsInfo<DynInfo> {
  let staticSettingsInfo: Record<string, StaticArgumentInfo> = {};

  for (let argName in dynamicSettingsInfo) {
    const dynamicVal = dynamicSettingsInfo[argName];
    staticSettingsInfo[argName] = buildStaticArgumentInfo(dynamicVal, node);
  }

  return staticSettingsInfo as ToStaticSettingsInfo<DynInfo>;
}

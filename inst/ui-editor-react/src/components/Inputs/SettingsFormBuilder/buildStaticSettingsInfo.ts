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

export function buildStaticSettingsInfo<ArgType extends ArgTypesNames>(
  dynamicSettingsInfo: DynamicArgumentInfoByType[ArgType],
  node: ShinyUiNode
): StaticArgumentInfoByType[ArgType] {
  let staticInfo: Record<string, any> = {};

  for (let prop in dynamicSettingsInfo) {
    const dynamicVal = dynamicSettingsInfo[prop];
    staticInfo[prop] = getValueFromProperty(dynamicVal, node);
  }

  return staticInfo as StaticArgumentInfoByType[ArgType];
}

// type DynamicArgumentInfo = ArgumentsOrCallbacks<ArgumentInfo, NonDynamicProps>;

// // type ToDynamicSettingsInfo<Info extends SettingsInfo> = {
// //   [ArgName in keyof Info]: ArgumentsOrCallbacks<Info[ArgName], NonDynamicProps>;
// type StaticArgumentInfo = StaticArgumentInfoByType[ArgTypesNames];
// // };

// export type DynamicSettingsInfo = Record<string, DynamicArgumentInfo>;

// const test: DynamicArgumentInfo = {
//     inputType: "optionsDropdown",
//     label: "My List",
//     defaultValue: (node) => "first value",
//     choices: ["a", "b", "c"],
//   };

//   const test2: StaticArgumentInfo = {
//     inputType: "optionsDropdown",
//     label: "My List",
//     choices: ["a", "b", "c"],
//     defaultValue: "first value",
//   };

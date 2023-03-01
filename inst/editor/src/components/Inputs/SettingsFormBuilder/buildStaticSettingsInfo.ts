import type { ShinyUiNode } from "../../../main";

import type {
  InfoFromArgs,
  NodeToValueFn,
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
 * Convert a whole settings info object from dynamic callback form to static
 * form
 * @param inputInfoForArgs A full settings info object for all settings in a
 * ui nodes uiArguments object
 * @param node ShinyUiNode for which the dynamicSettingsInfo represents the
 * settings/uiArguments for
 * @returns A static version of the settings info for all arugments where
 * functions have been evaluated to their constant values
 */
export function buildStaticFormInfo<Args extends UiArgumentsObject>(
  inputInfoForArgs: InfoFromArgs<Args, { dynamic: true }>,
  node?: ShinyUiNode
): InfoFromArgs<Args, { dynamic: false }> {
  let staticSettingsInfo: Record<string, Record<string, unknown>> = {};

  for (let arg_name in inputInfoForArgs) {
    const { inputType, ...info_for_arg } = inputInfoForArgs[arg_name];

    staticSettingsInfo[arg_name] = { inputType };

    Object.entries(info_for_arg).forEach(([prop, dynamicVal]) => {
      staticSettingsInfo[arg_name][prop] = getValueFromProperty(
        dynamicVal,
        node
      );
    });
  }

  return staticSettingsInfo as InfoFromArgs<Args, { dynamic: false }>;
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
  dynamicFormInfo: InfoFromArgs<Args, { dynamic: true }>,
  node?: ShinyUiNode
): Args {
  let defaultArgs: Partial<Args> = {};

  for (let argName in dynamicFormInfo) {
    const argInfo = dynamicFormInfo[argName];
    const notOptional = !("optional" in argInfo);
    const forceDefaultIfOptional = "useDefaultIfOptional" in argInfo;

    if (notOptional || forceDefaultIfOptional) {
      defaultArgs[argName] =
        typeof argInfo.defaultValue === "function"
          ? argInfo.defaultValue(node)
          : argInfo.defaultValue;
    }
  }

  return defaultArgs as Args;
}

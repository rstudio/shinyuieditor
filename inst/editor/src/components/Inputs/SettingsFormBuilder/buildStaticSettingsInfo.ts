import type { Expand } from "util-functions/src/TypescriptUtils";

import type { ShinyUiNode } from "../../../main";

import type {
  InputOptions,
  MakeDynamicArguments,
  MakeOmittedOption,
  StaticInputOptions,
  StaticInputOptionsByInputType,
} from "./inputFieldTypes";

type ConvertToStatic<ArgsInfo extends Record<string, Record<string, unknown>>> =
  {
    [ArgName in keyof ArgsInfo]: MakeStaticArguments<ArgsInfo[ArgName]>;
  };

type MakeStaticArguments<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: Obj[Key] extends
    | infer Val
    | ((node: ShinyUiNode) => infer Val)
    ? Val
    : Obj[Key];
};

type AllStaticOptions =
  | (StaticInputOptionsByInputType[keyof StaticInputOptionsByInputType] & {
      optional?: true;
    })
  | ({ inputType: "omitted" } & (
      | { defaultValue: unknown }
      | { defaultValue?: unknown; optional: true }
    ));

export type AllDynamicOptions = {
  [StaticOption in AllStaticOptions as StaticOption["inputType"]]: MakeDynamicArguments<StaticOption>;
}[AllStaticOptions["inputType"]];

export type DynamicArgumentInfo = Record<string, AllDynamicOptions>;

type ArgsFromInfo<Info extends DynamicArgumentInfo> = {
  [Key in __RequiredArgKeys<Info>]: __ArgFromInfo<Info[Key]>;
} & {
  [Key in __OptionalArgKeys<Info>]?: __ArgFromInfo<Info[Key]>;
};

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
export function buildStaticFormInfo<DynArgs extends DynamicArgumentInfo>(
  dynamic_args: DynArgs,
  node?: {
    uiArguments: ArgsFromInfo<DynArgs>;
    uiChildren?: ShinyUiNode[];
  }
): ConvertToStatic<DynArgs> {
  const static_args: Record<string, unknown> = {};

  for (const arg_key in dynamic_args) {
    static_args[arg_key] = convert_dynamic_info_to_static(
      dynamic_args[arg_key],
      node
    );
  }

  return static_args as ConvertToStatic<DynArgs>;
}

function convert_dynamic_info_to_static<
  DynInfo extends AllDynamicOptions,
  UiNode
>(dyn_info: DynInfo, node?: UiNode): MakeStaticArguments<DynInfo> {
  const info_copy = { ...dyn_info };

  for (const key in info_copy) {
    const info_value = info_copy[key];

    if (typeof info_value === "function") {
      info_copy[key] = info_value(node);
    }
  }

  return info_copy as MakeStaticArguments<DynInfo>;
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
export function getDefaultSettings<DynArgs extends DynamicArgumentInfo>(
  dynamic_args: DynArgs
): ArgsFromInfo<DynArgs> {
  const static_args: Record<string, unknown> = {};

  for (const arg_key in dynamic_args) {
    const info_for_arg = dynamic_args[arg_key];

    if ("defaultValue" in info_for_arg) {
      const default_value_field = info_for_arg["defaultValue"];

      static_args[arg_key] =
        typeof default_value_field === "function"
          ? default_value_field()
          : default_value_field;
    }
  }

  return static_args as ArgsFromInfo<DynArgs>;
}

// Helper types

type __DynamicInputOptions = Expand<
  {
    [StaticOptions in StaticInputOptions as StaticOptions["inputType"]]: MakeOmittedOption<
      MakeDynamicArguments<StaticOptions>
    >;
  }[InputOptions["inputType"]]
>;

type __ArgFromInfo<Info extends __DynamicInputOptions> = __GetArgType<
  Info["defaultValue"]
>;
type __OptionalArgKeys<Info extends DynamicArgumentInfo> = {
  [K in keyof Info]: Info[K] extends { optional: true } ? K : never;
}[keyof Info];
type __RequiredArgKeys<Info extends DynamicArgumentInfo> = {
  [K in keyof Info]: Info[K] extends { optional: true } ? never : K;
}[keyof Info];
type __GetArgType<TArg> = TArg extends (...args: any[]) => infer TRet
  ? TRet
  : TArg;

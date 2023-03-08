import type { Expand } from "util-functions/src/TypescriptUtils";

import type { ShinyUiNode } from "../../../main";
import type { UiArgumentsObject } from "../../../Shiny-Ui-Elements/uiNodeTypes";
import type { CSSMeasure, CSSUnitWAuto } from "../CSSUnitInput/CSSMeasure";
import type { NamedList } from "../ListInput/NamedListInput";
import type {
  RadioOption,
  RadioOptions,
} from "../RadioInputs/RadioInputsSimple";

export type InputOptions =
  | { inputType: "string"; value: string; longform?: boolean }
  | {
      inputType: "number";
      value: number;
      // Currently not used at all
      min?: number;
      max?: number;
    }
  | { inputType: "cssMeasure"; value: CSSMeasure; units?: CSSUnitWAuto[] }
  | { inputType: "boolean"; value: boolean }
  | {
      inputType: "list";
      value: NamedList;
      newItemValue?: { key: string; value: string };
    }
  | { inputType: "dropdown"; value: string; choices: string[] }
  | {
      inputType: "radio";
      value: RadioOption;
      choices: RadioOptions;
      optionsPerColumn?: number;
    }
  | {
      inputType: "string-array";
      value: string[];
    };

type ArgTypeToInputType<Arg extends unknown> = Arg extends number
  ? "number"
  : Arg extends CSSMeasure
  ? "cssMeasure"
  : Arg extends string
  ? "string" | "dropdown" | "radio"
  : Arg extends boolean
  ? "boolean"
  : Arg extends NamedList
  ? "list"
  : Arg extends string[]
  ? "string-array"
  : "omitted";

export type InputTypeNames = InputOptions["inputType"];
export type KnownInputFieldTypes = InputOptions["value"];

export type StaticInputOptionsByInputType = Expand<{
  [Input in InputOptions as Input["inputType"]]: {
    [Key in keyof Input as Key extends "value"
      ? "defaultValue"
      : Key]: Input[Key];
  } & {
    /** Should the default value be given to a new instance of a settings object
     * if that field is optional?  */
    useDefaultIfOptional?: true;
    /** What should the label be above the input for this field? */
    label?: string;
  };
}>;

type AddOptionalCase<Obj extends { defaultValue: unknown }> =
  | Obj
  | (Omit<Obj, "defaultValue"> & {
      defaultValue?: Obj["defaultValue"];
      optional: true;
    });

export type StaticInputOptions = AddOptionalCase<
  | StaticInputOptionsByInputType[InputOptions["inputType"]]
  | { inputType: "omitted"; defaultValue: unknown }
>;

type KeysOfKnownArgs<Args extends Record<string, unknown>> = {
  [Key in keyof Args]-?: Required<Args>[Key] extends KnownInputFieldTypes
    ? Key
    : never;
}[keyof Args];

type KeysOfUnknownArgs<Args extends Record<string, unknown>> = {
  [Key in keyof Args]-?: Required<Args>[Key] extends KnownInputFieldTypes
    ? never
    : Key;
}[keyof Args];

export type ArgsToStaticInfo<Args extends UiArgumentsObject> = {
  [Key in KeysOfKnownArgs<Args>]: MakeOmittedOption<
    Extract<
      StaticInputOptions,
      { inputType: ArgTypeToInputType<Exclude<Args[Key], undefined>> }
    > &
      (undefined extends Args[Key] ? { optional: true } : {})
  >;
} & {
  [Key in KeysOfUnknownArgs<Args>]: {
    inputType: "omitted";
  } & (undefined extends Args[Key]
    ? { defaultValue?: Args[Key]; optional: true }
    : { defaultValue: Args[Key] });
};

export type MakeOmittedOption<Options extends Record<string, unknown>> =
  | Options
  | ({ inputType: "omitted" } & (Options["optional"] extends true
      ? { optional: true; defaultValue?: Options["value"] }
      : { defaultValue: Options["value"] }));

/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
type NonDynamicArgs =
  | "inputType"
  | "useDefaultIfOptional"
  | "label"
  | "optional";

export type MakeDynamicArguments<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: Key extends NonDynamicArgs
    ? Obj[Key]
    : Obj[Key] | ((node?: ShinyUiNode) => Obj[Key]);
};

export type ArgsToDynamicInfo<Args extends UiArgumentsObject> = Expand<
  ConvertToDynamic<ArgsToStaticInfo<Args>>
>;
type ConvertToDynamic<
  ArgsInfo extends Record<string, Record<string, unknown>>
> = {
  [ArgName in keyof ArgsInfo]: MakeDynamicArguments<ArgsInfo[ArgName]>;
};

export type InputComponentByType<InputType extends InputTypeNames> = {
  id: string;
  label: string;
  onChange: (
    value: Extract<InputOptions, { inputType: InputType }>["value"]
  ) => void;
} & Omit<Extract<InputOptions, { inputType: InputType }>, "inputType">;

export function makeLabelId(id: string) {
  return id + "-label";
}

// Where we use arg info object
// 1. Generate default settings: arg_info => args
// 2. Generate static values to feed into form builder: arg_info => static_arg_info
// 3. Get out of form builder a new instance of args: static_arg_info => args

import type { Expand } from "util-functions/src/TypescriptUtils";

import type { ShinyUiNode, namedArgsObject } from "./uiNodeTypes";

export type CSSMeasure = `${number}${CSSUnit}` | "auto";
export type CSSUnit = "fr" | "px" | "rem" | "%";
export type CSSUnitWAuto = CSSUnit | "auto";

type NamedList = Record<string, string>;

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
      value: string;
      choices: Record<
        string,
        { icon: JSX.Element | string; label?: string } | { label: string }
      >;
      optionsPerColumn?: number;
    }
  | {
      inputType: "string-array";
      value: string[];
    }
  | {
      inputType: "ui-node";
      value: ShinyUiNode;
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
  : Arg extends ShinyUiNode
  ? "ui-node"
  : "omitted";

export type InputTypeNames = InputOptions["inputType"];
export type KnownInputFieldTypes = InputOptions["value"];

/** Fields that are appended to every argument option regardless of type.  */
type Common_Static_Fields = {
  /** What should the label be above the input for this field? */
  label?: string;

  /** Optional mapping for printing the name of the argument in python code */
  py_name?: string;

  /**
   * If the argument is a requir ed argument in python, then this controls the
   * order at which it is called in the function. Try to avoid duplicating these
   * indices. Because these arguments are passed positionally, then they do not
   * have names prepended to them.
   */
  py_positional_index?: number;

  /** Optional mapping for printing the name of the argument in R code */
  r_name?: string;
};

export type StaticInputOptionsByInputType = Expand<{
  [Input in InputOptions as Input["inputType"]]: {
    [Key in keyof Input as Key extends "value"
      ? "defaultValue"
      : Key]: Input[Key];
  } & {
    /** Should the default value be given to a new instance of a settings object
     * if that field is optional?  */
    useDefaultIfOptional?: true;
  } & Common_Static_Fields;
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

/**
 * Every input type including ommitted and ui nodes
 */
export type All_Input_Types = StaticInputOptions["inputType"];

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

export type ArgsToStaticInfo<Args extends namedArgsObject> = {
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

type CommonStaticFieldNames = keyof Common_Static_Fields;
/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
type NonDynamicArgs =
  | "inputType"
  | "useDefaultIfOptional"
  | "label"
  | "optional"
  | CommonStaticFieldNames;

export type MakeDynamicArguments<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: Key extends NonDynamicArgs
    ? Obj[Key]
    : Obj[Key] | ((node?: ShinyUiNode) => Obj[Key]);
};

export type ArgsToDynamicInfo<Args extends namedArgsObject> = Expand<
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

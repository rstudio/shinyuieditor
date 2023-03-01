import type { ShinyUiNode } from "../../../main";
import type { CSSMeasure, CSSUnitWAuto } from "../CSSUnitInput/CSSMeasure";
import type { NamedList } from "../ListInput/NamedListInput";
import type {
  RadioOption,
  RadioOptions,
} from "../RadioInputs/RadioInputsSimple";

type InputOptionsByTypeNoOmitted = {
  string: {
    value: string;
    longform?: boolean;
  };
  number: {
    value: number;
    // Currently not used at all
    min?: number;
    max?: number;
  };
  cssMeasure: {
    value: CSSMeasure;
    units?: CSSUnitWAuto[];
  };
  boolean: {
    value: boolean;
  };
  list: {
    value: NamedList;
    newItemValue?: { key: string; value: string };
  };
  dropdown: {
    value: string;
    choices: string[];
  };
  radio: {
    value: RadioOption;
    choices: RadioOptions;
    optionsPerColumn?: number;
  };
  "string-array": {
    value: string[];
  };
};

type InputOptionsByType = InputOptionsByTypeNoOmitted & {
  omitted: {
    value: unknown;
  };
};

export type KnownInputTypeNames = keyof InputOptionsByTypeNoOmitted;
export type InputTypeNames = keyof InputOptionsByType;

export type InputInfoUnion = {
  [InputType in InputTypeNames]: {
    inputType: InputType;
  } & InputOptionsByType[InputType];
}[InputTypeNames];

export type KnownInputFieldTypes = {
  [InputType in keyof InputOptionsByTypeNoOmitted]: InputOptionsByTypeNoOmitted[InputType]["value"];
}[keyof InputOptionsByTypeNoOmitted];

/** Format of a valid ui arguments object */
export type UiArgumentsObject = Record<string, InputInfoUnion["value"]>;

/**
 * Convert directly from a argument type (e.g. string or boolean) to the
 * inputTypes that are allowed for that type
 */
type ArgTypeToTypeString<ArgType extends unknown> =
  | (ArgType extends CSSMeasure
      ? "cssMeasure"
      : ArgType extends string
      ? "string" | "dropdown" | "radio"
      : ArgType extends number
      ? "number"
      : ArgType extends Record<string, string>
      ? "list"
      : ArgType extends boolean
      ? "boolean"
      : ArgType extends string[]
      ? "string-array"
      : never)
  | "omitted";

type DynamicSetting = { dynamic: boolean };

type AddFullInfo<
  BaseInfo extends InputOptionsByType[InputTypeNames],
  Opts extends DynamicSetting
> = {
  defaultValue: Opts["dynamic"] extends true
    ? DynamicArg<BaseInfo["value"]>
    : BaseInfo["value"];
  /** Should the default value be given to a new instance of a settings object
   * if that field is optional?  */
  useDefaultIfOptional?: true;
  /** What should the label be above the input for this field? */
  label?: string;
} & (Opts["dynamic"] extends true
  ? DynamicArguments<Omit<BaseInfo, "value">>
  : Omit<BaseInfo, "value">);

/**
 * Go from named input type (e.g. "dropdown" or "radio") to the info object for its corresponding settings input
 */
export type InputTypeToInfo<Opts extends DynamicSetting> = {
  [InputType in KnownInputTypeNames]: {
    inputType: InputType;
  } & AddFullInfo<InputOptionsByType[InputType], Opts>;
} & { omitted: { inputType: "omitted" } & Record<string, unknown> };

/**
 * Go from argument type to the info object for its corresponding settings input
 */
type ArgTypeToInfo<
  ArgType extends unknown,
  Opts extends DynamicSetting
> = InputTypeToInfo<Opts>[ArgTypeToTypeString<ArgType>];

// const test3 = {inputType: "omitted", defaultValue: new Date()} satisfies ArgTypeToInfo<Date, { dynamic: false }>;

// type test4 = ArgTypeToInfo<Date, { dynamic: true }>["de"];
export type InfoFromArgs<
  Args extends UiArgumentsObject,
  Opts extends DynamicSetting
> = {
  [Key in keyof Args]: ArgTypeToInfo<Required<Args>[Key], Opts> &
    (undefined extends Args[Key] ? { optional: true } : {});
};

export type DynamicInfoFromArgs<Args extends UiArgumentsObject> = InfoFromArgs<
  Args,
  { dynamic: true }
>;

type DynamicArg<Val extends unknown> = Val | NodeToValueFn<Val>;
/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
type DynamicArguments<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: DynamicArg<Obj[Key]>;
};
export type NodeToValueFn<T> = (node?: ShinyUiNode) => T;

export type InputComponentByType<InputType extends InputTypeNames> = {
  id: string;
  label: string;
  value: InputOptionsByType[InputType]["value"];
  onChange: (value: InputOptionsByType[InputType]["value"]) => void;
} & Omit<InputOptionsByType[InputType], "value">;

export function makeLabelId(id: string) {
  return id + "-label";
}

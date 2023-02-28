import type { ShinyUiNode } from "../../../main";
import type { MapDiscriminatedUnion } from "../../../utils/TypescriptUtils";
import type { CSSMeasure, CSSUnitWAuto } from "../CSSUnitInput/CSSMeasure";
import type { NamedList } from "../ListInput/NamedListInput";
import type {
  RadioOption,
  RadioOptions,
} from "../RadioInputs/RadioInputsSimple";

export type FieldEntryUnion =
  | {
      inputType: "string";
      value: string;
      longform?: boolean;
    }
  | {
      inputType: "number";
      value: number;
      // Currently not used at all
      min?: number;
      max?: number;
    }
  | {
      inputType: "cssMeasure";
      value: CSSMeasure;
      units?: CSSUnitWAuto[];
    }
  | { inputType: "boolean"; value: boolean }
  | {
      inputType: "list";
      value: NamedList;
      newItemValue?: { key: string; value: string };
    }
  | {
      inputType: "dropdown";
      value: string;
      choices: string[];
    }
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

/** All possible input type names */
export type InputFieldEntryNames = FieldEntryUnion["inputType"];

/** All possible input types */
export type KnownInputFieldTypes = FieldEntryUnion["value"];

/** Format of a valid ui arguments object */
export type UiArgumentsObject = Record<string, KnownInputFieldTypes | unknown>;

/**
 * Go from input type (e.g. "string" or "radio") to the arguments needed for
 * that input type
 */
export type InputFieldEntryMap = MapDiscriminatedUnion<
  FieldEntryUnion,
  "inputType"
>;

type InputFieldInfoMap = {
  [Key in keyof InputFieldEntryMap]: {
    defaultValue: InputFieldEntryMap[Key]["value"];
  } & Omit<InputFieldEntryMap[Key], "inputType" | "value">;
};

/**
 * Convert directly from a argument type (e.g. string or boolean) to the
 * inputTypes that are allowed for that type
 */
type ArgTypeToTypeString<ArgType extends KnownInputFieldTypes> =
  ArgType extends CSSMeasure
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
    : never;

/** Options object for generic functions to either enable or disable dynamic fields */
type InfoOptions = { dynamic: boolean };

/**
 * Convert from a basic settings object to a settings info object
 */
type ArgsToInfo<Args extends UiArgumentsObject, Opts extends InfoOptions> = {
  [key in keyof Args]-?:
    | (Required<Args>[key] extends KnownInputFieldTypes
        ? undefined extends Args[key]
          ? ArgTypeToInfo<Required<Args>[key], Opts & { optional: true }>
          : ArgTypeToInfo<Required<Args>[key], Opts & { optional: false }>
        : OmittedArg)
    | OmittedArg;
};

type OmittedArg = {
  inputType: "omitted";
  defaultValue?: unknown;
};

export type ArgsToDynamicInfo<Args extends UiArgumentsObject> = ArgsToInfo<
  Args,
  { dynamic: true }
>;
export type ArgsToStaticInfo<Args extends UiArgumentsObject> = ArgsToInfo<
  Args,
  { dynamic: false }
>;

type IndividualArgInfoOptions = InfoOptions & { optional: boolean };

type InputTypeToInfo<
  InputType extends InputFieldEntryNames,
  Opts extends IndividualArgInfoOptions
> = {
  inputType: InputType;
  /** Should the default value be given to a new instance of a settings object
   * if that field is optional?  */
  useDefaultIfOptional?: true;
  /** What should the label be above the input for this field? */
  label?: string;
} & (Opts["dynamic"] extends true
  ? DynamicArguments<InputFieldInfoMap[InputType]>
  : InputFieldInfoMap[InputType]) &
  (Opts["optional"] extends true ? { optional: true } : {});

/**
 * Go from argument type to the info object for its corresponding settings input
 */
type ArgTypeToInfo<
  ArgType extends KnownInputFieldTypes,
  Opts extends IndividualArgInfoOptions
> = InputTypeToInfo<ArgTypeToTypeString<ArgType>, Opts>;

export type InputTypeToDynamicInfo<InputType extends InputFieldEntryNames> =
  InputTypeToInfo<InputType, { dynamic: true; optional: false }>;

export type DynamicFieldInfo =
  | InputTypeToDynamicInfo<InputFieldEntryNames>
  | OmittedArg;

export type InputTypeToStaticInfo<InputType extends InputFieldEntryNames> =
  InputTypeToInfo<InputType, { dynamic: false; optional: false }>;

export type StaticFieldInfo =
  | InputTypeToStaticInfo<InputFieldEntryNames>
  | OmittedArg;

/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
type DynamicArguments<Obj extends Record<string, unknown>> = {
  [Key in keyof Obj]: Obj[Key] | NodeToValueFn<Obj[Key]>;
};
export type NodeToValueFn<T> = (node?: ShinyUiNode) => T;

export type InputComponentByType<InputType extends keyof InputFieldEntryMap> = {
  id: string;
  label: string;
  value: InputFieldEntryMap[InputType]["value"];
  onChange: (value: InputFieldEntryMap[InputType]["value"]) => void;
} & Omit<InputFieldEntryMap[InputType], "inputType" | "value">;

export function makeLabelId(id: string) {
  return id + "-label";
}

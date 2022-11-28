import type { ShinyUiNode } from "../../../main";
import type { MapDiscriminatedUnion } from "../../../TypescriptUtils";
import type { CSSMeasure, CSSUnit } from "../CSSUnitInput/CSSMeasure";
import type { NamedList } from "../ListInput/NamedListInput";
import type { DropdownOption } from "../OptionsDropdown/DropdownSelect";
import type {
  RadioOption,
  RadioOptions,
} from "../RadioInputs/RadioInputsSimple";

export type FieldEntryUnion =
  | {
      inputType: "string";
      value: string;
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
      units?: CSSUnit[];
    }
  | { inputType: "boolean"; value: boolean }
  | {
      inputType: "list";
      value: NamedList;
      newItemValue?: { key: string; value: string };
    }
  | {
      inputType: "dropdown";
      value: DropdownOption;
      choices: DropdownOption[];
    }
  | {
      inputType: "radio";
      value: RadioOption;
      choices: RadioOptions;
    };

export type InputFieldEntryNames = FieldEntryUnion["inputType"];
export type KnownInputFieldTypes = FieldEntryUnion["value"];

export type InputFieldEntryMap = MapDiscriminatedUnion<
  FieldEntryUnion,
  "inputType"
>;

export type NodeToValueFn<T> = (node?: ShinyUiNode) => T;

type DynamicValueType<T> = T | NodeToValueFn<T>;
/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
type ArgumentsOrCallbacks<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: DynamicValueType<Obj[Key]>;
};

type OmittedFieldStatic = { inputType: "omitted"; defaultValue: any };
type OmittedFieldDynamic = {
  inputType: "omitted";
  defaultValue: DynamicValueType<any>;
};

/**
 * Fields available in static field info
 */
type StaticFieldInfoGeneric<ArgType extends InputFieldEntryNames> = {
  /** Can this argument be ommited from the full settings object? */
  optional?: true;
  /** If starting out from disabled or being dragged in from palette what should
   * the default value be? */
  defaultValue: InputFieldEntryMap[ArgType]["value"];
  /** Should the default value be given to a new instance of a settings object
   * if that field is optional?  */
  useDefaultIfOptional?: boolean;
  /** What should the label be above the input for this field? */
  label?: string;
} & Omit<InputFieldEntryMap[ArgType], "value">;

export type StaticFieldInfoByType = {
  [ArgType in InputFieldEntryNames]: StaticFieldInfoGeneric<ArgType>;
} & { omitted: OmittedFieldStatic };

type NonDynamicProps = "inputType" | "optional";

export type DynamicFieldInfoByType = {
  [ArgType in InputFieldEntryNames]: Pick<
    StaticFieldInfoByType[ArgType],
    NonDynamicProps
  > &
    ArgumentsOrCallbacks<Omit<StaticFieldInfoByType[ArgType], NonDynamicProps>>;
} & { omitted: OmittedFieldDynamic };

export type DynamicFieldInfo =
  DynamicFieldInfoByType[keyof DynamicFieldInfoByType];
export type UiNodeSettingsInfo = Record<string, DynamicFieldInfo>;

export type StaticFieldInfo =
  StaticFieldInfoByType[keyof StaticFieldInfoByType];

/**
 * Key-value map of the information needed to render an input component for each
 * argument in a settings object
 */
export type FormInfo = Record<string, StaticFieldInfo>;

type OptionalField =
  | {
      inputType: "omitted";
    }
  | {
      optional: true;
    };

// Helper types to extract list of names that are optional or not based on the
// presence of the "optional" key in the settings object. Important to note that
// this means putting anything (true _or_ false) in the optional field will make
// it optional, which is maybe a bit confusing but will work out fine because
// javascript will do runtime checks
type OptionalSettingsKeys<Info extends FormInfo> = {
  [K in keyof Info]-?: Info[K] extends OptionalField ? K : never;
}[keyof Info];

type RequiredSettingsKeys<Info extends FormInfo> = {
  [K in keyof Info]-?: Info[K] extends OptionalField ? never : K;
}[keyof Info];

type typeFromInfo<Info extends StaticFieldInfo> = Info extends {
  defaultValue: any;
}
  ? Info["defaultValue"]
  : unknown;

// Now build the settings object based on the info object making the "optional"
// parameters just that
export type FormValuesFromInfo<Info extends FormInfo> = {
  [K in OptionalSettingsKeys<Info>]?: typeFromInfo<Info[K]>;
} & {
  [K in RequiredSettingsKeys<Info>]: typeFromInfo<Info[K]>;
};

export type InputComponentProps<T, Opts extends object = {}> = {
  id: string;
  label: string;
  value: T;
  onChange: (value: T) => void;
} & Opts;

export function makeLabelId(id: string) {
  return id + "-label";
}

import type {
  CSSMeasure,
  CSSUnits,
} from "components/Inputs/CSSUnitInput/CSSMeasure";
import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import type { MapDiscriminatedUnion } from "../../../TypescriptUtils";
import type { NamedList } from "../ListInput/NamedListInput";
import type { DropdownOption } from "../OptionsDropdown/DropdownSelect";
import type {
  RadioInputChoice,
  RadioInputOptions,
} from "../RadioInputs/RadioInputsSimple";

export type FieldTypeUnion =
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
      units?: CSSUnits[];
    }
  | { inputType: "boolean"; value: boolean }
  | {
      inputType: "list";
      value: NamedList;
      newItemValue?: { key: string; value: string };
    }
  | {
      inputType: "optionsDropdown";
      value: DropdownOption;
      choices: DropdownOption[];
    }
  | {
      inputType: "radioInput";
      value: RadioInputChoice;
      choices: RadioInputOptions;
    };

export type InputFieldTypeNames = FieldTypeUnion["inputType"];
export type KnownInputFieldTypes = FieldTypeUnion["value"];

export type InputFieldTypesMap = MapDiscriminatedUnion<
  FieldTypeUnion,
  "inputType"
>;

export type NodeToValueFn<T> = (node: ShinyUiNode) => T;

/**
 * Object is filled with either values or callbacks to get those values from a
 * ui node
 */
type ArgumentsOrCallbacks<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key] | NodeToValueFn<Obj[Key]>;
};

type OmittedField = { inputType: "omitted" };

export type StaticFieldInfoByType = {
  [ArgType in InputFieldTypeNames]: {
    defaultValue: InputFieldTypesMap[ArgType]["value"];
    label?: string;
    optional?: true;
  } & Omit<InputFieldTypesMap[ArgType], "value">;
} & { omitted: OmittedField };

type NonDynamicProps = "inputType" | "label" | "optional";

export type DynamicFieldInfoByType = {
  [ArgType in InputFieldTypeNames]: Pick<
    StaticFieldInfoByType[ArgType],
    NonDynamicProps
  > &
    ArgumentsOrCallbacks<Omit<StaticFieldInfoByType[ArgType], NonDynamicProps>>;
};

export type DynamicFieldInfo = DynamicFieldInfoByType[InputFieldTypeNames];
export type DynamicFormInfo = Record<string, DynamicFieldInfo>;

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
  value: T;
  onChange: (value: T) => void;
} & Opts;

export function makeLabelId(id: string) {
  return id + "-label";
}

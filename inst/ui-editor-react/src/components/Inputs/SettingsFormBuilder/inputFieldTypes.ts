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

export type DynamicFieldInfoByType = {
  [ArgType in InputFieldTypeNames]: {
    inputType: ArgType;
    label?: string;
    optional?: true;
  } & ArgumentsOrCallbacks<
    {
      defaultValue: InputFieldTypesMap[ArgType]["value"];
    } & Omit<InputFieldTypesMap[ArgType], "inputType" | "value">
  >;
};

export type StaticFieldInfoByType = {
  [ArgType in InputFieldTypeNames]: {
    inputType: ArgType;
    label?: string;
    optional?: true;
  } & {
    defaultValue: InputFieldTypesMap[ArgType]["value"];
  } & Omit<InputFieldTypesMap[ArgType], "inputType" | "value">;
};
export type StaticFieldInfo = StaticFieldInfoByType[InputFieldTypeNames];

/**
 * Key-value map of the information needed to render an input component for each
 * argument in a settings object
 */
export type FormInfo = Record<string, StaticFieldInfo>;

// Helper types to extract list of names that are optional or not based on the
// presence of the "optional" key in the settings object. Important to note that
// this means putting anything (true _or_ false) in the optional field will make
// it optional, which is maybe a bit confusing but will work out fine because
// javascript will do runtime checks
type OptionalSettingsKeys<Info extends FormInfo> = {
  [K in keyof Info]-?: true extends Info[K]["optional"] ? never : K;
}[keyof Info];

type RequiredSettingsKeys<Info extends FormInfo> = {
  [K in keyof Info]-?: true extends Info[K]["optional"] ? K : never;
}[keyof Info];

// Now build the settings object based on the info object making the "optional"
// parameters just that
export type FormValuesFromInfo<Info extends FormInfo> = {
  [K in OptionalSettingsKeys<Info>]?: Info[K]["defaultValue"];
} & {
  [K in RequiredSettingsKeys<Info>]: Info[K]["defaultValue"];
};

export type InputComponentProps<T, Opts extends object = {}> = {
  id: string;
  value: T;
  onChange: (value: T) => void;
} & Opts;

export function makeLabelId(id: string) {
  return id + "-label";
}

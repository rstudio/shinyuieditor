import type {
  CSSMeasure,
  CSSUnits,
} from "components/Inputs/CSSUnitInput/CSSMeasure";

import type { MapDiscriminatedUnion } from "../../../TypescriptUtils";
import type { NamedList } from "../ListInput/NamedListInput";
import type { DropdownOption } from "../OptionsDropdown/DropdownSelect";
import type {
  RadioInputChoice,
  RadioInputOptions,
} from "../RadioInputs/RadioInputsSimple";

export type ArgumentTypeUnion =
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

export type ArgTypesNames = ArgumentTypeUnion["inputType"];
export type KnownArgTypes = ArgumentTypeUnion["value"];

export type ArgTypesMap = MapDiscriminatedUnion<ArgumentTypeUnion, "inputType">;

export type ArgumentInfoByType = {
  [ArgType in ArgTypesNames]: {
    label?: string;
    defaultValue: ArgTypesMap[ArgType]["value"];
    optional?: true;
  } & Omit<ArgTypesMap[ArgType], "value">;
};

export type ArgumentInfo = ArgumentInfoByType[ArgTypesNames];

/**
 * Key-value map of the information needed to render an input component for each
 * argument in a settings object
 */
export type SettingsInfo = Record<string, ArgumentInfo>;

// Helper types to extract list of names that are optional or not based on the
// presence of the "optional" key in the settings object. Important to note that
// this means putting anything (true _or_ false) in the optional field will make
// it optional, which is maybe a bit confusing but will work out fine because
// javascript will do runtime checks
type OptionalSettingsKeys<Info extends SettingsInfo> = {
  [K in keyof Info]-?: true extends Info[K]["optional"] ? never : K;
}[keyof Info];

type RequiredSettingsKeys<Info extends SettingsInfo> = {
  [K in keyof Info]-?: true extends Info[K]["optional"] ? K : never;
}[keyof Info];

// Now build the settings object based on the info object making the "optional"
// parameters just that
export type SettingsObjFromInfo<Info extends SettingsInfo> = {
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

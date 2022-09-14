import type { CSSMeasure, CSSUnits } from "CSSMeasure";

import type { NamedList } from "../ListInput/NamedListInput";

export type ArgTypesMap = {
  string: {
    defaultValue: string;
    options?: {};
  };
  number: {
    defaultValue: number;
    options?: {
      // Currently not used at all
      min: number;
      max: number;
    };
  };
  cssMeasure: {
    defaultValue: CSSMeasure;
    options?: {
      units: CSSUnits[];
    };
  };
  boolean: {
    defaultValue: boolean;
    options?: {};
  };
  list: {
    defaultValue: NamedList;
    options?: {
      newItemValue?: { key: string; value: string };
    };
  };
};

export type ArgTypesNames = keyof ArgTypesMap;

export type ArgumentInfo = {
  [TypeName in ArgTypesNames]: {
    type: TypeName;
    label?: string;
    requiredOrOptional?: "optional" | "required";
  } & ArgTypesMap[TypeName];
}[ArgTypesNames];

export type KnownArgTypes = {
  [TypeName in ArgTypesNames]: ArgTypesMap[TypeName]["defaultValue"];
}[ArgTypesNames];

// Add undefined as some arguments are optional and when not provided return
// undefined
export type PossibleArgTypes = KnownArgTypes | undefined;

export type SettingsInfo = Record<string, ArgumentInfo>;

// Helper types to extract list of names that are optional or not based on the
// presence of the "optional" key in the settings object. Important to note that
// this means putting anything (true _or_ false) in the optional field will make
// it optional, which is maybe a bit confusing but will work out fine because
// javascript will do runtime checks
type OptionalSettingsKeys<Info extends SettingsInfo> = {
  [K in keyof Info]-?: "optional" extends Info[K]["requiredOrOptional"]
    ? never
    : K;
}[keyof Info];

type RequiredSettingsKeys<Info extends SettingsInfo> = {
  [K in keyof Info]-?: "optional" extends Info[K]["requiredOrOptional"]
    ? K
    : never;
}[keyof Info];

// Now build the settings object based on the info object making the "optional"
// parameters just that
export type SettingsObj<Info extends SettingsInfo> = {
  [K in OptionalSettingsKeys<Info>]?: Info[K]["defaultValue"];
} & {
  [K in RequiredSettingsKeys<Info>]: Info[K]["defaultValue"];
};

export type InputComponentProps<T, Opts extends object = {}> = {
  id?: string;
  value: T;
  onChange: (value: T) => void;
} & Opts;

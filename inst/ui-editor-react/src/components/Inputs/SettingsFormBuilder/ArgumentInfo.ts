export type ArgTypesMap = {
  string: string;
  number: number;
};

export type ArgTypesNames = keyof ArgTypesMap;

export type ArgumentInfoByType = {
  [T in ArgTypesNames]: {
    type: T;
    defaultValue: ArgTypesMap[T];
    label?: string;
    requiredOrOptional?: "optional" | "required";
  };
};
export type ArgumentInfo = ArgumentInfoByType[ArgTypesNames];

export type KnownArgTypes = ArgumentInfo["defaultValue"];

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

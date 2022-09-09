// Extract out only the keys that map to properties of type T
import { LabeledSettingsInput } from "./LabeledSettingsInput";
import "./styles.scss";

export type KnownArgTypes = string | number;

export type ArgumentInfo = {
  default: KnownArgTypes;
  label: string;
  optional?: boolean;
};

export type SettingsInfo = Record<string, ArgumentInfo>;

// Helper types to extract list of names that are optional or not based on the
// presence of the "optional" key in the settings object. Important to note that
// this means putting anything (true _or_ false) in the optional field will make
// it optional, which is maybe a bit confusing but will work out fine because
// javascript will do runtime checks
type OptionalSettingsKeys<Info extends SettingsInfo> = {
  [K in keyof Info]-?: undefined extends Info[K]["optional"] ? never : K;
}[keyof Info];

type RequiredSettingsKeys<Info extends SettingsInfo> = {
  [K in keyof Info]-?: undefined extends Info[K]["optional"] ? K : never;
}[keyof Info];

// Now build the settings object based on the info object making the "optional"
// parameters just that
type SettingsObj<Info extends SettingsInfo> = {
  [K in OptionalSettingsKeys<Info>]?: Info[K]["default"];
} & {
  [K in RequiredSettingsKeys<Info>]: Info[K]["default"];
};

export type InputComponentsMap<Settings extends SettingsInfo> = Record<
  keyof Settings,
  JSX.Element
>;

export type SettingsInputsBuilderProps<Info extends SettingsInfo> = {
  settingsInfo: Info;
  settings: SettingsObj<Info>;
  onSettingsChange: (name: string, value: KnownArgTypes) => void;
};
export function constructInputComponents<Info extends SettingsInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info>) {
  const InputsComponents: Record<string, JSX.Element> = {};

  keysOf(settings).forEach((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    InputsComponents[name] = (
      <LabeledSettingsInput
        name={name}
        value={settings[name] ?? "unset"}
        info={settingsInfo[name]}
        onChange={(updatedValue) => onSettingsChange(name, updatedValue)}
      />
    );
  });

  return InputsComponents as InputComponentsMap<Info>;
}

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}

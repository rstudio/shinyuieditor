// Extract out only the keys that map to properties of type T
import { SettingsInput } from "./SettingsInput";
import "./styles.scss";

export type KnownArgTypes = string | number;
type UiNodeSettingsObj = Record<string, KnownArgTypes>;
type SettingsInfo<Obj extends UiNodeSettingsObj> = {
  [K in keyof Obj]: { default: Obj[K]; label: string };
};

type InputComponentsMap<Settings extends UiNodeSettingsObj> = Record<
  keyof Settings,
  JSX.Element
>;

type SettingsFormBuilderProps<Settings extends UiNodeSettingsObj> = {
  settings: Settings;
  settingsInfo: SettingsInfo<Settings>;
  onSettingsChange: (name: string, value: KnownArgTypes) => void;
  renderInputs?: (inputsComps: InputComponentsMap<Settings>) => JSX.Element;
};

export function SettingsFormBuilder<Settings extends UiNodeSettingsObj>({
  settings,
  settingsInfo,
  onSettingsChange,
  renderInputs,
}: SettingsFormBuilderProps<Settings>) {
  const NameInputComp = keysOf(settings).map((name: keyof Settings) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    const value = settings[name];
    return [
      name,
      <label className="SettingsInput" key={name}>
        {settingsInfo[name].label}
        <SettingsInput
          value={value}
          onChange={(updatedValue) => onSettingsChange(name, updatedValue)}
        />
      </label>,
    ];
  });

  const Inputs = Object.fromEntries(
    NameInputComp
  ) as InputComponentsMap<Settings>;

  return (
    <form className="SettingsFormBuilder">
      {renderInputs ? renderInputs(Inputs) : Object.values(Inputs)}
    </form>
  );
}

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}

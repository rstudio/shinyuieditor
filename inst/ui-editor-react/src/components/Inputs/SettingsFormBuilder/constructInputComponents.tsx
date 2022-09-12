// Extract out only the keys that map to properties of type T
import type {
  PossibleArgTypes,
  SettingsInfo,
  SettingsObj,
} from "./ArgumentInfo";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import "./styles.scss";

export type InputComponentsMap<Settings extends SettingsInfo> = Record<
  keyof Settings,
  JSX.Element
>;

export type SettingsInputsBuilderProps<Info extends SettingsInfo> = {
  settingsInfo: Info;
  settings: SettingsObj<Info>;
  onSettingsChange: (name: string, value: PossibleArgTypes) => void;
};

export function constructInputComponents<Info extends SettingsInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info>) {
  const InputsComponents: Record<string, JSX.Element> = {};

  keysOf(settingsInfo).forEach((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    InputsComponents[name] = (
      <SettingsInput
        key={name}
        name={name}
        value={settings[name as keyof typeof settings]}
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

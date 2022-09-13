// Extract out only the keys that map to properties of type T
import { inANotInB } from "utils/array-helpers";

import type {
  PossibleArgTypes,
  SettingsInfo,
  SettingsObj,
} from "./ArgumentInfo";
import type { SettingsInputProps } from "./SettingsInput/SettingsInput";
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

export type InputComponentsOutput<Info extends SettingsInfo> = {
  inputs: InputComponentsMap<Info>;
  unknownArguments: JSX.Element | null;
};

export function constructInputComponents<Info extends SettingsInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info>): InputComponentsOutput<Info> {
  const InputsComponents: Record<string, JSX.Element> = {};

  keysOf(settingsInfo).forEach((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    const inputProps = {
      name,
      value: settings[name as keyof typeof settings],
      onChange: (updatedValue) => onSettingsChange(name, updatedValue),
      ...settingsInfo[name],
    } as SettingsInputProps;

    InputsComponents[name] = <SettingsInput key={name} {...inputProps} />;
  });

  // Find unknown arguments and return those too
  const unknownArguments = inANotInB(
    Object.keys(settings),
    Object.keys(settingsInfo)
  );

  return {
    inputs: InputsComponents as InputComponentsMap<Info>,
    unknownArguments:
      unknownArguments.length > 0 ? (
        <ul
          className="UnknownArgumentsList"
          aria-label="Unknown arguments list"
        >
          {unknownArguments.map((argName) => (
            <li aria-label="Unkown argument">
              <code>{argName}</code>
            </li>
          ))}
        </ul>
      ) : null,
  };
}

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}

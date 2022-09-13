// Extract out only the keys that map to properties of type T
import { Trash } from "components/Icons";
import { inANotInB } from "utils/array-helpers";

import Button from "../Button/Button";

import type { SettingsInfo, SettingsObj } from "./ArgumentInfo";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import "./styles.scss";

export type InputComponentsMap<Settings extends SettingsInfo> = Record<
  keyof Settings,
  JSX.Element
>;

export type SettingsInputsBuilderProps<Info extends SettingsInfo> = {
  settingsInfo: Info;
  settings: SettingsObj<Info>;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
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
      onChange: (updatedAction) => onSettingsChange(name, updatedAction),
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
            <UnknownArgumentItem
              key={argName}
              name={argName}
              onRemove={() => onSettingsChange(argName, { type: "REMOVE" })}
            />
          ))}
        </ul>
      ) : null,
  };
}

function UnknownArgumentItem({
  name,
  onRemove,
}: {
  name: string;
  onRemove: () => void;
}) {
  return (
    <li aria-label="Unkown argument">
      <code>{name}</code>
      <Button
        onClick={(e) => {
          // Stop propigation of click event in case we have other click listeners
          // that try and do things like set selection
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${name} argument`}
        variant="delete"
        type="button"
      >
        <Trash />
      </Button>
    </li>
  );
}

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}

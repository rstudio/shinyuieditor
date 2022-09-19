import type { StringKeys } from "TypescriptUtils";
import { inANotInB } from "utils/array-helpers";

import type { FormInfo, FormValuesFromInfo } from "./inputFieldTypes";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import { UnknownFormFields } from "./UnknownFormFields";

export type SettingsInputsBuilderProps<Info extends FormInfo> = {
  settings: FormValuesFromInfo<Info>;
  settingsInfo: Info;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
  renderInputs?: (x: InputComponentsOutput<Info>) => JSX.Element;
};

export type InputComponentsOutput<Info extends Record<string, any>> = {
  inputs: Record<StringKeys<Info>, JSX.Element>;
  unknownArguments: JSX.Element | null;
};

export function FormBuilder<Info extends FormInfo>({
  renderInputs,
  settings,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info>) {
  // Find unknown arguments and return those too
  const unknownArgumentsNames = inANotInB(
    Object.keys(settings),
    Object.keys(settingsInfo)
  );

  const PrebuildInputComponents = {
    inputs: knownArgumentInputs({
      settings,
      settingsInfo,
      onSettingsChange,
    }),
    unknownArguments:
      unknownArgumentsNames.length === 0 ? null : (
        <UnknownFormFields
          unknownArgumentsNames={unknownArgumentsNames}
          onSettingsChange={onSettingsChange}
        />
      ),
  } as InputComponentsOutput<Info>;

  return (
    <form className="FormBuilder">
      {renderInputs ? (
        renderInputs(PrebuildInputComponents)
      ) : (
        <AutobuildFormContents {...PrebuildInputComponents} />
      )}
    </form>
  );
}

function knownArgumentInputs<Info extends FormInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info>) {
  const InputsComponents: Record<string, JSX.Element> = {};

  keysOf(settingsInfo).forEach((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    const infoForArg = settingsInfo[name];

    const currentValue = settings[name as keyof typeof settings];

    const inputProps = {
      ...infoForArg,
      value: currentValue,
      onUpdate: (updatedAction) => onSettingsChange(name, updatedAction),
      ...infoForArg,
    } as SettingsInputProps;

    InputsComponents[name] = <SettingsInput key={name} {...inputProps} />;
  });

  return InputsComponents;
}

function AutobuildFormContents<Info extends FormInfo>({
  inputs,
  unknownArguments,
}: InputComponentsOutput<Info>) {
  return (
    <>
      {Object.values(inputs)}
      {unknownArguments ? (
        <section>
          <h3>Unknown arguments</h3>
          {unknownArguments}
        </section>
      ) : null}
    </>
  );
}

function keysOf<T extends Object>(obj: T): Array<keyof T> {
  return Array.from(Object.keys(obj)) as any;
}

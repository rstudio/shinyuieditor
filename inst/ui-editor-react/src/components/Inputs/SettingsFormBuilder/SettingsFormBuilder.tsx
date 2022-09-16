import { inANotInB } from "utils/array-helpers";

import type { SettingsInfo, SettingsObjFromInfo } from "./ArgumentInfo";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import { UnknownArgumentItems } from "./UnknownArgumentItems";

export type InputComponentsMap<Settings extends SettingsInfo> = Record<
  keyof Settings,
  JSX.Element
>;

export type SettingsInputsBuilderProps<Info extends SettingsInfo> = {
  settings: SettingsObjFromInfo<Info>;
  settingsInfo: Info;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
};

type InputComponentsOutput<Info extends SettingsInfo> = {
  inputs: InputComponentsMap<Info>;
  unknownArguments: JSX.Element | null;
};

export function SettingsFormBuilder<Info extends SettingsInfo>({
  renderInputs,
  settings,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info> & {
  renderInputs?: (x: InputComponentsOutput<Info>) => JSX.Element;
}) {
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
        <UnknownArgumentItems
          unknownArgumentsNames={unknownArgumentsNames}
          onSettingsChange={onSettingsChange}
        />
      ),
  } as InputComponentsOutput<Info>;

  return (
    <form className="SettingsFormBuilder">
      {renderInputs ? (
        renderInputs(PrebuildInputComponents)
      ) : (
        <AutobuildFormContents {...PrebuildInputComponents} />
      )}
    </form>
  );
}

function knownArgumentInputs<Info extends SettingsInfo>({
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

function AutobuildFormContents<Info extends SettingsInfo>({
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

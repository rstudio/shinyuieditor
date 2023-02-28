import React from "react";

import type { StringKeys } from "../../../utils/TypescriptUtils";

import type { ArgsToDynamicInfo, UiArgumentsObject } from "./inputFieldTypes";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import "./styles.scss";
import { UnknownArgumentsRender } from "./UnknownArgumentsRender";

type SettingsObj = Record<string, unknown>;

type FormFieldComponents<Info extends SettingsObj> = {
  inputs: Record<StringKeys<Info>, JSX.Element>;
  settings: Info;
};

export type CustomFormRenderFn<Settings extends SettingsObj> = (
  x: FormFieldComponents<Settings>
) => JSX.Element;

export type FormBuilderProps<Args extends UiArgumentsObject> = {
  settings: Args;
  settingsInfo: ArgsToDynamicInfo<Args>;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
  renderInputs?: CustomFormRenderFn<SettingsObj>;
};

export function FormBuilder<Args extends UiArgumentsObject>(
  args: FormBuilderProps<Args>
) {
  const {
    settings,
    settingsInfo,
    onSettingsChange,
    renderInputs = ({ inputs }) => <>{Object.values(inputs)}</>,
  } = args;

  const PrebuiltInputComponents = {
    inputs: knownArgumentInputs({
      settings,
      settingsInfo,
      onSettingsChange,
    }),
    settings,
  };

  return (
    <form className="FormBuilder" onSubmit={disableDefaultSubmit}>
      {renderInputs(PrebuiltInputComponents)}
      <UnknownArgumentsRender {...args} />
    </form>
  );
}

const disableDefaultSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
};

function knownArgumentInputs<Args extends UiArgumentsObject>({
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps<Args>) {
  const InputsComponents: Record<string, JSX.Element> = {};

  Object.keys(settingsInfo).forEach((name) => {
    const infoForArg = settingsInfo[name];

    if (infoForArg.inputType === "omitted") return;

    const currentValue = settings[name as keyof typeof settings];

    const inputProps = {
      ...infoForArg,
      name,
      value: currentValue,
      onUpdate: (updatedAction) => onSettingsChange(name, updatedAction),
    } as SettingsInputProps;

    InputsComponents[name] = <SettingsInput key={name} {...inputProps} />;
  });

  return InputsComponents;
}

import React from "react";

import { is_object } from "util-functions/src/is_object";
import type { StringKeys } from "util-functions/src/TypescriptUtils";

import type { UiArgumentsObject } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import type { DynamicArgumentInfo } from "./buildStaticSettingsInfo";
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

export type FormBuilderProps = {
  settings: UiArgumentsObject;
  settingsInfo: DynamicArgumentInfo;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
  renderInputs?: CustomFormRenderFn<SettingsObj>;
};

export function FormBuilder(args: FormBuilderProps) {
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

function knownArgumentInputs({
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps) {
  const InputsComponents: Record<string, JSX.Element> = {};

  for (const arg_name in settingsInfo) {
    const arg_info = settingsInfo[arg_name];

    if (!is_object(arg_info)) continue;

    if (
      !("inputType" in arg_info) ||
      !("defaultValue" in arg_info) ||
      arg_info.inputType === "omitted"
    )
      continue;

    const current_arg_value = settings[arg_name];

    const inputProps = {
      ...arg_info,
      name: arg_name,
      value: current_arg_value,
      onUpdate: (updatedAction) => onSettingsChange(arg_name, updatedAction),
    } as SettingsInputProps;

    InputsComponents[arg_name] = (
      <SettingsInput key={arg_name} {...inputProps} />
    );
  }

  return InputsComponents;
}

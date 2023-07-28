import React from "react";

import type { namedArgsObject } from "ui-node-definitions/src/uiNodeTypes";
import { is_object } from "util-functions/src/is_object";
import type { StringKeys } from "util-functions/src/TypescriptUtils";

import type { DynamicArgumentInfo } from "./buildStaticSettingsInfo";
import type { AllInputTypes } from "./inputFieldTypes";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import "./styles.scss";
import { UnknownArgumentsRender } from "./UnknownArgumentsRender";

type SettingsObj = Record<string, unknown>;

export type CustomFormRenderFn<Settings extends SettingsObj> = (x: {
  inputs: Record<StringKeys<Settings>, JSX.Element>;
  settings: Settings;
  onSettingsChange?: (name: string, action: SettingsUpdateAction) => void;
}) => JSX.Element;

export type FormBuilderProps = {
  settings: namedArgsObject;
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

  return (
    <form className="FormBuilder" onSubmit={disableDefaultSubmit}>
      {renderInputs({
        inputs: knownArgumentInputs({
          settings,
          settingsInfo,
          onSettingsChange,
        }),
        settings,
        onSettingsChange,
      })}
      <UnknownArgumentsRender {...args} />
    </form>
  );
}

const disableDefaultSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
  e.preventDefault();
};

/**
 * Input types that should not be rendered in the form
 */
const non_rendered_input_types = new Set<AllInputTypes>(["omitted", "ui-node"]);

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
      non_rendered_input_types.has(arg_info.inputType)
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

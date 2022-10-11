import React from "react";

import type { StringKeys } from "TypescriptUtils";

import type {
  FormInfo,
  InputFieldEntryNames,
  StaticFieldInfoByType,
} from "./inputFieldTypes";
import { removeOmittedFields } from "./removeOmittedFields";
import type {
  SettingsInputProps,
  SettingsUpdateAction,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import "./styles.scss";
import { UnknownArgumentsRender } from "./UnknownArgumentsRender";

export type SettingsObj = Record<string, unknown>;

/**
 * Info object with all the arguments marked as omitted removed. Aka only the
 * ones we want to render inputs for.
 */
export type NonOmittedFormInfo = Record<
  string,
  StaticFieldInfoByType[InputFieldEntryNames]
>;

export type UnknownArgumentsInfo<Settings extends SettingsObj> = {
  name: StringKeys<Settings>;
  component: React.ReactNode;
};

type FormFieldComponents<Info extends SettingsObj> = {
  inputs: Record<StringKeys<Info>, JSX.Element>;
  settings: Info;
};

export type CustomFormRenderFn<Settings extends SettingsObj> = (
  x: FormFieldComponents<Settings>
) => JSX.Element;

export type SettingsChangeFn = (
  name: string,
  action: SettingsUpdateAction
) => void;

export type FormBuilderProps<Info extends FormInfo> = {
  settings: SettingsObj;
  settingsInfo: Info;
  onSettingsChange: SettingsChangeFn;
  renderInputs?: CustomFormRenderFn<SettingsObj>;
};

export function FormBuilder<Info extends FormInfo>(
  args: FormBuilderProps<Info>
) {
  const {
    settings,
    settingsInfo,
    onSettingsChange,
    renderInputs = ({ inputs }) => <>{Object.values(inputs)}</>,
  } = args;
  const { nonOmittedFormInfo } = removeOmittedFields(settingsInfo);

  const PrebuiltInputComponents = {
    inputs: knownArgumentInputs({
      settings,
      settingsInfo: nonOmittedFormInfo,
      onSettingsChange,
    }),
    settings,
  };

  return (
    <form className="FormBuilder">
      {renderInputs(PrebuiltInputComponents)}
      <UnknownArgumentsRender {...args} />
    </form>
  );
}

function knownArgumentInputs<Info extends NonOmittedFormInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
}: FormBuilderProps<Info>) {
  const InputsComponents: Record<string, JSX.Element> = {};

  Object.keys(settingsInfo).forEach((name) => {
    const infoForArg = settingsInfo[name];

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

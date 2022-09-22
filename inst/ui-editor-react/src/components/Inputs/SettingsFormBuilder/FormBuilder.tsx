import React from "react";

import CategoryDivider from "components/CategoryDivider";
import { Trash } from "components/Icons";
import type { StringKeys } from "TypescriptUtils";
import { inANotInB } from "utils/array-helpers";

import Button from "../Button/Button";

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

type SettingsObj = Record<string, unknown>;

/**
 * Info object with all the arguments marked as omitted removed. Aka only the
 * ones we want to render inputs for.
 */
export type NonOmittedFormInfo = Record<
  string,
  StaticFieldInfoByType[InputFieldEntryNames]
>;

type UnknownArgumentsInfo<Settings extends SettingsObj> = {
  name: StringKeys<Settings>;
  component: React.ReactNode;
};

type FormFieldComponents<Info extends SettingsObj> = {
  inputs: Record<StringKeys<Info>, JSX.Element>;
  unknownArguments: UnknownArgumentsInfo<Info>[];
  settings: Info;
};

export type CustomFormRenderFn<Settings extends SettingsObj> = (
  x: FormFieldComponents<Settings>
) => JSX.Element;

type SettingsChangeFn = (name: string, action: SettingsUpdateAction) => void;

type FormBuilderProps<Info extends FormInfo> = {
  settings: SettingsObj;
  settingsInfo: Info;
  onSettingsChange: SettingsChangeFn;
  renderInputs?: CustomFormRenderFn<SettingsObj>;
};

export function FormBuilder<Info extends FormInfo>({
  settings,
  settingsInfo,
  onSettingsChange,
  renderInputs = AutobuildFormContents,
}: FormBuilderProps<Info>) {
  const { nonOmittedFormInfo } = removeOmittedFields(settingsInfo);
  const PrebuiltInputComponents = {
    inputs: knownArgumentInputs({
      settings,
      settingsInfo: nonOmittedFormInfo,
      onSettingsChange,
    }),
    unknownArguments: unknownArgumentsList({
      settings,
      unknownArgs: inANotInB(Object.keys(settings), Object.keys(settingsInfo)),
      onSettingsChange,
    }),
    settings,
  };

  return (
    <form className="FormBuilder">{renderInputs(PrebuiltInputComponents)}</form>
  );
}

function unknownArgumentsList<Settings extends SettingsObj>({
  settings,
  unknownArgs,
  onSettingsChange,
}: {
  settings: Settings;
  unknownArgs: StringKeys<Settings>[];
  onSettingsChange: SettingsChangeFn;
}): UnknownArgumentsInfo<Settings>[] {
  return unknownArgs.map((argName) => ({
    name: argName,
    component: (
      <span aria-label="Unknown argument">
        <code>argName</code>
        <Button
          onClick={() => onSettingsChange(argName, { type: "REMOVE" })}
          aria-label={`Remove ${argName} argument`}
          variant="icon"
          type="button"
        >
          <Trash />
        </Button>
      </span>
    ),
  }));
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

function AutobuildFormContents<Settings extends SettingsObj>({
  inputs,
  unknownArguments,
  settings,
}: FormFieldComponents<Settings>) {
  return (
    <>
      {Object.values(inputs)}
      {unknownArguments.length > 0 ? (
        <section className="unknown-arguments-list">
          <CategoryDivider category="Unknown arguments" />
          <ul
            className="unknown-form-fields"
            aria-label="Unknown arguments list"
          >
            {unknownArguments.map(({ name, component }) => (
              <li key={name}>{component}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </>
  );
}

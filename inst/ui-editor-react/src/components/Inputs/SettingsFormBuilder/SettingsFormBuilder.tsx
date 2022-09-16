import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";
import { inANotInB } from "utils/array-helpers";

import type { SettingsInfo, SettingsObj } from "./ArgumentInfo";
import {
  getValueFromProperty,
  getValuesFromProperties,
} from "./infoValueGetters";
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
  node: ShinyUiNode;
  settingsInfo: Info;
  // settings: SettingsObj<Info>;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
};

type InputComponentsOutput<Info extends SettingsInfo> = {
  inputs: InputComponentsMap<Info>;
  unknownArguments: JSX.Element | null;
};

export function SettingsFormBuilder<Info extends SettingsInfo>({
  renderInputs,
  node,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info> & {
  renderInputs?: (x: InputComponentsOutput<Info>) => JSX.Element;
}) {
  // Find unknown arguments and return those too
  const unknownArgumentsNames = inANotInB(
    Object.keys(node.uiArguments),
    Object.keys(settingsInfo)
  );

  const PrebuildInputComponents = {
    inputs: knownArgumentInputs({
      node,
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
  node,
  settingsInfo,
  onSettingsChange,
}: SettingsInputsBuilderProps<Info>) {
  const InputsComponents: Record<string, JSX.Element> = {};
  const settings = node.uiArguments as SettingsObj<Info>;

  keysOf(settingsInfo).forEach((name) => {
    if (typeof name !== "string")
      throw new Error("How did that non-string key get in here?");

    // const {
    //   label,
    //   defaultValue,
    //   requiredOrOptional
    // } = settingsInfo[name];

    // const options = "options" in settingsInfo[name] ? settingsInfo[name].options: {};

    const { options, defaultValue, ...otherArgs } = settingsInfo[name];

    // If we have dynamic objects, overwrite the non-dynamic matches before
    // passing to settings input
    const inputOptions = getValuesFromProperties(options ?? {}, node);

    const inputProps = {
      name,
      value: settings[name as keyof typeof settings],
      defaultValue: getValueFromProperty(defaultValue, node),
      onChange: (updatedAction) => onSettingsChange(name, updatedAction),
      ...otherArgs,
      options: inputOptions,
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

import React from "react";

import { is_object } from "util-functions/src/is_object";
import type { StringKeys } from "util-functions/src/TypescriptUtils";

import "./styles.scss";
import type { AllInputTypes } from "../ui-node-definitions/inputFieldTypes";
import type { NodePath } from "../ui-node-definitions/NodePath";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import type { NamedArgsObject } from "../ui-node-definitions/uiNodeTypes";

import type { DynamicArgumentInfo } from "./buildStaticSettingsInfo";
import type {
  SettingsUpdateAction,
  SettingsInputProps,
} from "./SettingsInput/SettingsInput";
import { SettingsInput } from "./SettingsInput/SettingsInput";
import { UnknownArgumentsRender } from "./UnknownArgumentsRender";

type SettingsObj = Record<string, unknown>;

export type CustomFormRenderFn<Settings extends SettingsObj> = (x: {
  inputs: Record<StringKeys<Settings>, JSX.Element>;
  settings: Settings;
  onSettingsChange?: (name: string, action: SettingsUpdateAction) => void;
}) => JSX.Element;

export type FormBuilderProps = {
  app_tree: ShinyUiNode;
  node: ShinyUiNode;
  nodePath: NodePath;
  settings: NamedArgsObject;
  settingsInfo: DynamicArgumentInfo;
  onSettingsChange: (name: string, action: SettingsUpdateAction) => void;
  renderInputs?: CustomFormRenderFn<SettingsObj>;
};

export function FormBuilder(args: FormBuilderProps) {
  const { settings, onSettingsChange, renderInputs, node, nodePath } = args;

  const inputElements = knownArgumentInputs(args);

  let renderedInput: JSX.Element;

  if (renderInputs) {
    renderedInput = renderInputs({
      inputs: inputElements,
      settings,
      onSettingsChange,
    });
  } else {
    renderedInput = (
      <>
        {Object.entries(inputElements).map(([name, input], i) => (
          <React.Fragment key={name + node.id + nodePath.join("-")}>
            {input}
          </React.Fragment>
        ))}
      </>
    );
  }

  return (
    <form
      className="FormBuilder flex flex-grow flex-shrink-0 flex-col"
      onSubmit={disableDefaultSubmit}
      key={node.id + nodePath.join("-")}
    >
      {renderedInput}
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
  app_tree,
  node,
  nodePath,
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
      <SettingsInput
        key={node.id + arg_name + nodePath.join("-")}
        {...inputProps}
      />
    );
  }

  return InputsComponents;
}

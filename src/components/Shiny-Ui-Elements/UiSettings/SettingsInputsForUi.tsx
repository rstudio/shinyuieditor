import React from "react";
import {
  SettingsUpdateComponentProps,
  ShinyUiArguments,
  ShinyUiNames,
} from "../componentTypes";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function SettingsInputsForUi<UiName extends ShinyUiNames>(props: {
  uiName: UiName;
  settings: ShinyUiArguments[UiName];
  onChange: (newSettings: ShinyUiArguments[UiName]) => void;
}) {
  // Convince typescript this is the correct type of prop from the object. Not
  // sure why this is needed.
  const SettingsInputs = uiComponentAndSettings[props.uiName]
    .SettingsComponent as (
    p: SettingsUpdateComponentProps<ShinyUiArguments[UiName]>
  ) => JSX.Element;

  return <SettingsInputs settings={props.settings} onChange={props.onChange} />;
}

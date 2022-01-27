import React from "react";
import {
  SettingsUpdaterComponent,
  ShinyUiArguments,
  ShinyUiNames,
} from "../uiNodeTypes";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function SettingsInputsForUi<UiName extends ShinyUiNames>(props: {
  uiName: UiName;
  settings: ShinyUiArguments[UiName];
  onChange: (newSettings: ShinyUiArguments[UiName]) => void;
}) {
  const { uiName, settings } = props;

  // // Convince typescript this is the correct type of prop from the object. Not
  // // sure why this is needed.
  // const SettingsInputs = uiComponentAndSettings[uiName]
  //   .SettingsComponent as SettingsUpdaterComponent<typeof settings>;

  return <div>Standin for settings</div>;
}

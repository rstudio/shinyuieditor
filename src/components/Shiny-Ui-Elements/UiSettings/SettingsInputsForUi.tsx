import React from "react";
import {
  SettingsUpdateComponent,
  ShinyUiArgumentsByName,
  ShinyUiNames,
} from "../Elements/componentTypes";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function SettingsInputsForUi<UiName extends ShinyUiNames>(props: {
  uiName: UiName;
  settings: ShinyUiArgumentsByName[UiName];
  onChange: (newSettings: ShinyUiArgumentsByName[UiName]) => void;
}) {
  const SettingsInputs = uiComponentAndSettings[props.uiName]
    .SettingsComponent as SettingsUpdateComponent<
    ShinyUiArgumentsByName[UiName]
  >;

  return <SettingsInputs settings={props.settings} onChange={props.onChange} />;
}

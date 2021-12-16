import React from "react";
import {
  ShinyUiNames,
  UiArgumentsCompByName,
} from "../Elements/componentTypes";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function SettingsInputsForUi<UiName extends ShinyUiNames>({
  uiName,
  settings: currentSettings,
  onChange,
}: UiArgumentsCompByName<UiName>) {
  const SettingsInputs = uiComponentAndSettings[uiName].SettingsComponent;

  return (
    <SettingsInputs currentSettings={currentSettings} onChange={onChange} />
  );
}

import React from "react";
import { ShinyUiNames, UiSettingsCompByName } from "../Elements/componentTypes";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function SettingsInputsForUi<UiName extends ShinyUiNames>({
  uiName,
  settings: currentSettings,
  onChange,
}: UiSettingsCompByName<UiName>) {
  const SettingsInputs = uiComponentAndSettings[uiName].SettingsComponent;

  return (
    <SettingsInputs currentSettings={currentSettings} onChange={onChange} />
  );
}

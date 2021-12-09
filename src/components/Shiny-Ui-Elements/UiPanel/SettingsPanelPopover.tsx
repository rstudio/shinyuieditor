import React from "react";
import { ShinyUiNames, ShinyUiPropsByName } from "../Elements/componentTypes";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";
import UiSettingsForm from "../UiSettings/UiSettingsForm";

type UiSettingsCompByName<UiName extends ShinyUiNames> = {
  uiName: UiName;
  settings: ShinyUiPropsByName[UiName];
  onChange: (newSettings: ShinyUiPropsByName[UiName]) => void;
};

export default function UiSettingsComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
  onChange,
}: UiSettingsCompByName<UiName>) {
  const [currentSettings, setCurrentSettings] = React.useState(settings);

  return (
    <UiSettingsForm onUpdate={() => onChange(currentSettings)}>
      <UiSettingsInputs
        uiName={uiName}
        settings={currentSettings}
        onChange={setCurrentSettings}
      />
    </UiSettingsForm>
  );
}

export function UiSettingsInputs<UiName extends ShinyUiNames>({
  uiName,
  settings: currentSettings,
  onChange,
}: UiSettingsCompByName<UiName>) {
  const SettingsInputs = uiComponentAndSettings[uiName].SettingsComponent;

  return (
    <SettingsInputs currentSettings={currentSettings} onChange={onChange} />
  );
}

import React from "react";
import { ShinyUiProps, ShinyUiSettingsFields } from "../componentTypes";
import UiSettingsForm from "../UiSettingsForm";

export default function UiSettingsComponent<Props extends ShinyUiProps>(p: {
  startingSettings: Props;
  onUpdate: (newSettings: Props) => void;
  SettingsInputs: ShinyUiSettingsFields<Props>;
}) {
  const { startingSettings, onUpdate, SettingsInputs } = p;
  const [settings, setSettings] = React.useState(startingSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(settings)}>
      <SettingsInputs currentSettings={settings} onChange={setSettings} />
    </UiSettingsForm>
  );
}

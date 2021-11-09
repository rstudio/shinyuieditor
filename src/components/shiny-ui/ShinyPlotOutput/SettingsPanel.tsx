import * as React from "react";
import { ShinyPlotOutputProps } from ".";
import { ShinyUiSettingsComponent } from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";
import UiSettingsForm from "../UiSettingsForm";

const ShinyPlotOutputSettings: ShinyUiSettingsComponent<ShinyPlotOutputProps> = ({
  startingSettings,
  onUpdate,
}) => {
  const [plotSettings, setPlotSettings] = React.useState(startingSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(plotSettings)}>
      <TextInput
        label="Plot Name"
        value={plotSettings.name ?? "UndefinedPlotName"}
        onChange={(name) => setPlotSettings((s) => ({ ...s, name }))}
      />
    </UiSettingsForm>
  );
};

export default ShinyPlotOutputSettings;

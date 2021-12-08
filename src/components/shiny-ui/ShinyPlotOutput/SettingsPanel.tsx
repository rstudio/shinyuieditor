import * as React from "react";
import { ShinyPlotOutputProps } from ".";
import {
  ShinyUiSettingsComponent,
  ShinyUiSettingsFields,
} from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";
import UiSettingsForm from "../UiSettingsForm";

const ShinyPlotOutputSettings: ShinyUiSettingsComponent<
  ShinyPlotOutputProps
> = ({ startingSettings, onUpdate }) => {
  const [plotSettings, setPlotSettings] = React.useState(startingSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(plotSettings)}>
      <ShinyPlotOutputSettingsOptions
        currentSettings={plotSettings}
        onChange={setPlotSettings}
      />
    </UiSettingsForm>
  );
};

const ShinyPlotOutputSettingsOptions: ShinyUiSettingsFields<
  ShinyPlotOutputProps
> = ({ currentSettings, onChange }) => {
  const { name } = currentSettings;
  return (
    <TextInput
      label="Plot Name"
      value={name ?? "UndefinedPlotName"}
      onChange={(newName) => onChange({ ...currentSettings, name: newName })}
    />
  );
};

export default ShinyPlotOutputSettings;

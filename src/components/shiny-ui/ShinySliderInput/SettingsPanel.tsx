import * as React from "react";
import { buildSliderSettings, ShinySliderInputProps } from ".";
import {
  ShinyUiSettingsComponent,
  ShinyUiSettingsFields,
} from "../componentTypes";
import { NumericInput } from "../SettingsInputs/NumericInput";
import { TextInput } from "../SettingsInputs/TextInput";
import UiSettingsForm from "../UiSettingsForm";

const ShinySliderInputSettings: ShinyUiSettingsComponent<
  ShinySliderInputProps
> = ({ startingSettings, onUpdate }) => {
  const [sliderSettings, setSliderSettings] = React.useState(startingSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(sliderSettings)}>
      <ShinySliderInputSettingsOptions
        currentSettings={sliderSettings}
        onChange={setSliderSettings}
      />
    </UiSettingsForm>
  );
};

export const ShinySliderInputSettingsOptions: ShinyUiSettingsFields<
  ShinySliderInputProps
> = ({ currentSettings, onChange }) => {
  const settings = buildSliderSettings(currentSettings);

  return (
    <>
      <TextInput
        label="Slider name"
        value={settings.name}
        onChange={(name) => onChange({ ...settings, name })}
      />
      <NumericInput
        label="Minimum value"
        value={settings.min}
        onChange={(min) => onChange({ ...settings, min })}
      />
      <NumericInput
        label="Maximum value"
        value={settings.max}
        onChange={(max) => onChange({ ...settings, max })}
      />
      <NumericInput
        label="Starting value"
        value={settings.val}
        onChange={(val) => onChange({ ...settings, val })}
      />
    </>
  );
};

export default ShinySliderInputSettings;

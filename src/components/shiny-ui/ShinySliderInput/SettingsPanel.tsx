import * as React from "react";
import { buildSliderSettings, ShinySliderInputProps } from ".";
import { ShinyUiSettingsComponent } from "../componentTypes";
import { NumericInput } from "../SettingsInputs/NumericInput";
import { TextInput } from "../SettingsInputs/TextInput";
import UiSettingsForm from "../UiSettingsForm";

const ShinySliderInputSettings: ShinyUiSettingsComponent<ShinySliderInputProps> = ({
  startingSettings,
  onUpdate,
}) => {
  const currentSettings = buildSliderSettings(startingSettings);

  const [sliderSettings, setSliderSettings] = React.useState(currentSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(sliderSettings)}>
      <TextInput
        label="Slider name"
        value={sliderSettings.name}
        onChange={(name) => setSliderSettings((s) => ({ ...s, name }))}
      />
      <NumericInput
        label="Minimum value"
        value={sliderSettings.min}
        onChange={(min) => setSliderSettings((s) => ({ ...s, min }))}
      />
      <NumericInput
        label="Maximum value"
        value={sliderSettings.max}
        onChange={(max) => setSliderSettings((s) => ({ ...s, max }))}
      />
      <NumericInput
        label="Starting value"
        value={sliderSettings.val}
        onChange={(val) => setSliderSettings((s) => ({ ...s, val }))}
      />
    </UiSettingsForm>
  );
};

export default ShinySliderInputSettings;

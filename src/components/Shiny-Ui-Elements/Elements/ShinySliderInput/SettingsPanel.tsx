import * as React from "react";
import { buildSliderSettings, ShinySliderInputProps } from ".";
import { ShinyUiSettingsFields } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import { NumericInput } from "components/Shiny-Ui-Elements/UiSettings/Inputs/NumericInput";
import { TextInput } from "components/Shiny-Ui-Elements/UiSettings/Inputs/TextInput";

export const ShinySliderInputSettings: ShinyUiSettingsFields<
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

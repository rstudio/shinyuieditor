import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { buildSliderSettings, ShinySliderInputProps } from ".";
import { ShinyUiSettingsComponent } from "../componentTypes";
import { NumericInput } from "../SettingsInputs/NumericInput";
import { TextInput } from "../SettingsInputs/TextInput";
import { SettingsPanelHolder } from "../UiPanelSettingsProps";

const ShinySliderInputSettings: ShinyUiSettingsComponent<ShinySliderInputProps> = ({
  startingSettings,
  onUpdate,
}) => {
  const currentSettings = buildSliderSettings(startingSettings);

  const [sliderSettings, setSliderSettings] = React.useState(currentSettings);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onUpdate(sliderSettings);
    },
    [onUpdate, sliderSettings]
  );
  return (
    <SettingsPanelHolder>
      <form onSubmit={onSubmit}>
        <FormControl id="sliderInput-settings">
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
        </FormControl>
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
        >
          Update Slider
        </Button>
      </form>
    </SettingsPanelHolder>
  );
};

export default ShinySliderInputSettings;

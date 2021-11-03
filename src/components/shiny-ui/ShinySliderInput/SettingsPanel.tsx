import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { buildSliderSettings, ShinySliderInputProps } from ".";
import {
  SettingsPanelHolder,
  UiPanelSettingsProps,
} from "../UiPanelSettingsProps";
import { NumericInput } from "../SettingsInputs/NumericInput";

export default function ShinySliderInputSettings({
  startingSettings,
  onUpdate,
}: UiPanelSettingsProps<ShinySliderInputProps>) {
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
          <NumericInput
            label="Minimum value"
            value={currentSettings.min}
            onChange={(min) => setSliderSettings((s) => ({ ...s, min }))}
          />
          <NumericInput
            label="Max value"
            value={currentSettings.max}
            onChange={(max) => setSliderSettings((s) => ({ ...s, max }))}
          />
          <NumericInput
            label="Starting value"
            value={currentSettings.val}
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
}

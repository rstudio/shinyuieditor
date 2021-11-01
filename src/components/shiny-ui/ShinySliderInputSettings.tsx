import { FormControl, FormLabel } from "@chakra-ui/form-control";
import {
  Button,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { buildSliderSettings, ShinySliderInputProps } from "./ShinySliderInput";

type UiPanelSettingsProps<UiPanelProps> = {
  startingSettings: UiPanelProps;
  onUpdate: (newSettings: UiPanelProps) => void;
};

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

const SettingsPanelHolder = styled.div({
  padding: "1rem",
  input: { minHeight: "30px" },
  button: { minHeight: "30px" },
});

function NumericInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (newVal: number) => void;
}) {
  return (
    <>
      <FormLabel>{label}</FormLabel>

      <NumberInput
        defaultValue={value}
        onChange={(val) => onChange(Number(val))}
        minHeight="30px"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
    </>
  );
}

import { FormControl } from "@chakra-ui/form-control";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { ShinyPlotOutputProps } from ".";
import {
  NumericInput,
  SettingsPanelHolder,
  UiPanelSettingsProps,
} from "../UiPanelSettingsProps";

export default function ShinyPlotOutputSettings({
  startingSettings,
  onUpdate,
}: UiPanelSettingsProps<ShinyPlotOutputProps>) {
  const [sliderSettings, setSliderSettings] = React.useState(startingSettings);

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
          <FormLabel>Plot name</FormLabel>
          <Input placeholder={sliderSettings.name} />
        </FormControl>
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          marginTop="0.75rem"
          type="submit"
        >
          Update Plot
        </Button>
      </form>
    </SettingsPanelHolder>
  );
}

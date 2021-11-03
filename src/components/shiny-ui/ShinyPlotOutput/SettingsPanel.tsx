import { FormControl } from "@chakra-ui/form-control";
import { Button, FormLabel, Input } from "@chakra-ui/react";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { ShinyPlotOutputProps } from ".";
import {
  SettingsPanelHolder,
  UiPanelSettingsProps,
} from "../UiPanelSettingsProps";
import { TextInput } from "../SettingsInputs/TextInput";

export default function ShinyPlotOutputSettings({
  startingSettings,
  onUpdate,
}: UiPanelSettingsProps<ShinyPlotOutputProps>) {
  const [plotSettings, setPlotSettings] = React.useState(startingSettings);

  const onSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onUpdate(plotSettings);
    },
    [onUpdate, plotSettings]
  );
  return (
    <SettingsPanelHolder>
      <form onSubmit={onSubmit}>
        <FormControl id="sliderInput-settings">
          <TextInput
            label="Plot Name"
            value={plotSettings.name ?? "UndefinedPlotName"}
            onChange={(name) => setPlotSettings((s) => ({ ...s, name }))}
          />
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

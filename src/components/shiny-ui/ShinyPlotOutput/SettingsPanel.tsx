import { FormControl } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import * as React from "react";
import { BiCheck } from "react-icons/bi";
import { ShinyPlotOutputProps } from ".";
import { ShinyUiSettingsComponent } from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";
import { SettingsPanelHolder } from "../UiPanelSettingsProps";

const ShinyPlotOutputSettings: ShinyUiSettingsComponent<ShinyPlotOutputProps> = ({
  startingSettings,
  onUpdate,
}) => {
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
};

export default ShinyPlotOutputSettings;

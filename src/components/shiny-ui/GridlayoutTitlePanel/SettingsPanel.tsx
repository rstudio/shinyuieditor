import { FormControl } from "@chakra-ui/form-control";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { ShinyUiSettingsComponent } from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";
import UiSettingsForm from "../UiSettingsForm";

const GridlayoutTitlePanelSettings: ShinyUiSettingsComponent<
  GridlayoutTitlePanelProps
> = ({ startingSettings, onUpdate }) => {
  const [titleSettings, setTitleSettings] = React.useState(startingSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(titleSettings)}>
      <FormControl id="sliderInput-settings">
        <TextInput
          label="App title"
          value={titleSettings.title ?? "UndefinedAppTitle"}
          onChange={(title) => setTitleSettings((s) => ({ ...s, title }))}
        />
      </FormControl>
    </UiSettingsForm>
  );
};

export default GridlayoutTitlePanelSettings;

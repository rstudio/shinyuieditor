import { FormControl } from "@chakra-ui/form-control";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import {
  ShinyUiSettingsComponent,
  ShinyUiSettingsFields,
} from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";
import UiSettingsForm from "../UiSettingsForm";

const GridlayoutTitlePanelSettings: ShinyUiSettingsComponent<
  GridlayoutTitlePanelProps
> = ({ startingSettings, onUpdate }) => {
  const [titleSettings, setTitleSettings] = React.useState(startingSettings);

  return (
    <UiSettingsForm onUpdate={() => onUpdate(titleSettings)}>
      <GridlayoutTitlePanelSettingsOptions
        currentSettings={titleSettings}
        onChange={setTitleSettings}
      />
    </UiSettingsForm>
  );
};

export const GridlayoutTitlePanelSettingsOptions: ShinyUiSettingsFields<
  GridlayoutTitlePanelProps
> = ({ currentSettings, onChange }) => {
  return (
    <FormControl id="sliderInput-settings">
      <TextInput
        label="App title"
        value={currentSettings.title ?? "UndefinedAppTitle"}
        onChange={(title) => onChange({ ...currentSettings, title })}
      />
    </FormControl>
  );
};

export default GridlayoutTitlePanelSettings;

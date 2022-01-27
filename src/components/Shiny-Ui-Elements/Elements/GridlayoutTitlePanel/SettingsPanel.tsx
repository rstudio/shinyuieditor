import { FormControl } from "@chakra-ui/form-control";
import { TextInput } from "components/Inputs/TextInput";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { SettingsUpdaterComponent } from "../../uiNodeTypes";

export const GridlayoutTitlePanelSettings: SettingsUpdaterComponent<
  GridlayoutTitlePanelProps
> = ({ settings, onChange }) => {
  return (
    <FormControl id="shiny::sliderInput-settings">
      <TextInput
        label="App title"
        value={settings.title ?? "UndefinedAppTitle"}
        onChange={(title) => onChange({ ...settings, title })}
      />
    </FormControl>
  );
};

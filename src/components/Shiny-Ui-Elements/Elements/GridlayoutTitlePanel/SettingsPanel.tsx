import { FormControl } from "@chakra-ui/form-control";
import { TextInput } from "components/Inputs/TextInput";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { SettingsUpdateComponentProps } from "../../uiNodeTypes";

export const GridlayoutTitlePanelSettings = ({
  settings,
  onChange,
}: SettingsUpdateComponentProps<GridlayoutTitlePanelProps>) => {
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

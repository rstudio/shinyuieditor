import { FormControl } from "@chakra-ui/form-control";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { ShinyUiSettingsFields } from "../componentTypes";
import { TextInput } from "../../UiSettings/Inputs/TextInput";

export const GridlayoutTitlePanelSettings: ShinyUiSettingsFields<
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

import { FormControl } from "@chakra-ui/form-control";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { ShinyUiSettingsFields } from "../componentTypes";
import { TextInput } from "../SettingsInputs/TextInput";

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

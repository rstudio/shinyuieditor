import { FormControl } from "@chakra-ui/form-control";
import { TextInput } from "components/Inputs/TextInput";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { ShinyUiSettingsFields } from "../componentTypes";

export const GridlayoutTitlePanelSettings: ShinyUiSettingsFields<
  GridlayoutTitlePanelProps
> = ({ currentSettings, onChange }) => {
  // All inputs are valid currently but later when this is expanded we will make this
  // variable more dynamic
  const isValid = true;

  return (
    <FormControl id="sliderInput-settings">
      <TextInput
        label="App title"
        value={currentSettings.title ?? "UndefinedAppTitle"}
        onChange={(title) => onChange({ ...currentSettings, title }, isValid)}
      />
    </FormControl>
  );
};

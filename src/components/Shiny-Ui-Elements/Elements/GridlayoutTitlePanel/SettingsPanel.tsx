import { FormControl } from "@chakra-ui/form-control";
import { TextInput } from "components/Inputs/TextInput";
import * as React from "react";
import { GridlayoutTitlePanelProps } from ".";
import { ShinyUiArgumentsFields } from "../componentTypes";

export const GridlayoutTitlePanelSettings: ShinyUiArgumentsFields<
  GridlayoutTitlePanelProps
> = ({ currentSettings, onChange }) => {
  return (
    <FormControl id="shiny::sliderInput-settings">
      <TextInput
        label="App title"
        value={currentSettings.title ?? "UndefinedAppTitle"}
        onChange={(title) => onChange({ ...currentSettings, title })}
      />
    </FormControl>
  );
};

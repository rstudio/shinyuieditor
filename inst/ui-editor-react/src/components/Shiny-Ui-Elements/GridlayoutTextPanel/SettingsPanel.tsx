import * as React from "react";

import PngIcon from "components/Icons";
import BooleanInput from "components/Inputs/BooleanInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutTextPanelProps } from ".";

const horizontalAlignOptions = {
  start: { icon: <PngIcon id="alignTextLeft" />, label: "left" },
  center: { icon: <PngIcon id="alignTextCenter" />, label: "center" },
  end: { icon: <PngIcon id="alignTextRight" />, label: "right" },
};

export const GridlayoutTextPanelSettings: SettingsUpdaterComponent<
  GridlayoutTextPanelProps
> = ({ settings }) => {
  return (
    <>
      <TextInput
        name="area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
      />
      <TextInput
        name="content"
        label="Panel content"
        value={settings.content}
      />
      <RadioInputs
        name="h_align"
        label="Text Alignment"
        options={horizontalAlignOptions}
        currentSelection={settings.h_align}
        optionsPerColumn={3}
      />
      <BooleanInput
        name="is_title"
        label="Use text as app title"
        value={settings.is_title}
      />
    </>
  );
};

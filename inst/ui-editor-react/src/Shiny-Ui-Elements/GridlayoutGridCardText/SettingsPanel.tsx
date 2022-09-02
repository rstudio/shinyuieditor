import * as React from "react";

import {
  alignTextCenter,
  alignTextLeft,
  alignTextRight,
} from "components/Icons";
import BooleanInput from "components/Inputs/BooleanInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutGridCardTextProps } from ".";

const horizontalAlignOptions = {
  start: { icon: alignTextLeft, label: "left" },
  center: { icon: alignTextCenter, label: "center" },
  end: { icon: alignTextRight, label: "right" },
};

export const GridlayoutGridCardTextSettings: SettingsUpdaterComponent<
  GridlayoutGridCardTextProps
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
        name="alignment"
        label="Text Alignment"
        options={horizontalAlignOptions}
        currentSelection={settings.alignment}
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

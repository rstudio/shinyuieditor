import * as React from "react";

import { AlignHCenter, AlignLeft, AlignRight } from "components/Icon";
import BooleanInput from "components/Inputs/BooleanInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutTextPanelProps } from ".";

const horizontalAlignOptions = {
  start: { icon: <AlignLeft />, label: "left" },
  center: { icon: <AlignHCenter />, label: "center" },
  end: { icon: <AlignRight />, label: "right" },
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

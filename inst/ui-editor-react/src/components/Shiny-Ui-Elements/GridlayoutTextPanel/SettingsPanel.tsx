import * as React from "react";

import BooleanInput from "components/Inputs/BooleanInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import { CgAlignCenter, CgAlignLeft, CgAlignRight } from "react-icons/cg";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutTextPanelProps } from ".";

const alignmentOptions = {
  start: { icon: <CgAlignLeft size="25px" />, label: "left" },
  center: { icon: <CgAlignCenter size="25px" />, label: "middle" },
  end: { icon: <CgAlignRight size="25px" />, label: "right" },
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
        options={alignmentOptions}
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

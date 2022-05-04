import * as React from "react";

import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import {
  CgAlignBottom,
  CgAlignCenter,
  CgAlignLeft,
  CgAlignMiddle,
  CgAlignRight,
  CgAlignTop,
} from "react-icons/cg";

import type { GridPanelSettings } from ".";

const verticalAlignOptions = {
  start: { icon: <CgAlignTop size="25px" />, label: "top" },
  center: { icon: <AiOutlineVerticalAlignMiddle size="25px" /> },
  end: { icon: <CgAlignBottom size="25px" />, label: "bottom" },
  spread: { icon: <CgAlignMiddle size="25px" /> },
};

const horizontalAlignOptions = {
  start: { icon: <CgAlignLeft size="25px" />, label: "left" },
  center: { icon: <CgAlignCenter size="25px" />, label: "middle" },
  end: { icon: <CgAlignRight size="25px" />, label: "right" },
  spread: { icon: <CgAlignCenter size="25px" />, label: "spread" },
};

export const GridlayoutGridPanelSettings: SettingsUpdaterComponent<
  GridPanelSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput
        name="area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
      />
      <RadioInputs
        name="v_align"
        label="Vertical Alignment"
        options={verticalAlignOptions}
        currentSelection={settings.v_align ?? "center"}
        optionsPerColumn={2}
      />
      <RadioInputs
        name="h_align"
        label="Horizontal Alignment"
        options={horizontalAlignOptions}
        currentSelection={settings.h_align ?? "center"}
        optionsPerColumn={2}
      />
    </>
  );
};

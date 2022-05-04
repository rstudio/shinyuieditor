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

const verticalAlignIcons = {
  start: <CgAlignTop size="25px" />,
  end: <CgAlignBottom size="25px" />,
  center: <AiOutlineVerticalAlignMiddle size="25px" />,
  spread: <CgAlignMiddle size="25px" />,
};

const horizontalAlignIcons = {
  start: <CgAlignLeft size="25px" />,
  center: <CgAlignCenter size="25px" />,
  end: <CgAlignRight size="25px" />,
  spread: <CgAlignCenter size="25px" />,
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
        options={["start", "center", "end", "spread"]}
        optionIcons={verticalAlignIcons}
        currentSelection={settings.v_align ?? "center"}
        optionsPerColumn={2}
      />
      <RadioInputs
        name="h_align"
        label="Horizontal Alignment"
        options={["start", "center", "end", "spread"]}
        optionIcons={horizontalAlignIcons}
        currentSelection={settings.h_align ?? "center"}
        optionsPerColumn={2}
      />
    </>
  );
};

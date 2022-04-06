import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { CgAlignBottom, CgAlignMiddle, CgAlignTop } from "react-icons/cg";

import type { AlignmentOptions } from ".";
import type { VerticalStackPanelSettings } from ".";

const alignmentIcons: Record<AlignmentOptions, JSX.Element> = {
  top: <CgAlignTop size="25px" />,
  bottom: <CgAlignBottom size="25px" />,
  center: <AiOutlineVerticalAlignMiddle size="25px" />,
  spread: <CgAlignMiddle size="25px" />,
};

export const GridlayoutVerticalStackPanelSettings: SettingsUpdaterComponent<
  VerticalStackPanelSettings
> = ({ settings, onChange }) => {
  return (
    <>
      <TextInput
        name="area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
        onChange={onChange}
      />
      <RadioInputs
        name="item_alignment"
        label="Item Alignment"
        options={["top", "center", "bottom", "spread"]}
        optionIcons={alignmentIcons}
        currentSelection={settings.item_alignment ?? "top"}
        onChange={onChange}
        optionsPerColumn={2}
      />
      <LabeledCSSUnitInput
        name="item_gap"
        value={settings.item_gap ?? "15px"}
        label="Gap Size"
        units={["px", "rem"]}
        onChange={onChange}
      />
    </>
  );
};

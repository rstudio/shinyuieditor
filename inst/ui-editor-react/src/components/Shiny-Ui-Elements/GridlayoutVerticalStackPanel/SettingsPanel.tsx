import * as React from "react";

import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { CgAlignBottom, CgAlignMiddle, CgAlignTop } from "react-icons/cg";

import type { VerticalStackPanelSettings } from ".";

const alignmentOptions = {
  top: { icon: <CgAlignTop size="25px" /> },
  center: { icon: <AiOutlineVerticalAlignMiddle size="25px" /> },
  bottom: { icon: <CgAlignBottom size="25px" /> },
  spread: { icon: <CgAlignMiddle size="25px" /> },
};

export const GridlayoutVerticalStackPanelSettings: SettingsUpdaterComponent<
  VerticalStackPanelSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="area" label="Name of grid area" value={settings.area} />
      <TextInput
        name="title"
        label="Panel title"
        value={settings.title}
        optional={true}
        defaultValue={settings.area}
      />
      <RadioInputs
        name="item_alignment"
        label="Item Alignment"
        options={alignmentOptions}
        currentSelection={settings.item_alignment ?? "top"}
        optionsPerColumn={2}
      />
      <LabeledCSSUnitInput
        name="item_gap"
        value={settings.item_gap ?? "15px"}
        label="Gap Size"
        units={["px", "rem"]}
      />
    </>
  );
};

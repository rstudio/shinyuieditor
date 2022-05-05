import * as React from "react";

import Icon from "components/Icon";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import { CgAlignBottom, CgAlignMiddle, CgAlignTop } from "react-icons/cg";

import type { VerticalStackPanelSettings } from ".";

const alignmentOptions = {
  top: { icon: <Icon id="alignTop" />, label: "top" },
  center: { icon: <Icon id="alignVCenter" />, label: "middle" },
  bottom: { icon: <Icon id="alignBottom" />, label: "bottom" },
  spread: { icon: <Icon id="alignVSpread" /> },
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

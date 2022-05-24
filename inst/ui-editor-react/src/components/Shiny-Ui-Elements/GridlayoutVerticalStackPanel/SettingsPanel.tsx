import * as React from "react";

import PngIcon from "components/Icons";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { VerticalStackPanelSettings } from ".";

const alignmentOptions = {
  top: { icon: <PngIcon id="alignTop" />, label: "top" },
  center: { icon: <PngIcon id="alignCenter" />, label: "middle" },
  bottom: { icon: <PngIcon id="alignBottom" />, label: "bottom" },
  spread: { icon: <PngIcon id="alignSpread" />, label: "spread" },
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

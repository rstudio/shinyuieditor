import * as React from "react";

import {
  alignBottom,
  alignCenter,
  alignSpread,
  alignTop,
} from "components/Icons";
import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { GridCardSettings } from ".";

const alignmentOptions = {
  top: { icon: alignTop, label: "top" },
  center: { icon: alignCenter, label: "middle" },
  bottom: { icon: alignBottom, label: "bottom" },
  spread: { icon: alignSpread, label: "spread" },
};

export const GridlayoutGridCardSettings: SettingsUpdaterComponent<
  GridCardSettings
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

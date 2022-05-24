import * as React from "react";

import {
  AlignBottom,
  AlignHCenter,
  AlignHSpread,
  AlignLeft,
  AlignRight,
  AlignTop,
  AlignVCenter,
  AlignVSpread,
} from "components/Icons";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { GridPanelSettings } from ".";

const verticalAlignOptions = {
  start: { icon: <AlignTop />, label: "top" },
  center: { icon: <AlignVCenter />, label: "middle" },
  end: { icon: <AlignBottom />, label: "bottom" },
  spread: { icon: <AlignVSpread /> },
};

const horizontalAlignOptions = {
  start: { icon: <AlignLeft />, label: "left" },
  center: { icon: <AlignHCenter />, label: "center" },
  end: { icon: <AlignRight />, label: "right" },
  spread: { icon: <AlignHSpread />, label: "spread" },
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

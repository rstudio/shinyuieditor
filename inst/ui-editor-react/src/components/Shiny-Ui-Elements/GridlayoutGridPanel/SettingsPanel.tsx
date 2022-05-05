import * as React from "react";

import Icon from "components/Icon";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import type { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/uiNodeTypes";

import type { GridPanelSettings } from ".";

const verticalAlignOptions = {
  start: { icon: <Icon id="alignTop" />, label: "top" },
  center: { icon: <Icon id="alignVCenter" />, label: "middle" },
  end: { icon: <Icon id="alignBottom" />, label: "bottom" },
  spread: { icon: <Icon id="alignVSpread" /> },
};

const horizontalAlignOptions = {
  start: { icon: <Icon id="alignLeft" />, label: "left" },
  center: { icon: <Icon id="alignHCenter" />, label: "center" },
  end: { icon: <Icon id="alignRight" />, label: "right" },
  spread: { icon: <Icon id="alignHSpread" />, label: "spread" },
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

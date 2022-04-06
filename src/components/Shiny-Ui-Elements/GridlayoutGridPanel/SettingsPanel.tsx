import * as React from "react";

import { RadioInputs } from "components/Inputs/RadioInputs";
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
  top: <CgAlignTop size="25px" />,
  bottom: <CgAlignBottom size="25px" />,
  center: <AiOutlineVerticalAlignMiddle size="25px" />,
  spread: <CgAlignMiddle size="25px" />,
};

const horizontalAlignIcons = {
  left: <CgAlignLeft size="25px" />,
  spread: <CgAlignCenter size="25px" />,
  center: <CgAlignCenter size="25px" />,
  right: <CgAlignRight size="25px" />,
};

export const GridlayoutGridPanelSettings: SettingsUpdaterComponent<
  GridPanelSettings
> = ({ settings, onChange }) => {
  return (
    <>
      <TextInput
        name="Grid-Area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
        onChange={onChange}
      />
      <RadioInputs
        name="Vertical Alignment"
        options={["top", "spread", "bottom"]}
        optionIcons={verticalAlignIcons}
        currentSelection={settings.verticalAlign ?? "spread"}
        onChange={(verticalAlign) =>
          onChange({ name: "verticalAlign", value: verticalAlign })
        }
        optionsPerColumn={3}
      />
      <RadioInputs
        name="Horizontal Alignment"
        options={["left", "spread", "right"]}
        optionIcons={horizontalAlignIcons}
        currentSelection={settings.horizontalAlign ?? "spread"}
        onChange={(horizontalAlign) =>
          onChange({ name: "horizontalAlign", value: horizontalAlign })
        }
        optionsPerColumn={3}
      />
    </>
  );
};

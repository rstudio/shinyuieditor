import { RadioInputs } from "components/Inputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import { SettingsUpdaterComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import * as React from "react";
import { AiOutlineVerticalAlignMiddle } from "react-icons/ai";
import {
  CgAlignBottom,
  CgAlignCenter,
  CgAlignLeft,
  CgAlignMiddle,
  CgAlignRight,
  CgAlignTop,
} from "react-icons/cg";
import { GridPanelSettings } from ".";

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
        onChange={(area) => onChange({ ...settings, area })}
      />
      <RadioInputs
        name="Vertical Alignment"
        options={["top", "spread", "bottom"]}
        optionIcons={verticalAlignIcons}
        currentSelection={settings.verticalAlign ?? "spread"}
        onChange={(verticalAlign) => onChange({ ...settings, verticalAlign })}
        optionsPerColumn={3}
      />
      <RadioInputs
        name="Horizontal Alignment"
        options={["left", "spread", "right"]}
        optionIcons={horizontalAlignIcons}
        currentSelection={settings.horizontalAlign ?? "spread"}
        onChange={(horizontalAlign) =>
          onChange({ ...settings, horizontalAlign })
        }
        optionsPerColumn={3}
      />
    </>
  );
};

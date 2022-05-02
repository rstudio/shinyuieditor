import * as React from "react";

import BooleanInput from "components/Inputs/BooleanInput";
import { RadioInputs } from "components/Inputs/RadioInputs/RadioInputs";
import { TextInput } from "components/Inputs/TextInput";
import { CgAlignCenter, CgAlignLeft, CgAlignRight } from "react-icons/cg";

import type { SettingsUpdaterComponent } from "../uiNodeTypes";

import type { GridlayoutTextPanelProps } from ".";

const alignmentIcons: Record<GridlayoutTextPanelProps["h_align"], JSX.Element> =
  {
    start: <CgAlignLeft size="25px" />,
    center: <CgAlignCenter size="25px" />,
    end: <CgAlignRight size="25px" />,
  };

export const GridlayoutTextPanelSettings: SettingsUpdaterComponent<
  GridlayoutTextPanelProps
> = ({ settings }) => {
  return (
    <>
      <TextInput
        name="area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
      />
      <TextInput
        name="content"
        label="Panel content"
        value={settings.content}
      />
      <RadioInputs
        name="h_align"
        label="Text Alignment"
        options={["start", "center", "end"]}
        optionIcons={alignmentIcons}
        currentSelection={settings.h_align}
        optionsPerColumn={3}
      />
      <BooleanInput
        name="is_title"
        label="Use text as app title"
        value={settings.is_title}
      />
    </>
  );
};

import * as React from "react";

import { RadioInputs } from "components/Inputs/RadioInputs";
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
> = ({ settings, onChange }) => {
  const updateSettings = ({
    name,
    value,
  }: {
    name: string;
    value?: number | string;
  }) => {
    onChange({ ...settings, [name]: value });
  };
  return (
    <>
      <TextInput
        name="area"
        label="Name of grid area"
        value={settings.area ?? "empty grid area"}
        onChange={updateSettings}
      />
      <TextInput
        name="content"
        label="Panel content"
        value={settings.content}
        onChange={updateSettings}
      />

      <RadioInputs
        name="Text Alignment"
        options={["start", "center", "end"]}
        optionIcons={alignmentIcons}
        currentSelection={settings.h_align}
        onChange={(h_align) => onChange({ ...settings, h_align })}
        optionsPerColumn={3}
      />
    </>
  );
};

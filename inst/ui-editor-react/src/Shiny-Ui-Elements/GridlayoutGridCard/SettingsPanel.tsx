import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInputOld } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridCardSettings } from ".";

export const GridlayoutGridCardSettings: SettingsUpdaterComponent<
  GridCardSettings
> = ({ settings }) => {
  return (
    <>
      <TextInputOld
        name="area"
        label="Name of grid area"
        value={settings.area}
      />
      <TextInputOld
        name="title"
        label="Panel title"
        value={settings.title}
        optional={true}
        defaultValue={settings.area}
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

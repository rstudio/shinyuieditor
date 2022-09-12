import { LabeledCSSUnitInput } from "components/Inputs/CSSUnitInput";
import { TextInput } from "components/Inputs/TextInput/TextInput";
import type { SettingsUpdaterComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { GridCardSettings } from ".";

export const GridlayoutGridCardSettings: SettingsUpdaterComponent<
  GridCardSettings
> = ({ settings }) => {
  return (
    <>
      <TextInput name="area" label="Name of grid area" allValues={settings} />
      <TextInput
        name="title"
        label="Panel title"
        allValues={settings}
        optional={true}
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

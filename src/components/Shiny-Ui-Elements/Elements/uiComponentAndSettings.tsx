import { ShinyUiComponentAndSettings } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import GridlayoutTitlePanel from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel/SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";
import { ShinyPlotOutputSettings } from "./ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "./ShinySliderInput";
import { ShinySliderInputSettings } from "./ShinySliderInput/SettingsPanel";

export const uiComponentAndSettings: ShinyUiComponentAndSettings = {
  plotOutput: {
    UiComponent: ShinyPlotOutput,
    SettingsComponent: ShinyPlotOutputSettings,
  },
  sliderInput: {
    UiComponent: ShinySliderInput,
    SettingsComponent: ShinySliderInputSettings,
  },
  titlePanel: {
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
  },
};

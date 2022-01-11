import {
  ShinyUiComponentAndArguments,
  ShinyUiNameAndArguments,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import GridlayoutTitlePanel from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel/SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";
import { ShinyPlotOutputSettings } from "./ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "./ShinySliderInput";
import { ShinySliderInputSettings } from "./ShinySliderInput/SettingsPanel";

export const uiComponentAndSettings: ShinyUiComponentAndArguments = {
  "shiny::plotOutput": {
    UiComponent: ShinyPlotOutput,
    SettingsComponent: ShinyPlotOutputSettings,
  },
  "shiny::sliderInput": {
    UiComponent: ShinySliderInput,
    SettingsComponent: ShinySliderInputSettings,
  },
  "gridlayout::titlePanel": {
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
  },
};

export const defaultSettingsForElements: ShinyUiNameAndArguments[] = [
  {
    uiName: "shiny::plotOutput",
    uiArguments: { name: "My Chosen Plot" },
  },
  {
    uiName: "shiny::sliderInput",
    uiArguments: { min: 0, val: 5, max: 10 },
  },
  {
    uiName: "gridlayout::titlePanel",
    uiArguments: { title: "Title from Chooser" },
  },
];

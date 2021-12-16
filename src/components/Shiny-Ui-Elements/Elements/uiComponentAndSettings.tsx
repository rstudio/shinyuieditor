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

export const defaultSettingsForElements: ShinyUiNameAndArguments[] = [
  {
    uiName: "plotOutput",
    uiArguments: { name: "My Chosen Plot" },
  },
  {
    uiName: "sliderInput",
    uiArguments: { min: 0, val: 5, max: 10 },
  },
  {
    uiName: "titlePanel",
    uiArguments: { title: "Title from Chooser" },
  },
];

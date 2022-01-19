import {
  SettingsUpdateComponentProps,
  ShinyUiNameAndArguments,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import GridlayoutTitlePanel from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel/SettingsPanel";
import type { ShinyUiArgumentsByName } from "./componentTypes";
import ShinyPlotOutput from "./ShinyPlotOutput";
import { ShinyPlotOutputSettings } from "./ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "./ShinySliderInput";
import { ShinySliderInputSettings } from "./ShinySliderInput/SettingsPanel";

export const uiComponentAndSettings = {
  "shiny::plotOutput": {
    UiComponent: ShinyPlotOutput,
    SettingsComponent: ShinyPlotOutputSettings,
  },
  "shiny::sliderInput": {
    UiComponent: ShinySliderInput,
    SettingsComponent: ShinySliderInputSettings,
  },
  "gridlayout::title_panel": {
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
  },
};

export const defaultSettingsForElements: ShinyUiNameAndArguments[] = [
  {
    uiName: "shiny::plotOutput",
    uiArguments: { outputId: "plot" },
  },
  {
    uiName: "shiny::sliderInput",
    uiArguments: {
      inputId: "slider",
      label: "Slider",
      min: 0,
      value: 5,
      max: 10,
    },
  },
  {
    uiName: "gridlayout::title_panel",
    uiArguments: { title: "Title from Chooser" },
  },
];

import { ShinyUiNameAndArguments } from "components/Shiny-Ui-Elements/uiNodeTypes";
import GridlayoutTitlePanel from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel/SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";
import { ShinyPlotOutputSettings } from "./ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "./ShinySliderInput";
import { ShinySliderInputSettings } from "./ShinySliderInput/SettingsPanel";
import GridlayoutGridPanel from "./GridlayoutGridPanel";
import { GridlayoutGridPanelSettings } from "./GridlayoutGridPanel/SettingsPanel";
import GridlayoutGridPage from "./GridlayoutGridPage";
import { GridlayoutGridPageSettings } from "./GridlayoutGridPage/SettingsPanel";

type AllowedBaseElements = HTMLDivElement;
type PassthroughProps = Pick<
  React.DetailedHTMLProps<
    React.HTMLAttributes<AllowedBaseElements>,
    AllowedBaseElements
  >,
  "onDrop" | "onDragEnter" | "onDragLeave" | "onClick"
>;

export type UiNodeComponent<NodeSettings extends object> = React.FC<
  { uiArguments: NodeSettings } & PassthroughProps
>;

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
  "gridlayout::grid_panel": {
    UiComponent: GridlayoutGridPanel,
    SettingsComponent: GridlayoutGridPanelSettings,
  },
  "gridlayout::grid_page": {
    UiComponent: GridlayoutGridPage,
    SettingsComponent: GridlayoutGridPageSettings,
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
  {
    uiName: "gridlayout::grid_panel",
    uiArguments: {
      verticalAlign: "center",
      horizontalAlign: "center",
    },
  },
];

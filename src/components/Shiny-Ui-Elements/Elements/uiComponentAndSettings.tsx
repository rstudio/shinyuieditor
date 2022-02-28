import GridlayoutTitlePanel from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel/SettingsPanel";
import {
  SettingsUpdaterComponent,
  ShinyUiArguments,
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { DragAndDropHandlers } from "../DragAndDropHelpers/useDragAndDropElements";
import GridlayoutGridPage from "./GridlayoutGridPage";
import { GridlayoutGridPageSettings } from "./GridlayoutGridPage/SettingsPanel";
import GridlayoutGridPanel from "./GridlayoutGridPanel";
import { GridlayoutGridPanelSettings } from "./GridlayoutGridPanel/SettingsPanel";
import GridlayoutVerticalStackPanel, {
  gridlayoutVerticalStackPanelDefaultSettings,
} from "./GridlayoutVerticalStackPanel";
import { GridlayoutVerticalStackPanelSettings } from "./GridlayoutVerticalStackPanel/SettingsPanel";
import ShinyPlotOutput from "./ShinyPlotOutput";
import { ShinyPlotOutputSettings } from "./ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "./ShinySliderInput";
import { ShinySliderInputSettings } from "./ShinySliderInput/SettingsPanel";

type AllowedBaseElements = HTMLDivElement;
type PassthroughProps = DragAndDropHandlers &
  Pick<
    React.DetailedHTMLProps<
      React.HTMLAttributes<AllowedBaseElements>,
      AllowedBaseElements
    >,
    "onClick"
  >;

export type UiNodeComponent<NodeSettings extends object> = React.FC<
  { uiArguments: NodeSettings } & PassthroughProps
>;

export const uiComponentAndSettings: {
  [UiName in ShinyUiNames]: {
    UiComponent: UiNodeComponent<ShinyUiArguments[UiName]>;
    SettingsComponent: SettingsUpdaterComponent<ShinyUiArguments[UiName]>;
    acceptsChildren: boolean;
  };
} = {
  "shiny::plotOutput": {
    UiComponent: ShinyPlotOutput,
    SettingsComponent: ShinyPlotOutputSettings,
    acceptsChildren: false,
  },
  "shiny::sliderInput": {
    UiComponent: ShinySliderInput,
    SettingsComponent: ShinySliderInputSettings,
    acceptsChildren: false,
  },
  "gridlayout::title_panel": {
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
    acceptsChildren: false,
  },
  "gridlayout::grid_panel": {
    UiComponent: GridlayoutGridPanel,
    SettingsComponent: GridlayoutGridPanelSettings,
    acceptsChildren: true,
  },
  "gridlayout::grid_page": {
    UiComponent: GridlayoutGridPage,
    SettingsComponent: GridlayoutGridPageSettings,
    acceptsChildren: true,
  },
  "gridlayout::vertical_stack_panel": {
    UiComponent: GridlayoutVerticalStackPanel,
    SettingsComponent: GridlayoutVerticalStackPanelSettings,
    acceptsChildren: true,
  },
};

export const defaultSettingsForElements: ShinyUiNode[] = [
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
  {
    uiName: "gridlayout::vertical_stack_panel",
    uiArguments: gridlayoutVerticalStackPanelDefaultSettings,
  },
];

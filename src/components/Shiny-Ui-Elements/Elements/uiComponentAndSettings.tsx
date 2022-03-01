import { gridlayoutTitlePanelInfo } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import {
  SettingsUpdaterComponent,
  ShinyUiArguments,
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { DragAndDropHandlers } from "../DragAndDropHelpers/useDragAndDropElements";
import { gridlayoutGridPageInfo } from "./GridlayoutGridPage";
import { gridLayoutGridPanelInfo } from "./GridlayoutGridPanel";
import {
  gridlayoutVerticalStackPanelDefaultSettings,
  gridlayoutVerticalStackPanelInfo,
} from "./GridlayoutVerticalStackPanel";
import { shinyPlotOutputInfo } from "./ShinyPlotOutput";
import { shinySliderInputInfo } from "./ShinySliderInput";

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
  "shiny::plotOutput": shinyPlotOutputInfo,
  "shiny::sliderInput": shinySliderInputInfo,
  "gridlayout::title_panel": gridlayoutTitlePanelInfo,
  "gridlayout::grid_panel": gridLayoutGridPanelInfo,
  "gridlayout::grid_page": gridlayoutGridPageInfo,
  "gridlayout::vertical_stack_panel": gridlayoutVerticalStackPanelInfo,
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

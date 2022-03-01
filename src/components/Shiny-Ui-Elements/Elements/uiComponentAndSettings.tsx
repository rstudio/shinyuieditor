import { gridlayoutTitlePanelInfo } from "components/Shiny-Ui-Elements/Elements/GridlayoutTitlePanel";
import {
  SettingsUpdaterComponent,
  ShinyUiArguments,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { DragAndDropHandlers } from "../DragAndDropHelpers/useDragAndDropElements";
import { gridlayoutGridPageInfo } from "./GridlayoutGridPage";
import { gridLayoutGridPanelInfo } from "./GridlayoutGridPanel";
import { gridlayoutVerticalStackPanelInfo } from "./GridlayoutVerticalStackPanel";
import { shinyPlotOutputInfo } from "./ShinyPlotOutput";
import { shinySliderInputInfo } from "./ShinySliderInput";
import { UiComponentInfo } from "./UiComponentInfo";

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
  [UiName in ShinyUiNames]: UiComponentInfo<ShinyUiArguments[UiName]>;
} = {
  "shiny::plotOutput": shinyPlotOutputInfo,
  "shiny::sliderInput": shinySliderInputInfo,
  "gridlayout::title_panel": gridlayoutTitlePanelInfo,
  "gridlayout::grid_panel": gridLayoutGridPanelInfo,
  "gridlayout::grid_page": gridlayoutGridPageInfo,
  "gridlayout::vertical_stack_panel": gridlayoutVerticalStackPanelInfo,
};

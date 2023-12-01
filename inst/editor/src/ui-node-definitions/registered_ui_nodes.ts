import { bslibCardBodyInfo, bslibCardHeaderInfo, bslibCardInfo } from "./Bslib";
import { bslibCardFooterInfo } from "./Bslib/card_footer";
import { bslibNavPanelInfo } from "./Bslib/NavPanel";
import { bslibSidebar } from "./Bslib/Sidebar";
import { bslibValueBoxInfo } from "./Bslib/ValueBox/ValueBox";
import { dtDTOutputInfo } from "./DT";
import {
  gridlayoutCardInfo,
  gridlayoutGridCardPlotInfo,
  gridlayoutGridContainerInfo,
  gridlayoutGridPageInfo,
  gridlayoutTextPanelInfo,
} from "./gridlayout";
import { testingErrorNodeInfo } from "./internal/__TestingErrorNode";
import { textNodeInfo } from "./internal/TextNode";
import { unknownUiFunctionInfo } from "./internal/UnknownUiFunction";
import { plotlyPlotlyOutputInfo } from "./plotly";
import { shinyActionButtonInfo } from "./Shiny/ShinyActionButton";
import { shinyCheckboxGroupInputInfo } from "./Shiny/ShinyCheckboxGroupInput";
import { shinyCheckboxInputInfo } from "./Shiny/ShinyCheckboxInput";
import {
  shinyLayoutSidebarInfo,
  shinyPanelMainInfo,
} from "./Shiny/ShinyLayoutSidebar/LayoutSidebar";
import { markdownNodeInfo } from "./Shiny/ShinyMarkdown/markdown";
import { shinyNavbarPageInfo } from "./Shiny/ShinyNavbarPage";
import { shinyNumericInputInfo } from "./Shiny/ShinyNumericInput";
import { shinyPlotOutputInfo } from "./Shiny/ShinyPlotOutput";
import { shinyRadioButtonsInfo } from "./Shiny/ShinyRadioButtons/ShinyRadioButtons";
import { shinySelectInputInfo } from "./Shiny/ShinySelectInput";
import { shinySliderInputInfo } from "./Shiny/ShinySliderInput";
import { shinyTabsetPanelInfo } from "./Shiny/ShinyTabsetPanel";
import { shinyTextInputInfo } from "./Shiny/ShinyTextInput";
import { shinyTextOutputInfo } from "./Shiny/ShinyTextOutput/ShinyTextOutput";
import { shinyUiOutputInfo } from "./Shiny/ShinyUiOutput";

/**
 * This is the main object that contains the info about a given uiNode. Once the
 * node info object is created and added here the ui-node will be usable within
 * the editor
 */
export const registered_ui_nodes = [
  shinyActionButtonInfo,
  shinyNumericInputInfo,
  shinySliderInputInfo,
  shinyTextInputInfo,
  shinyCheckboxInputInfo,
  shinyCheckboxGroupInputInfo,
  shinySelectInputInfo,
  shinyRadioButtonsInfo,
  shinyPlotOutputInfo,
  shinyTextOutputInfo,
  shinyUiOutputInfo,
  shinyNavbarPageInfo,
  shinyLayoutSidebarInfo,
  shinyPanelMainInfo,
  shinyTabsetPanelInfo,
  gridlayoutGridPageInfo,
  gridlayoutCardInfo,
  gridlayoutTextPanelInfo,
  gridlayoutGridCardPlotInfo,
  gridlayoutGridContainerInfo,
  dtDTOutputInfo,
  bslibCardInfo,
  bslibValueBoxInfo,
  bslibCardBodyInfo,
  bslibCardHeaderInfo,
  bslibCardFooterInfo,
  bslibSidebar,
  bslibNavPanelInfo,
  plotlyPlotlyOutputInfo,
  textNodeInfo,
  markdownNodeInfo,
  unknownUiFunctionInfo,
  testingErrorNodeInfo,
] as const;

type ShinyUiNodeInfo = (typeof registered_ui_nodes)[number];
const shinyUiNodeInfo = new Map<string, ShinyUiNodeInfo>(
  registered_ui_nodes.map((info) => [info.id, info])
);

/**
 *
 * @param id Name of ui node to look up
 * @returns Set of information about that node, or error if it doesn't exist
 * @throws Error if node doesn't exist
 */
export function getUiNodeInfo(id: string): ShinyUiNodeInfo {
  if (!shinyUiNodeInfo.has(id)) {
    throw new Error(`Failed to find node info for requested node: ${id}`);
  }
  return shinyUiNodeInfo.get(id) as ShinyUiNodeInfo;
}

/**
 *
 * @param id Name of ui node to look up
 * @returns Component used to render that node
 * @throws Error if node doesn't exist
 */
export function getUiNodeComponent(id: string) {
  return getUiNodeInfo(id).UiComponent;
}

/**
 *
 * @param id Name of ui node to look up
 * @returns Component used to render that node
 * @throws Error if node doesn't exist
 */
export function getUiNodeSettingsRenderer(id: string) {
  return getUiNodeInfo(id).settingsFormRender;
}

/**
 *
 * @param id Name of ui node to look up
 * @returns icon source for node or undefined if that icon doesn't exist
 * @throws Error if node doesn't exist
 */
export function getUiNodeIcon(id: string): string | undefined {
  return getUiNodeInfo(id).iconSrc;
}

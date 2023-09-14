import { testingErrorNodeInfo } from "./__TestingErrorNode";
import {
  bslibCardBodyInfo,
  bslibCardFooterInfo,
  bslibCardHeaderInfo,
  bslibCardInfo,
} from "./Bslib";
import { bslibSidebar } from "./Bslib/Sidebar";
import { bslibValueBoxInfo } from "./Bslib/ValueBox/ValueBox";
import { dtDTOutputInfo } from "./DtDtOutput";
import {
  gridlayoutCardInfo,
  gridlayoutGridCardPlotInfo,
  gridlayoutGridContainerInfo,
  gridlayoutGridPageInfo,
  gridlayoutTextPanelInfo,
} from "./Gridlayout";
import { plotlyPlotlyOutputInfo } from "./PlotlyPlotlyOutput";
import { shinyActionButtonInfo } from "./ShinyActionButton";
import { shinyCheckboxGroupInputInfo } from "./ShinyCheckboxGroupInput";
import { shinyCheckboxInputInfo } from "./ShinyCheckboxInput";
import {
  shinyLayoutSidebarInfo,
  shinyPanelMainInfo,
} from "./ShinyLayoutSidebar/LayoutSidebar";
import { markdownNodeInfo } from "./ShinyMarkdown/markdown";
import { shinyNavbarPageInfo } from "./ShinyNavbarPage";
import { shinyNumericInputInfo } from "./ShinyNumericInput";
import { shinyPlotOutputInfo } from "./ShinyPlotOutput";
import { shinyRadioButtonsInfo } from "./ShinyRadioButtons/ShinyRadioButtons";
import { shinySelectInputInfo } from "./ShinySelectInput";
import { shinySliderInputInfo } from "./ShinySliderInput";
import { shinyTabPanelInfo } from "./ShinyTabPanel";
import { shinyTabsetPanelInfo } from "./ShinyTabsetPanel";
import { shinyTextInputInfo } from "./ShinyTextInput";
import { shinyTextOutputInfo } from "./ShinyTextOutput/ShinyTextOutput";
import { shinyUiOutputInfo } from "./ShinyUiOutput";
import { textNodeInfo } from "./TextNode";
import { unknownUiFunctionInfo } from "./UnknownUiFunction";

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
  shinyTabPanelInfo,
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

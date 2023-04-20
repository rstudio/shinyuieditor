import { testingErrorNodeInfo } from "./__TestingErrorNode";
import {
  bslibCardBodyInfo,
  bslibCardFooterInfo,
  bslibCardHeaderInfo,
  bslibCardInfo,
} from "./Bslib";
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
import { shinyNavbarPageInfo } from "./ShinyNavbarPage";
import { shinyNumericInputInfo } from "./ShinyNumericInput";
import { shinyPlotOutputInfo } from "./ShinyPlotOutput";
import { shinyRadioButtonsInfo } from "./ShinyRadioButtons";
import { shinySelectInputInfo } from "./ShinySelectInput";
import { shinySliderInputInfo } from "./ShinySliderInput";
import { shinyTabPanelInfo } from "./ShinyTabPanel";
import { shinyTabsetPanelInfo } from "./ShinyTabsetPanel";
import { shinyTextInputInfo } from "./ShinyTextInput";
import { shinyTextOutputInfo } from "./ShinyTextOutput";
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
  plotlyPlotlyOutputInfo,
  textNodeInfo,
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
function getUiNodeInfo(id: string): ShinyUiNodeInfo {
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
<<<<<<< HEAD:inst/editor/src/Shiny-Ui-Elements/registered_ui_nodes.ts
 * @param id Name of ui node to look up
 * @returns Component used to render that node
 * @throws Error if node doesn't exist
=======
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */

/**
 * Names of all the available Ui elements
 */
export const shinyids = new Set<string>(
  shinyUiNodeInfoArray.map(({ id }) => id)
);

/**
 * Go from either an unnamespaced name (e.g. `sliderInput`) or a already
 * namespaced name (`shiny::sliderInput`)  to the ui node id. Also acts as
 * a check for if a node is in known R functions
 * */
export const rFnNameToNodeId = new Map<string, string>([
  ...(shinyUiNodeInfoArray.map(({ r_info, id }) => [r_info.fn_name, id]) as [
    string,
    string
  ][]),
  ...(shinyUiNodeInfoArray.map(({ id }) => [id, id]) as [string, string][]),
]);

type PythonAwareNodeInfo = Extract<ShinyUiNodeInfo, { py_info: any }>;

/**
 * Go from either a function name (e.g. `ui.input_slider`) to the ui node id.
 * Also acts as
 * a check for if a node is in known R functions
 * */
export const pyFnNameToNodeInfo = new Map<string, PythonAwareNodeInfo>(
  shinyUiNodeInfoArray
    .filter((info) => info.py_info !== undefined)
    .map((info) => [info.py_info.fn_name, info]) as [
    string,
    PythonAwareNodeInfo
  ][]
);

/** A ui node type that type checks its values. Used for things like declaring test ui trees etc.. */
export type KnownShinyUiNode = {
  [NodeInfo in ShinyUiNodeInfo as NodeInfo["id"]]: {
    id: NodeInfo["id"];
    namedArgs: Required<NodeInfo>["example_args"];
  } & (NodeInfo["takesChildren"] extends true
    ? { children: KnownUiChildren }
    : {});
}[ShinyUiNodeInfo["id"]];

type KnownUiChildren = Array<KnownShinyUiNode>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const knownUiNodeTest: KnownShinyUiNode = {
  id: "card",
  namedArgs: { full_screen: true },
  children: [
    {
      id: "actionButton",
      namedArgs: { inputId: "btn", label: "My Button" },
    },
  ],
};

// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const knownUiNodeTestFail: KnownShinyUiNode = {
  id: "actionButton",
  namedArgs: {
    inputId: "test",
  },
};

/**
 * Ui Node with no children
 */
export type ShinyUiLeafNode = {
  id: string;
  namedArgs: namedArgsObject;
};

/**
 * Ui Node with children
 */
export type ShinyUiParentNode = ShinyUiLeafNode & {
  children?: Array<ShinyUiNode>;
};
export type ShinyUiRootNode = ShinyUiParentNode | "TEMPLATE_CHOOSER";

/**
 * General ui node that can be a leaf or a parent node
 */
export type ShinyUiNode = ShinyUiLeafNode | ShinyUiParentNode;

export type MakeShinyUiNode<
  Args extends namedArgsObject,
  TakesChildren extends boolean = false
> = {
  id: string;
  namedArgs: Args;
} & (TakesChildren extends true ? { children: Array<ShinyUiNode> } : {});

/**
 * Narrow if a node is a parent node or not
>>>>>>> 68486b3... First steps towards setting up a python-ast-to-shiny-ui-node converter:inst/editor/src/Shiny-Ui-Elements/uiNodeTypes.ts
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

import type { Expand } from "util-functions/src/TypescriptUtils";

import { bslib_card } from "./Bslib/card";
import { card_body } from "./Bslib/card_body";
import { card_footer } from "./Bslib/card_footer";
import { card_header } from "./Bslib/card_header";
import { nav_panel } from "./Bslib/nav_panel";
import { page_navbar } from "./Bslib/page_navbar";
import { sidebar } from "./Bslib/Sidebar";
import { value_box } from "./Bslib/value_box";
import { output_dt } from "./DT/output_dt";
import { grid_card } from "./gridlayout/grid_card";
import { grid_card_plot } from "./gridlayout/grid_card_plot";
import { grid_card_text } from "./gridlayout/grid_card_text";
import { grid_container } from "./gridlayout/grid_container";
import { grid_page } from "./gridlayout/grid_page";
import { testing_error_node } from "./internal/testing_error_node";
import { text_node } from "./internal/text_node";
import { unknown_code } from "./internal/unknown_code";
import type { LangInfo } from "./nodeInfoFactory";
import { output_plotly } from "./plotly/output_plotly";
import { input_action_button } from "./Shiny/input_action_button";
import { input_checkbox } from "./Shiny/input_checkbox";
import { input_checkbox_group } from "./Shiny/input_checkbox_group";
import { input_numeric } from "./Shiny/input_numeric";
import { input_radio_buttons } from "./Shiny/input_radio_buttons";
import { input_select } from "./Shiny/input_select";
import { input_slider } from "./Shiny/input_slider";
import { input_text } from "./Shiny/input_text";
import { layout_sidebar } from "./Shiny/layout_sidebar";
import { markdown_node } from "./Shiny/markdown";
import { output_plot } from "./Shiny/output_plot";
import { output_text } from "./Shiny/output_text";
import { output_ui } from "./Shiny/output_ui";
import { panel_main } from "./Shiny/panel_main";
import { tabset_panel } from "./Shiny/tabset_panel";

export type NamedArgsObject = Record<string, unknown | undefined>;

/**
 * This is the main object that contains the info about a given uiNode. Once the
 * node info object is created and added here the ui-node will be usable within
 * the editor
 */
export const all_node_info = [
  page_navbar,
  nav_panel,
  tabset_panel,
  layout_sidebar,
  panel_main,
  sidebar,
  grid_container,
  grid_card,
  grid_card_plot,
  grid_card_text,
  grid_container,
  grid_page,
  bslib_card,
  value_box,
  card_body,
  card_footer,
  card_header,
  output_dt,
  text_node,
  output_dt,
  output_plot,
  output_plotly,
  output_text,
  output_ui,
  input_action_button,
  input_checkbox,
  input_checkbox_group,
  input_numeric,
  input_radio_buttons,
  markdown_node,
  input_select,
  input_slider,
  input_text,
  testing_error_node,
  unknown_code,
] as const;

/**
 * Object that maps node ids to node info objects
 */
export const node_info_by_id = all_node_info.reduce((acc, info) => {
  acc[info.id] = info;
  return acc;
}, {} as Record<string, ShinyUiNodeInfo>) as {
  [NodeInfo in ShinyUiNodeInfo["id"]]: Extract<
    ShinyUiNodeInfo,
    { id: NodeInfo }
  >;
};

const shinyUiNodeInfo = new Map<string, ShinyUiNodeInfo>(
  all_node_info.map((info) => [info.id, info])
);

export const containerNodes = new Set<string>(
  all_node_info.filter((info) => info.takesChildren).map((info) => info.id)
);

/**
 *
 * @param id Name of ui node to look up
 * @returns Set of information about that node, or error if it doesn't exist
 * @throws Error if node doesn't exist
 */
export function getUiNodeInfo(id: string): ShinyUiNodeInfo {
  if (!shinyUiNodeInfo.has(id)) {
    throw new Error(
      `Failed to find node info for requested node on backend: ${id}`
    );
  }
  return shinyUiNodeInfo.get(id) as ShinyUiNodeInfo;
}

/**
 * Get plain english title of a node based on its id
 * @param id Name of ui node to look up
 * @returns Plain english title for node. E.g. `Slider Input`
 * @throws Error if node doesn't exist
 */
export function getUiNodeTitle(id: string): string {
  return getUiNodeInfo(id).title;
}

export type ShinyUiNodeInfo = Expand<(typeof all_node_info)[number]>;
export type ShinyUiNodeIds = ShinyUiNodeInfo["id"];
export type ShinyUiNodePyPackages = ShinyUiNodeInfo["py_info"]["package"];
export type ShinyUiNodePyFns = ShinyUiNodeInfo["py_info"]["fn_name"];
export type ShinyUiNodeCategories = Exclude<
  ShinyUiNodeInfo["category"],
  "TESTING"
>;

export type NodeInfoByRPackage = {
  [RPackage in ShinyUiNodeInfo["r_info"]["package"]]: Extract<
    ShinyUiNodeInfo,
    { r_info: { package: RPackage } }
  >;
};

/**
 * All possible props/arguments for the defined UI components
 *
 * This is the only place where any new UI element should be added as the rest
 * of the types will automatically be built based on this type.
 */

/**
 * Names of all the available Ui elements
 */
export const shinyids = new Set<string>(all_node_info.map(({ id }) => id));

type RAwareNodeInfo = Extract<ShinyUiNodeInfo, { r_info: any }>;

const r_aware_nodes = all_node_info.filter(({ r_info }) =>
  Boolean(r_info)
) as RAwareNodeInfo[];

function namespaceRFn(fn_name: string, pkg_name: string) {
  return `${pkg_name}::${fn_name}`;
}
const all_r_aware_node_names = r_aware_nodes.flatMap(({ id, r_info }) => {
  const pkg_name = r_info.package;

  let names: [string, string][] = [
    [r_info.fn_name, id],
    [namespaceRFn(r_info.fn_name, pkg_name), id],
  ];
  if ("fn_aliases" in r_info) {
    (
      r_info.fn_aliases as Required<LangInfo<NamedArgsObject>>["fn_aliases"]
    ).forEach((alias) => {
      const aliasedPkgName = alias.package || pkg_name;
      names.push(
        [alias.fn_name, id],
        [namespaceRFn(alias.fn_name, aliasedPkgName), id]
      );
    });
  }

  return names;
});

/**
 * Go from either an unnamespaced name (e.g. `sliderInput`) or a already
 * namespaced name (`shiny::sliderInput`)  to the ui node id. Also acts as
 * a check for if a node is in known R functions
 * */
export const rFnNameToNodeId = new Map<string, string>(all_r_aware_node_names);

/**
 * Go from either an unnamespaced name (e.g. `sliderInput`) or a already
 * namespaced name (`shiny::sliderInput`)  to the ui node id. Also acts as
 * a check for if a node is in known R functions
 * */
export const rFnNameToNodeInfo = (fn_name: string) => {
  const id = rFnNameToNodeId.get(fn_name);
  if (!id) {
    return undefined;
  }
  return getUiNodeInfo(id) as RAwareNodeInfo;
};

type PythonAwareNodeInfo = Extract<ShinyUiNodeInfo, { py_info: any }>;
/**
 * Go from python function name (e.g. `ui.input_slider`) to the ui node id. Also
 * acts as a check for if a node is in known python functions
 * */
export const pyFnNameToNodeInfo = new Map<string, PythonAwareNodeInfo>(
  all_node_info
    .filter((info) => info.py_info)
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

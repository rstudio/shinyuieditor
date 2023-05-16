import type { Lang_Info } from "ui-node-definitions/src/nodeInfoFactory";
import type { namedArgsObject } from "ui-node-definitions/src/uiNodeTypes";
import { all_node_info } from "ui-node-definitions/src/uiNodeTypes";

import { registered_ui_nodes } from "./Shiny-Ui-Elements/registered_ui_nodes";

type R_Aware_NodeInfo = Extract<ShinyUiNodeInfo, { r_info: any }>;
const r_aware_nodes = all_node_info.filter(({ r_info }) =>
  Boolean(r_info)
) as R_Aware_NodeInfo[];

console.log(r_aware_nodes);

type ShinyUiNodeInfo = (typeof registered_ui_nodes)[number];
const shinyUiNodeInfo = new Map<string, ShinyUiNodeInfo>(
  registered_ui_nodes.map((info) => [info.id, info])
);

const card_body_info = shinyUiNodeInfo.get("card_body");
type Aliased_R_Function = Extract<
  ShinyUiNodeInfo,
  { r_info: { fn_aliases: any[] } }
>;

function namespace_r_fn(fn_name: string, pkg_name: string) {
  return `${pkg_name}::${fn_name}`;
}
const all_r_aware_node_names = r_aware_nodes.flatMap(({ id, r_info }) => {
  const pkg_name = r_info.package;

  let names: [string, string][] = [
    [r_info.fn_name, id],
    [namespace_r_fn(r_info.fn_name, pkg_name), id],
  ];
  if ("fn_aliases" in r_info) {
    (
      r_info.fn_aliases as Required<Lang_Info<namedArgsObject>>["fn_aliases"]
    ).forEach((alias) => {
      names.push(
        [alias.fn_name, id],
        [namespace_r_fn(alias.fn_name, pkg_name), id]
      );
    });
  }

  return names;
});

console.log(all_r_aware_node_names);
// export {};
const rFnNameToNodeId = new Map<string, string>([
  ...(all_node_info.map(({ r_info, id }) => [r_info.fn_name, id]) as [
    string,
    string
  ][]),
  ...(all_node_info.map(({ id }) => [id, id]) as [string, string][]),
]);

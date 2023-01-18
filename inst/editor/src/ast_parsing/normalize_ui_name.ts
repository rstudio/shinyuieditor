import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";

const namespace_regex = /^\w+::/;
const full_ui_names = Object.keys(shinyUiNodeInfo);
const bare_to_namespaced_ui_name = new Map<string, string>(
  full_ui_names.map((n) => [n.replace(namespace_regex, ""), n])
);

/**
 * Convert a potentially unspaced ui function name to a namespaced one
 * @param ui_name Either bare or namespaced ui name
 * @returns Namespace ui name
 */
export function normalize_ui_name(ui_name: string): string {
  return bare_to_namespaced_ui_name.get(ui_name) || ui_name;
}

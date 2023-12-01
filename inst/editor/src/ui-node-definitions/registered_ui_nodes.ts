import { registered_ui_nodes } from "./uiNodeTypes";

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

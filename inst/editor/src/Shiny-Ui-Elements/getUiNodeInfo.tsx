import type { ShinyUiNodeInfo } from "./uiNodeTypes";
import { shinyUiNodeInfoArray } from "./uiNodeTypes";

const shinyUiNodeInfo = new Map<string, ShinyUiNodeInfo>(
  shinyUiNodeInfoArray.map((info) => [
    `${info.library}::${info.name}` as const,
    info,
  ])
);

export function getUiNodeInfo(uiName: string): ShinyUiNodeInfo {
  if (!shinyUiNodeInfo.has(uiName)) {
    throw new Error(`Failed to find node info for requested node: ${uiName}`);
  }
  return shinyUiNodeInfo.get(uiName) as ShinyUiNodeInfo;
}

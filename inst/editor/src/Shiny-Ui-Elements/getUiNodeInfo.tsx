import type { ShinyUiNodeInfoUnion } from "./uiNodeTypes";
import { shinyUiNodeInfo } from "./uiNodeTypes";

export function getUiNodeInfo(uiName: string): ShinyUiNodeInfoUnion {
  const info = shinyUiNodeInfo[uiName as keyof typeof shinyUiNodeInfo];

  if (!info) {
    throw new Error(`Failed to find node info for requested node: ${uiName}`);
  }
  return shinyUiNodeInfo[uiName as keyof typeof shinyUiNodeInfo];
}

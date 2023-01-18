import type { ShinyUiNode } from "../main";
import { is_object } from "../utils/is_object";

import { shinyUiNodeInfo } from "./uiNodeTypes";

export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return (
    is_object(x) &&
    "uiName" in x &&
    typeof x.uiName === "string" &&
    x.uiName in shinyUiNodeInfo
  );
}

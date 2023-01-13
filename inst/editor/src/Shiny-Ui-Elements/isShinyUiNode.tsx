import type { ShinyUiNode } from "../main";
import { is_object } from "../utils/is_object";

export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return is_object(x) && "uiName" in x;
}

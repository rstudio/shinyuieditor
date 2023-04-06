import { is_object } from "util-functions/src/is_object";

import type { ShinyUiNode } from "./uiNodeTypes";
import { shinyids } from "./uiNodeTypes";

/**
 * Check if a value is a shiny ui node in the sense that it has a `id` and
 *`namedArgs` field but not neccesarily that it is in the list of known nodes
 * @param x The node to check
 * @returns  True if the node fits the structure of a shiny ui node
 */
export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return (
    is_object(x) &&
    "id" in x &&
    typeof x.id === "string" &&
    "namedArgs" in x &&
    is_object(x.namedArgs)
  );
}

/**
 * Check if a node is a shiny ui node that resides in the list of registered
 * nodes
 * @param x The node to check
 * @returns True if the node is a shiny ui node and is registered
 */
export function isKnownShinyUiNode(x: unknown): x is ShinyUiNode {
  return (
    is_object(x) && "id" in x && typeof x.id === "string" && shinyids.has(x.id)
  );
}

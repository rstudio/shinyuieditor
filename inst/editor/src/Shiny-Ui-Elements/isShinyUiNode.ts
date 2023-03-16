import { is_object } from "util-functions/src/is_object";

import type { ShinyUiNode } from "../main";

import { shinyUiNames } from "./uiNodeTypes";

export function isShinyUiNode(x: unknown): x is ShinyUiNode {
  return (
    is_object(x) &&
    "uiName" in x &&
    typeof x.uiName === "string" &&
    shinyUiNames.has(x.uiName)
  );
}

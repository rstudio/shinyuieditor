import type { ShinyUiNode } from "../uiNodeTypes";

// type ShinyUiContainerNodes = {
//   [UiName in keyof ShinyUiNodeInfo]: ShinyUiNodeInfo[UiName]["acceptsChildren"] extends true
//     ? UiName
//     : never;
// }[keyof ShinyUiNodeInfo];

export function wrapInNode({
  child,
  parent,
}: {
  child: ShinyUiNode;
  parent: Pick<ShinyUiNode, "uiName" | "uiArguments">;
}): ShinyUiNode {
  return {
    ...parent,
    uiChildren: [child],
  } as ShinyUiNode;
}

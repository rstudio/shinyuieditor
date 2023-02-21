import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

type Wrapper = Pick<ShinyUiNode, "uiName" | "uiArguments">;
export type Wrapping_Node = Wrapper | ((child: ShinyUiNode) => Wrapper | null);

export function wrapInNode({
  child,
  wrapper,
}: {
  child: ShinyUiNode;
  wrapper: Wrapping_Node;
}): ShinyUiNode {
  if (typeof wrapper === "function") {
    const wrapping_node = wrapper(child);
    if (wrapping_node !== null) {
      wrapper = wrapping_node;
    }
  }
  return {
    ...wrapper,
    uiChildren: [child],
  } as ShinyUiNode;
}

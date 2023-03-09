import type {
  ShinyUiLeafNode,
  ShinyUiNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";

type Wrapper = Pick<ShinyUiNode, "uiName" | "uiArguments">;
export type Wrapping_Node = Wrapper | ((child: ShinyUiNode) => Wrapper | null);

type ChildToWrapperFunction = (child: ShinyUiNode) => ShinyUiLeafNode | null;
export function wrapInNode({
  child,
  wrapper,
}: {
  child: ShinyUiNode;
  wrapper: ShinyUiLeafNode | ChildToWrapperFunction;
}): ShinyUiNode {
  if (typeof wrapper === "function") {
    const wrapping_node = wrapper(child);
    if (wrapping_node === null) {
      return child;
    }

    wrapper = wrapping_node;
  }
  return {
    ...wrapper,
    uiChildren: [child],
  };
}

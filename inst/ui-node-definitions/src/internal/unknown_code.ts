import { nodeInfoFactory } from "../nodeInfoFactory";
import type { MakeShinyUiNode, ShinyUiNode } from "../ShinyUiNode";

type UnknownUiFunctionProps = {
  text: string;
  explanation?: string;
};
export type UnknownUiNode = MakeShinyUiNode<UnknownUiFunctionProps>;

export function isUnknownUiNode(node: ShinyUiNode): node is UnknownUiNode {
  return "text" in node.namedArgs && node.id === "unknownUiFunction";
}

export const unknown_code = nodeInfoFactory<UnknownUiFunctionProps>()({
  id: "unknownUiFunction",
  r_info: {
    fn_name: "unknownUiFunction",
    package: "Internal",
  },
  title: "Unknown UI Function",
  takesChildren: false,
  settingsInfo: {
    text: {
      inputType: "omitted",
      defaultValue: "Unknown Ui Function",
    },
    explanation: { inputType: "omitted", optional: true },
  },
});

import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import { walkUiNode } from "../ui-node-definitions/utils/walkUiNode";

export function getAllInputOutputIdsInApp(ui_tree: ShinyUiNode): string[] {
  const ids: string[] = [];

  walkUiNode(ui_tree, (node) => {
    const namedArgs = node.namedArgs;

    const idField = namedArgs.id || namedArgs.outputId || namedArgs.inputId;

    if (typeof idField === "string") {
      ids.push(idField);
    }
  });

  return ids;
}

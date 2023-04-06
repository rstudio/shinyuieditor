import { isShinyUiNode } from "../../../Shiny-Ui-Elements/isShinyUiNode";
import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";
type PathElement = string | number;

/**
 * Navigate into a ui node and return the node at the end of the path
 * @param tree A shiny ui node to search in
 * @param path A path to a node in the tree consisting of strings for indexing
 * into namedArgs and numbers for indexing into uiChildren
 * @returns The node at the end of the path
 */
export function getNode(tree: ShinyUiNode, path: PathElement[]): ShinyUiNode {
  if (path.length === 0) {
    return tree;
  }
  const [path_element, ...remaining_path] = path;

  if (typeof path_element === "number") {
    if (!("uiChildren" in tree) || tree.uiChildren === undefined) {
      throw new Error("Somehow trying to enter a leaf node");
    }

    const child = tree.uiChildren[path_element];

    if (!child) {
      throw new Error(
        `Requested path does not exist. Attempt: parent: ${JSON.stringify(
          tree,
          null,
          2
        )}, child_index: ${path_element}`
      );
    }
    return getNode(child, remaining_path);
  } else if (typeof path_element === "string") {
    const argValue = tree.namedArgs[path_element];

    if (argValue === undefined) {
      throw new Error(
        `Requested argument (${path_element}) does not exist on the node arguments ${JSON.stringify(
          tree.namedArgs,
          null,
          2
        )} `
      );
    }
    if (!isShinyUiNode(argValue)) {
      throw new Error(
        `Value of the argument (${path_element}) is not a ui node ${JSON.stringify(
          argValue,
          null,
          2
        )} `
      );
    }

    return getNode(argValue, remaining_path);
  }

  throw new Error(
    `Invalid path element type: '${path_element}', expected 'string' or 'number'`
  );
}

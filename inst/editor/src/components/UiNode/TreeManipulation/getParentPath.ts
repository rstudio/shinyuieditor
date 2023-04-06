import type { NodePath } from "../../../Shiny-Ui-Elements/uiNodeTypes";

export function getParentPath(path: NodePath) {
  return separateIntoParentAndChildPaths(path).parent_path;
}

/**
 * Get the index of node in parent's children array. Aka the last element of
 * their path
 * @param path Path to node
 * @returns Index corresponding to node's position in it's parents children
 * array
 */
export function getChildIndex(path: NodePath) {
  const paths = separateIntoParentAndChildPaths(path);
  if (paths.child_location === "missing") {
    throw new Error("Can't get child index from a path with no child");
  }
  return paths.child_path;
}

export function separateIntoParentAndChildPaths(path: NodePath): {
  parent_path: NodePath;
} & (
  | {
      child_location: "children";
      child_path: number;
    }
  | {
      child_location: "namedArgs";
      child_path: string;
    }
  | {
      child_location: "missing";
    }
) {
  const parent_path = [...path];
  const child_path = parent_path.pop();

  if (typeof child_path === "string") {
    return { parent_path, child_location: "namedArgs", child_path };
  } else if (typeof child_path === "number") {
    return { parent_path, child_location: "children", child_path };
  }
  return { parent_path, child_location: "missing" };
}

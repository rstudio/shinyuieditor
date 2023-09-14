import type { ParserNode } from "treesitter-parsers";

type PkgInfo = {
  names: string[];
  lines: string[];
};
/**
 * Get the names of all the libraries imported in an R script node
 * @param root_node Node for a parsed R script
 * @returns Array of library names
 */
export function getRPackagesInScript(root_node: ParserNode): PkgInfo {
  return root_node
    .descendantsOfType("call")
    .filter((node) => node.firstNamedChild?.text === "library")
    .reduce<PkgInfo>(
      (acc, node) => {
        const name = node.lastNamedChild?.text;

        if (name) {
          acc.names.push(name);
          acc.lines.push(node.text);
        }

        return acc;
      },
      { names: [], lines: [] }
    );
}

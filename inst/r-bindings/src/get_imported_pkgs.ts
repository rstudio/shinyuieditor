import type { ParserTree } from "treesitter-parsers";

/**
 * Get names of all packages that an app loads using `library(foo)`
 * @param app_tree Result of running `parse` on the whole app script
 * @returns An array of package names of packages that were imported
 */

export function get_imported_pkgs(app_tree: ParserTree): string[] {
  const call_nodes = app_tree.rootNode.descendantsOfType("call");
  let imported_pkg_names: string[] = [];
  call_nodes.forEach((node) => {
    const is_library_call =
      node.firstNamedChild &&
      node.firstNamedChild.text === "library" &&
      node.firstNamedChild.type === "identifier";

    if (!is_library_call) {
      return;
    }

    // The very first child will be the arguments of the library call. So we
    // reach into that arguments list for the pkg name
    const pkg_id_node = node.namedChild(1)?.firstChild;

    if (!pkg_id_node || pkg_id_node.type !== "identifier") {
      return;
    }

    imported_pkg_names.push(pkg_id_node.text);
  });

  return imported_pkg_names;
}

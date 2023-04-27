import type Parser from "web-tree-sitter";

/**
 * Get names of all packages that an app star imports
 * @param app_tree Result of running `parse` on the whole app script
 * @returns An array of package names of packages that were imported with a star
 * import (aka they can be used without a prefix).
 */
export function get_imported_pkgs(app_tree: Parser.Tree): string[] {
  const import_nodes = app_tree.rootNode.descendantsOfType(
    "import_from_statement"
  );

  const star_imports = import_nodes.filter(
    (node) => node.namedChild(1)?.text === "*"
  );

  let imported_pkg_names: string[] = [];

  star_imports.forEach((node) => {
    const pkg_name = node.namedChild(0)?.text;

    if (pkg_name) {
      imported_pkg_names.push(pkg_name);
    }
  });

  return imported_pkg_names;
}

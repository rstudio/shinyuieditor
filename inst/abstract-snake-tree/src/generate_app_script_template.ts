import type { Script_Generation_Template } from "communication-types/src/AppInfo";
import { SCRIPT_LOC_KEYS } from "ui-node-definitions/src/code_generation/generate_ui_script";
import type Parser from "web-tree-sitter";

/**
 * Generate the template for generating a full app script for a python app
 * @param ui_node Node representing the ui of the app script. This is retreived
 * from the function get_ui_assignment()
 * @returns A template for the app script that can be used to generate complete
 * app scripts from new ui on the client by just regexing away the markers for
 * packages and ui
 */
export function generate_app_script_template(
  ui_node: Parser.SyntaxNode
): Script_Generation_Template {
  let packages: string[] = ["shiny"];

  const full_app_script = ui_node.tree.rootNode.text;

  let templated_app_script = full_app_script
    .replace(ui_node.text, SCRIPT_LOC_KEYS.ui)
    .replace("from shiny import *", SCRIPT_LOC_KEYS.packages);

  // Remove all the other packages completely. This may cause reordering of
  // imports if the ones we find are not inline with shiny but that's okay
  for (const pkg of packages.filter((p) => p !== "shiny")) {
    templated_app_script = templated_app_script.replace(
      // Fancy regex also removes newline so we don't just end up with empty
      // lines where the old imports were
      new RegExp(`from ${pkg} import \\*\\s*\\n`),
      ""
    );
  }

  // We need to add a newline in here because the parser seems to remove it
  return { code: "\n" + templated_app_script, packages };
}

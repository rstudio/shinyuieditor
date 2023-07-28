import type { ScriptGenerationTemplate } from "communication-types/src/AppInfo";
import type { ParserNode } from "treesitter-parsers";
import { SCRIPT_LOC_KEYS } from "ui-node-definitions/src/code_generation/generate_ui_script";

export function generate_app_script_template(
  ui_node: ParserNode
): ScriptGenerationTemplate {
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
  return { code: templated_app_script, packages };
}

export function generate_multifile_app_script_template(
  ui_node: ParserNode,
  server_node: ParserNode
): ScriptGenerationTemplate {
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
  return { code: templated_app_script, packages };
}

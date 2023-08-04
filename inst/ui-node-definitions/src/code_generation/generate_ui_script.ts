import type {
  LanguageMode,
  ScriptGenerationTemplate,
} from "communication-types/src/AppInfo";

import type { ShinyUiNode } from "../ShinyUiNode";

import { uiNodeTocode } from "./ui_node_to_code";

export const SCRIPT_LOC_KEYS = {
  ui: "<UI>",
  packages: "<PACKAGES>",
};

export function generateUiScript({
  ui_tree,
  packages: existing_libraries,
  language,
  code,
}: {
  ui_tree: ShinyUiNode;
  language: LanguageMode;
} & ScriptGenerationTemplate): string {
  const ui_def = uiNodeTocode(ui_tree, language);

  // We need to check to make sure there aren't any libraries used in the ui
  // tree that are not declared in the script and add them
  const all_packages = [...existing_libraries];
  ui_def.packages.forEach((l) => {
    if (!existing_libraries.includes(l)) {
      all_packages.push(l);
    }
  });

  const app_template =
    code === "" ? (language === "R" ? dummy_R_code : dummy_python_code) : code;

  const package_calls =
    language === "R"
      ? writeRLibraryCalls(all_packages)
      : writePythonImports(all_packages);

  return app_template
    .replace(SCRIPT_LOC_KEYS.ui, ui_def.code)
    .replace(SCRIPT_LOC_KEYS.packages, package_calls);
}

export function writeRLibraryCalls(libraries: string[]): string {
  return libraries.map((l) => `library(${l})`).join("\n");
}

function writePythonImports(packages: string[]): string {
  return packages.map((pkg) => `from ${pkg} import *`).join("\n");
}

const dummy_R_code: string = `
<PACKAGES>

ui <- <UI>

server <- function(input, output) {

}

shinyApp(ui, server)
`;

const dummy_python_code: string = `
<PACKAGES>

app_ui = <UI>

def server(input, output, session):
  pass

app = App(app_ui, server)
`;

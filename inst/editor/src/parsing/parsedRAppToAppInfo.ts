import type { AppInfo, LanguageMode } from "communication-types/src/AppInfo";

import { generatePythonAppScriptTemplate } from "../python-parsing/generate_app_script_template";
import { getPythonServerLocations } from "../python-parsing/parsePythonApp";
import { pythonTreesitterToUiTree } from "../python-parsing/pythonTreesitterToUiTree";
import { generateRAppScriptTemplate } from "../r-parsing/generate_app_script_template";
import { getRServerLocations } from "../r-parsing/parseRApp";
import { rTreesitterToUiTree } from "../r-parsing/rTreesitterToUiTree";

import type { ParsedAppInfo } from "./ParsedAppInfo";

/**
 * Go from the parsed app info and some metadata to the full app info object
 * needed for the main app state
 * @param language The language of the app script. Either R or PYTHON
 * @param app_script The full app script
 * @param ui_node The node representing the ui of the app script
 * @param server_node The node representing the server of the app script
 * @param root_node The root node of the app script (Not currently used)
 * @returns The full app info object
 */
export function parsedAppToAppInfo({
  language,
  app_script,
  ui_node,
  server_node,
}: ParsedAppInfo & {
  language: LanguageMode;
  app_script: string;
}): AppInfo {
  if (language === "R") {
    return {
      language: "R",
      app_script,
      ui_tree: rTreesitterToUiTree(ui_node),
      server_locations: getRServerLocations(server_node),
      app: generateRAppScriptTemplate(ui_node),
    };
  }

  if (language === "PYTHON") {
    return {
      language: "PYTHON",
      app_script,
      ui_tree: pythonTreesitterToUiTree(ui_node),
      server_locations: getPythonServerLocations(server_node),
      app: generatePythonAppScriptTemplate(ui_node),
    };
  }

  throw new Error(`Unknown language ${language}`);
}

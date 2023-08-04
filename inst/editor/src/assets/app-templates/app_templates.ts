import type { MessageToBackendByPath } from "communication-types";
import type { AppInfo, LanguageMode } from "communication-types/src/AppInfo";
import type {
  MultiFileTemplateSelection,
  SingleFileTemplateSelection,
  TemplateInfo,
} from "communication-types/src/AppTemplates";
import { indent_line_breaks } from "ui-node-definitions/src/code_generation/build_function_text";
import { generate_full_app_script } from "ui-node-definitions/src/code_generation/generate_full_app_script";
import {
  SCRIPT_LOC_KEYS,
  write_R_library_calls,
} from "ui-node-definitions/src/code_generation/generate_ui_script";

import { chickWeightsGridTemplate } from "./templates/chickWeightsGrid";
import { chickWeightsNavbar } from "./templates/chickWeightsNavbar";
import { gridGeyserTemplate } from "./templates/gridGeyser";
import { sidebarPlotGridTemplate } from "./templates/sidebarPlotGrid";

export const app_templates: TemplateInfo[] = [
  gridGeyserTemplate,
  sidebarPlotGridTemplate,
  chickWeightsNavbar,
  chickWeightsGridTemplate,
];

export function templateToAppContents(
  selection: SingleFileTemplateSelection | MultiFileTemplateSelection,
  language: LanguageMode
): MessageToBackendByPath["UPDATED-APP"] {
  const app_info =
    selection.outputType === "SINGLE-FILE"
      ? templateToSingleFileInfo(selection)
      : templateToMultiFileInfo(selection);
  return generate_full_app_script(app_info, { include_info: true, language });
}

function templateToSingleFileInfo(
  template_info: SingleFileTemplateSelection
): AppInfo {
  const {
    uiTree,
    otherCode: {
      uiExtra = "",
      serverExtra = "",
      serverFunctionBody = "",
      serverLibraries = [],
    },
  } = template_info;
  const code = `${SCRIPT_LOC_KEYS.packages}

${uiExtra}
ui <- ${SCRIPT_LOC_KEYS.ui}

${serverExtra}
server <- function(input, output) {
  ${indent_line_breaks(serverFunctionBody)}
}

shinyApp(ui, server)
  
`;

  return {
    ui_tree: uiTree,
    scripts: {
      app_type: "SINGLE-FILE",
      app: code,
    },
    language: "R",
    app_type: "SINGLE-FILE",
    known_outputs: [],
    app: {
      code,
      packages: ["shiny", ...serverLibraries],
    },
  };
}

function templateToMultiFileInfo(
  template_info: MultiFileTemplateSelection
): AppInfo {
  const {
    uiTree,
    otherCode: {
      uiExtra = "",
      serverExtra = "",
      serverFunctionBody = "",
      serverLibraries = [],
    },
  } = template_info;
  const ui_code = `${SCRIPT_LOC_KEYS.packages}

${uiExtra}
ui <- ${SCRIPT_LOC_KEYS.ui}
`;
  const server_code = `${write_R_library_calls(serverLibraries)}

${serverExtra}
server <- function(input, output) {
  ${indent_line_breaks(serverFunctionBody)}
}
`;

  return {
    app_type: "MULTI-FILE",
    scripts: {
      app_type: "MULTI-FILE",
      ui: ui_code,
      server: server_code,
    },
    language: "R",
    ui_tree: uiTree,
    known_outputs: [],
    ui: {
      code: ui_code,
      packages: ["shiny", ...serverLibraries],
    },
    server: {
      code: server_code,
    },
  };
}

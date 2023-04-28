import type { MessageToBackendByPath } from "communication-types";
import type { App_Info, Language_Mode } from "communication-types/src/AppInfo";
import type {
  Multi_File_Template_Selection,
  Single_File_Template_Selection,
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

export const app_templates: TemplateInfo[] = [
  gridGeyserTemplate,
  chickWeightsNavbar,
  chickWeightsGridTemplate,
];

export function template_to_app_contents(
  selection: Single_File_Template_Selection | Multi_File_Template_Selection,
  language: Language_Mode
): MessageToBackendByPath["UPDATED-APP"] {
  const app_info =
    selection.outputType === "SINGLE-FILE"
      ? template_to_single_file_info(selection)
      : template_to_multi_file_info(selection);

  return generate_full_app_script(app_info, { include_info: true, language });
}

function template_to_single_file_info({
  uiTree,
  otherCode: {
    uiExtra = "",
    serverExtra = "",
    serverFunctionBody = "",
    serverLibraries = [],
  },
}: Single_File_Template_Selection): App_Info {
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
    language: "R",
    app_type: "SINGLE-FILE",
    known_outputs: [],
    app: {
      code,
      packages: ["shiny", ...serverLibraries],
    },
  };
}

function template_to_multi_file_info({
  uiTree,
  otherCode: {
    uiExtra = "",
    serverExtra = "",
    serverFunctionBody = "",
    serverLibraries = [],
  },
}: Multi_File_Template_Selection): App_Info {
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

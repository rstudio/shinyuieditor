import type { MessageToBackendByPath } from "communication-types";
import type {
  Multi_File_Template_Selection,
  Single_File_Template_Selection,
  TemplateInfo,
} from "communication-types/src/AppTemplates";

import type {
  Single_File_Full_Info,
  Multi_File_Full_Info,
} from "../../ast_parsing";
import { SCRIPT_LOC_KEYS } from "../../ast_parsing";
import { indent_line_breaks } from "../../ast_parsing/code_generation/build_function_text";
import { generate_full_app_script } from "../../ast_parsing/generate_full_app_script";
import { write_library_calls } from "../../ast_parsing/generate_ui_script";

import { chickWeightsGridTemplate } from "./templates/chickWeightsGrid";
import { chickWeightsNavbar } from "./templates/chickWeightsNavbar";
import { gridGeyserTemplate } from "./templates/gridGeyser";

export const app_templates: TemplateInfo[] = [
  gridGeyserTemplate,
  chickWeightsNavbar,
  chickWeightsGridTemplate,
];

export function template_to_app_contents(
  selection: Single_File_Template_Selection | Multi_File_Template_Selection
): MessageToBackendByPath["UPDATED-APP"] {
  const app_info =
    selection.outputType === "SINGLE-FILE"
      ? template_to_single_file_info(selection)
      : template_to_multi_file_info(selection);

  return generate_full_app_script(app_info, { include_info: true });
}

function template_to_single_file_info({
  uiTree,
  otherCode: {
    uiExtra = "",
    serverExtra = "",
    serverFunctionBody = "",
    serverLibraries = [],
  },
}: Single_File_Template_Selection): Single_File_Full_Info {
  const code = `${SCRIPT_LOC_KEYS.libraries}

${uiExtra}
ui <- ${SCRIPT_LOC_KEYS.ui}

${serverExtra}
server <- function(input, output) {
  ${indent_line_breaks(serverFunctionBody)}
}

shinyApp(ui, server)
  
`;

  return {
    app_type: "SINGLE-FILE",
    ui_tree: uiTree,
    app: {
      code,
      libraries: ["shiny", ...serverLibraries],
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
}: Multi_File_Template_Selection): Multi_File_Full_Info {
  const ui_code = `${SCRIPT_LOC_KEYS.libraries}

${uiExtra}
ui <- ${SCRIPT_LOC_KEYS.ui}
`;
  const server_code = `${write_library_calls(serverLibraries)}

${serverExtra}
server <- function(input, output) {
  ${indent_line_breaks(serverFunctionBody)}
}
`;

  return {
    app_type: "MULTI-FILE",
    ui_tree: uiTree,
    ui: {
      code: ui_code,
      libraries: ["shiny", ...serverLibraries],
    },
    server: {
      code: server_code,
    },
  };
}

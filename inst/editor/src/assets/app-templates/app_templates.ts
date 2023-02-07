import { indent_line_breaks } from "ast-parsing/src/code_generation/build_function_text";
import type {
  TemplateInfo,
  TemplateSelection,
} from "communication-types/src/AppTemplates";

import type { Full_App_Info } from "../../backendCommunication/full_app_info";
import { SCRIPT_LOC_KEYS } from "../../backendCommunication/full_app_info";

import { chickWeightsGridTemplate } from "./templates/chickWeightsGrid";
import { chickWeightsNavbar } from "./templates/chickWeightsNavbar";
import { gridGeyserTemplate } from "./templates/gridGeyser";

export const app_templates: TemplateInfo[] = [
  gridGeyserTemplate,
  chickWeightsNavbar,
  chickWeightsGridTemplate,
];

export function template_to_full_info({
  uiTree,
  otherCode: {
    uiExtra = "",
    serverExtra = "",
    serverFunctionBody = "",
    serverLibraries = [],
  },
}: TemplateSelection): Full_App_Info {
  const code = `
${SCRIPT_LOC_KEYS.libraries}

${uiExtra}
ui <- ${SCRIPT_LOC_KEYS.ui}

${serverExtra}
server <- function(input, output) {
  ${indent_line_breaks(serverFunctionBody)}
}

shinyApp()
  
`;

  return {
    code,
    libraries: ["shiny", ...serverLibraries],
    ui_tree: uiTree,
  };
}

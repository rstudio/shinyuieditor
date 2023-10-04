import type { MessageToBackendByPath } from "communication-types";
import type { AppInfo, LanguageMode } from "communication-types/src/AppInfo";
import type {
  TemplateSelection,
  TemplateInfo,
} from "communication-types/src/AppTemplates";

import { generateFullAppScript } from "../../ui-node-definitions/code_generation/generate_full_app_script";
import { SCRIPT_LOC_KEYS } from "../../ui-node-definitions/code_generation/generate_ui_script";
import { indentLineBreaks } from "../../ui-node-definitions/code_generation/utils";

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
  selection: TemplateSelection,
  language: LanguageMode
): MessageToBackendByPath["UPDATED-APP"] {
  const app_info = templateToSingleFileInfo(selection);
  return generateFullAppScript(app_info, { include_info: true });
}

function templateToSingleFileInfo(template_info: TemplateSelection): AppInfo {
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
  ${indentLineBreaks(serverFunctionBody)}
}

shinyApp(ui, server)
  
`;

  return {
    ui_tree: uiTree,
    scripts: {
      app: code,
    },
    language: "R",
    app: {
      code,
      packages: ["shiny", ...serverLibraries],
    },
  };
}

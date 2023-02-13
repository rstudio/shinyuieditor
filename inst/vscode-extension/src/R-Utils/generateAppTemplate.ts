import type { TemplateSelection } from "communication-types";

import { collapseText } from "../string-utils";

export async function generateAppTemplate({
  ui_code,
  library_calls,
  otherCode: { uiExtra, serverFunctionBody, serverExtra, serverLibraries },
}: TemplateSelection): Promise<string> {
  const unique_libraries = new Set([
    ...(serverLibraries ?? []),
    ...library_calls,
  ]);

  const all_library_calls = [...unique_libraries].map((l) => `library(${l})`);

  const server_def = [
    "server <- function(input, output) {",
    serverFunctionBody,
    "}",
  ];

  const ui_def = "ui <- " + ui_code;

  const app_file = collapseText(
    ...all_library_calls,
    uiExtra,
    "",
    ui_def,
    "",
    serverExtra,
    "",
    ...server_def,
    "",
    "shinyApp(ui, server)"
  );

  return app_file;
}

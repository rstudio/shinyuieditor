import type { TemplateSelection } from "communication-types";

import { collapseText } from "../string-utils";

import { formatRCode } from "./formatRCode";
import { generateUpdatedUiCode } from "./generateUpdatedUiCode";
import type { ActiveRSession } from "./startBackgroundRProcess";

export async function generateAppTemplate(
  RProcess: ActiveRSession,
  {
    uiTree,
    otherCode: { uiExtra, serverFunctionBody, serverExtra, serverLibraries },
  }: TemplateSelection
): Promise<string> {
  const { text: ui_def_text, namespaces_removed } = await generateUpdatedUiCode(
    uiTree,
    RProcess
  );
  const unique_libraries = new Set([
    ...(serverLibraries ?? []),
    ...namespaces_removed,
  ]);
  const library_calls = [...unique_libraries].map((l) => `library(${l})`);

  const server_def = [
    "server <- function(input, output) {",
    serverFunctionBody,
    "}",
  ];

  const ui_def = "ui <- " + collapseText(...ui_def_text);

  const app_file = collapseText(
    ...library_calls,
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

  const formattedApp = await formatRCode(RProcess, app_file);

  return formattedApp;
}

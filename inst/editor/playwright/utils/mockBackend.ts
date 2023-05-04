import type { Page } from "@playwright/test";

import type { Minimal_App_Info } from "../../src/backendCommunication/getClientsideOnlyTree";

export async function mockBackendState(
  page: Page,
  info: Minimal_App_Info | Omit<Minimal_App_Info, "ui_tree">
) {
  // If we only have the language passed then we are in the template chooser mode
  if (!("ui_tree" in info)) {
    info = {
      ui_tree: "TEMPLATE_CHOOSER",
      language: info.language,
    };
  }
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(info),
    })
  );
}

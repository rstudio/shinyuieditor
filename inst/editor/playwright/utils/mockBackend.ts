import type { Page } from "@playwright/test";

import type { MinimalAppInfo } from "../../src/backendCommunication/getClientsideOnlyTree";

export async function mockBackendState(
  page: Page,
  info: MinimalAppInfo | Omit<MinimalAppInfo, "ui_tree">
) {
  // If we only have the language passed then we are in the template chooser mode
  if (!("ui_tree" in info)) {
    info = {
      app_script: "TEMPLATE_CHOOSER",
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

import type { Page } from "@playwright/test";
import type { LanguageMode } from "communication-types/src/AppInfo";

import type { ShinyUiNode } from "../../src/ui-node-definitions/ShinyUiNode";

export async function mockBackendState(
  page: Page,
  info: { language: LanguageMode } & ({ ui_tree: ShinyUiNode } | {})
) {
  const payload = JSON.stringify({
    ui_tree: "ui_tree" in info ? info.ui_tree : "TEMPLATE_CHOOSER",
    language: info.language,
  });

  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: payload,
    })
  );
}

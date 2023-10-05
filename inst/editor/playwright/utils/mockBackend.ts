import type { Page } from "@playwright/test";
import type { LanguageMode } from "communication-types/src/AppInfo";

import type { ShinyUiNode } from "../../src/ui-node-definitions/ShinyUiNode";

export async function mockBackendState(
  page: Page,
  info: { language: LanguageMode } & (
    | { ui_tree: ShinyUiNode }
    | {}
    | { app_script: string }
  )
) {
  const payload: Record<string, unknown> = {
    language: info.language,
  };

  if ("ui_tree" in info) {
    payload["ui_tree"] = info.ui_tree;
  } else if ("app_script" in info) {
    payload["app_script"] = info.app_script;
  } else {
    payload["ui_tree"] = "TEMPLATE_CHOOSER";
  }

  // ui_tree: "ui_tree" in info ? info.ui_tree : "TEMPLATE_CHOOSER",
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(payload),
    })
  );
}

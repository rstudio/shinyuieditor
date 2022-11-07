import type { Page } from "@playwright/test";

import type { ShinyUiRootNode } from "../../src/Shiny-Ui-Elements/uiNodeTypes";

export async function mockBackendState(page: Page, state: ShinyUiRootNode) {
  await page.route("/testing-tree", (route) =>
    route.fulfill({
      status: 200,
      body: JSON.stringify(state),
    })
  );
}

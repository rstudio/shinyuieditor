import { expect, test } from "@playwright/test";

import { errorTestingTree } from "../src/state/sample_ui_trees/errorTesting";

import { mockBackendState } from "./utils/mockBackend";

test("Errors are caught and not allowed to propigate up beyond their local position in app", async ({
  page,
}) => {
  // Mock the window.open() api so we can check to see if the bug report link
  // generated proper url
  const linksOpened: string[] = [];
  let logLinkOpening: (msg: string) => void;
  await page.exposeFunction("logLinkOpening", (msg: string) =>
    linksOpened.push(msg)
  );
  await page.addInitScript(() => {
    // Override the method to always return mock battery info.
    window.open = (
      url?: string | URL | undefined,
      target?: string | undefined,
      features?: string | undefined
    ) => {
      logLinkOpening(url as string);
      return null;
    };
  });

  await mockBackendState(page, errorTestingTree);

  await page.goto("/");

  const non_errored_node_selector = page.getByRole("heading", {
    name: "Error Node! I throw errors",
  });
  const undo_state_change_button_selector = page.getByText("Undo last change");

  const node_error_trigger = page.getByRole("button", {
    name: "Throw an error",
  });

  // Page should load without error
  await expect(non_errored_node_selector).toBeVisible();

  // Trigger error
  await node_error_trigger.click();

  // Error message should be visible now
  await expect(
    page.getByRole("heading", {
      name: "Something went wrong rendering TESTING::error_node()",
    })
  ).toBeVisible();

  // The original node should now be gone
  await expect(non_errored_node_selector).not.toBeVisible();

  // Since this is a fresh app with no changes the undo button should not be shown
  await expect(undo_state_change_button_selector).not.toBeVisible();

  // Can try rerendering the app with reset button.
  await page.getByRole("button", { name: "Reset" }).click();

  // This will work here and the error message should be gone
  await expect(non_errored_node_selector).toBeVisible();

  // Now we will trigger an error in the settings panel
  // First we need to select the node to make sure it's settings panel is visible
  await non_errored_node_selector.click();
  await page.getByRole("textbox", { name: "Message for error:" }).click();
  await page
    .getByRole("textbox", { name: "Message for error:" })
    .fill("Trigger settings error");

  const settings_panel_error_header = page.getByRole("heading", {
    name: "Error rendering settings panel",
  });

  // Error message should be visible now in the settings panel
  await expect(settings_panel_error_header).toBeVisible();

  // Because we've made a state change we can try undoing that state change which should fix the error
  await undo_state_change_button_selector.click();
  await expect(settings_panel_error_header).not.toBeVisible();

  // Now we can trigger another error in the main editor to test out the generation of an automatic bug report
  await node_error_trigger.click();

  // Click bug report button
  await page.getByRole("link", { name: "Submit bug report" }).click();

  // Check to make sure our mocked function was called with a new issue url
  expect(linksOpened[0]).toMatch(
    /https:\/\/github.com\/rstudio\/shinyuieditor\/issues\/new/
  );
});

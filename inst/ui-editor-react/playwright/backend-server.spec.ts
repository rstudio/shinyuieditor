import { expect, test } from "@playwright/test";

import {
  containsAppFile,
  setupBackendServer,
} from "./utils/start_uieditor_backend";

test("Template chooser can change between templates mid-session", async ({
  page,
  browserName,
}, info) => {
  test.skip(browserName !== "chromium", "Backend tests only need one browser");
  const backendServer = await setupBackendServer({
    app_dir_root: info.outputDir,
  });

  await page.goto(backendServer.app_url);

  // The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Select a template`)).toBeDisabled();

  // Select first available template
  await page
    .getByRole("article", { name: "App template preview card" })
    .first()
    .click();

  // Make sure we're in single-file output mode
  await page.getByLabel("Single file mode").check();

  await page
    .getByRole("button", { name: "Start editor with selected template" })
    .click();

  // Wait for the edit view to be available be looking for the elements panel
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  const singleFileModeFiles = await backendServer.get_app_folder_contents();

  expect(containsAppFile(singleFileModeFiles, "app")).toBe(true);

  // Press back button
  await page.getByRole("button", { name: "Undo last change" }).click();

  // Make sure we're back in the template view
  await expect(page.locator(`text=Choose App Template`)).toBeVisible();

  // Switch to multi-file output mode
  await page.getByLabel("Multi file mode").check();

  // Select first template again and go into editor
  await page
    .getByRole("article", { name: "App template preview card" })
    .first()
    .click();

  await page
    .getByRole("button", { name: "Start editor with selected template" })
    .click();

  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  const multiFileModeFiles = await backendServer.get_app_folder_contents();
  // Contains both ui and server files and doesn't contain an app.r file
  expect(containsAppFile(multiFileModeFiles, "ui")).toBe(true);
  expect(containsAppFile(multiFileModeFiles, "server")).toBe(true);
  expect(containsAppFile(multiFileModeFiles, "app")).toBe(false);
});

test("Ending on template chooser will clear any template files written", async ({
  page,
}, info) => {
  const backendServer = await setupBackendServer({
    app_dir_root: info.outputDir,
  });

  await page.goto(backendServer.app_url);

  // Select first available template
  await page
    .getByRole("article", { name: "App template preview card" })
    .first()
    .click();

  await page
    .getByRole("button", { name: "Start editor with selected template" })
    .click();

  // Wait for the edit view to be available be looking for the elements panel
  await expect(page.getByRole("heading", { name: "Elements" })).toBeVisible();

  const inEditModeFiles = await backendServer.get_app_folder_contents();

  expect(Object.keys(inEditModeFiles).length).toBeGreaterThan(0);

  // Press back button
  await page.getByRole("button", { name: "Undo last change" }).click();

  // Make sure we're back in the template view
  await expect(page.locator(`text=Choose App Template`)).toBeVisible();

  // Close browser
  await page.close();

  // Wait for the server to be shut down
  await backendServer.serverClosed;

  // Now the app folder should be empty
  const afterCloseFiles = await backendServer.get_app_folder_contents();
  expect(Object.keys(afterCloseFiles).length).toEqual(0);
});
// test("Geyser template app manipulation", async ({ page }, info) => {
//   const backendServer = await setupBackendServer({
//     template_to_use: "../app-templates/geyser_multi-file/",
//     app_dir_root: info.outputDir,
//   });

//   await page.goto(backendServer.app_url);

//   //   The default state is no selection thus the proceed button shouldn't be allowed
//   await expect(page.locator(`text=Geysers`)).toBeVisible();

//   // const file_contents = await backendServer.get_app_folder_contents();
//   // console.log("Contents of app dir", file_contents);

//   // console.log("End of app file", endingFileContents);
// });

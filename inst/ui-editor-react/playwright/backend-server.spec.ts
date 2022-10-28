import { expect, test } from "@playwright/test";

import { setupBackendServer } from "./utils/start_uieditor_backend";

const portForApp = 8888;

test("Template chooser is shown when app folder is empty", async ({
  page,
}, info) => {
  const backendServer = await setupBackendServer({
    app_dir_root: info.outputDir,
    port: portForApp,
  });

  // await page.goto(`localhost:${portForApp}`);
  await page.goto(`/`);

  //   The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Select a template`)).toBeDisabled();

  // const endingFileContents = await backendServer.get_app_file_text();

  // console.log("End of app file", endingFileContents);
});

test("Geyser template app manipulation", async ({ page }, info) => {
  const backendServer = await setupBackendServer({
    template_to_use: "../app-templates/geyser/app.R",
    app_dir_root: info.outputDir,
    port: portForApp,
  });

  // await page.goto(`localhost:${portForApp}`);
  await page.goto(`/`);

  //   The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Geysers`)).toBeVisible();

  const endingFileContents = await backendServer.get_app_file_text();

  // console.log("End of app file", endingFileContents);
});

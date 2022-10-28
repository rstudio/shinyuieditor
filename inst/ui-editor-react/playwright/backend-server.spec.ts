import { expect, test } from "@playwright/test";

import { setupBackendServer } from "./utils/start_uieditor_backend";

test("Template chooser is shown when app folder is empty", async ({
  page,
}, info) => {
  const backendServer = await setupBackendServer({
    app_dir_root: info.outputDir,
  });

  await page.goto(backendServer.app_url);

  //   The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Select a template`)).toBeDisabled();

  // await backendServer.get_app_folder_contents();

  // console.log("End of app file", endingFileContents);
});

test("Geyser template app manipulation", async ({ page }, info) => {
  const backendServer = await setupBackendServer({
    template_to_use: "../app-templates/geyser_multi-file/",
    app_dir_root: info.outputDir,
  });

  await page.goto(backendServer.app_url);

  //   The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Geysers`)).toBeVisible();

  // const file_contents = await backendServer.get_app_folder_contents();
  // console.log("Contents of app dir", file_contents);

  // console.log("End of app file", endingFileContents);
});

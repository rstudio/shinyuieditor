import { expect, test } from "@playwright/test";

import { setupBackendServer } from "./utils/start_uieditor_backend";

const portForApp = 8888;
test("Can see app hosted by backend server", async ({ page }, info) => {
  const backendServer = await setupBackendServer({
    template_to_use: "../app-templates/geyser/app.R",
    app_dir_root: info.snapshotDir,
    port: portForApp,
  });

  // await page.goto(`localhost:${portForApp}`);
  await page.goto(`/`);

  //   The default state is no selection thus the proceed button shouldn't be allowed
  await expect(page.locator(`text=Geysers`)).toBeVisible();

  const endingFileContents = await backendServer.get_app_file_text();

  // console.log("End of app file", endingFileContents);
});

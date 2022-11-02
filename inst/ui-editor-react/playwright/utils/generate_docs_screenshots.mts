import { chromium } from "playwright";

const screenshots_root = "../../vignettes/screenshots/";

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.setViewportSize({ width: 1260, height: 800 });
  await page.goto("localhost:3000");

  await page.screenshot({ path: screenshots_root + "template-chooser.png" });
  console.log("✅ Template chooser");

  await browser.close();
})();

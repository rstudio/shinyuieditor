import { chromium } from "playwright";

const screenshots_root = "../../vignettes/screenshots/";

(async () => {
  // Run with try and catch error with message telling user they need to run the dev server before running this script

  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    await page.setViewportSize({ width: 1260, height: 800 });
    await page.goto("localhost:3000");

    await page.screenshot({ path: screenshots_root + "template-chooser.png" });
    console.log("✅ Template chooser");
  } catch (error) {
    console.error(`Failed to generate screenshots for docs. 
    Make sure you have run the devYou need to run the dev server before running this script.`);
  }

  await browser.close();
})();

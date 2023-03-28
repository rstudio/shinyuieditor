import { test, expect } from "@playwright/experimental-ct-react";

import { IconSelector } from "../../src/Shiny-Ui-Elements/Bslib/ValueBox/IconSelector";

test("event should work", async ({ mount, page }) => {
  let clicked = false;

  // Mount a component. Returns locator pointing to the component.
  const component = await mount(
    <IconSelector
      initialValue="bootstrap"
      onIconSelect={(icon) => {
        console.log("Chose icon", icon);
      }}
    />
  );

  const search_box = await component.getByPlaceholder("Search for icon...");

  await search_box.click();
  await search_box.fill("window");

  // We need to use page here instead of component because the options are
  // rendering in a portal outside the scope of the component

  const options_list = await page.getByRole("listbox");
  await expect(options_list).toBeVisible();

  const number_of_options = await page.getByRole("option").count();

  await expect(number_of_options).toBeGreaterThanOrEqual(2);

  await page.getByText("window-fullscreen").click();

  await expect(search_box).toHaveValue("window-fullscreen");

  // There should be no visible options now
  await expect(options_list).toBeHidden();
});

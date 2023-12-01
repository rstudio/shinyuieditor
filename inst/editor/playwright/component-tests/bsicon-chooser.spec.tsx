import { test, expect } from "@playwright/experimental-ct-react";

import { IconSelector } from "../../src/ui-node-definitions/Bslib/ValueBox/IconSelector";

test("Can choose icons with search", async ({ mount, page }) => {
  let chosen_icon: string | null = null;

  // Mount a component. Returns locator pointing to the component.
  const component = await mount(
    <IconSelector
      initialValue="bootstrap"
      onIconSelect={(icon) => {
        chosen_icon = icon;
      }}
    />
  );

  const search_box = component.getByPlaceholder("Search for icon...");

  await search_box.click();
  await search_box.fill("window");

  // We need to use page here instead of component because the options are
  // rendering in a portal outside the scope of the component

  const options_list = page.getByRole("listbox");
  await expect(options_list).toBeVisible();

  const number_of_options = await options_list.getByRole("option").count();

  expect(number_of_options).toBeGreaterThanOrEqual(2);

  await options_list.getByText("window-fullscreen").click();

  await expect(search_box).toHaveValue("window-fullscreen");

  // There should be no visible options now
  await expect(options_list).toBeHidden();

  expect(chosen_icon).toBe("window-fullscreen");

  await search_box.fill("git");

  const first_option = options_list.getByRole("option").first();
  const second_option = options_list.getByRole("option").nth(1);
  const second_option_name = await second_option.getAttribute("aria-label");

  // The first option should be highlighted/selected
  await expect(first_option).toHaveAttribute("aria-selected", "true");

  // Can navigate with arrow keys
  await search_box.press("ArrowDown");

  // Now the second option should be selected
  await expect(second_option).toHaveAttribute("aria-selected", "true");

  // and the first should not be selected
  await expect(first_option).toHaveAttribute("aria-selected", "false");

  // Now we can select the second option with the enter key
  await search_box.press("Enter");
  expect(chosen_icon).toBe(second_option_name);
});

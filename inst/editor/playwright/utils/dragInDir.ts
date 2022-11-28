import type { Locator, Page } from "@playwright/test";

export async function dragInDir(
  page: Page,
  toDragLocator: Locator,
  { x_px = 0, y_px = 0 }: { x_px?: number; y_px?: number }
) {
  const originBox = (await toDragLocator.boundingBox())!;

  await toDragLocator.hover();
  await page.mouse.down();
  await page.mouse.move(originBox.x + x_px, originBox.y + y_px);
  await page.mouse.up();
}

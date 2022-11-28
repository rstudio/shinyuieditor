import type { Page } from "@playwright/test";

export async function dragDrop(
  page: Page,
  originSelector: string,
  destinationSelector: string
) {
  const originElement = await page.waitForSelector(originSelector);
  const destinationElement = await page.waitForSelector(destinationSelector);

  await originElement.hover();
  await page.mouse.down();
  const originBox = (await originElement.boundingBox())!;

  // Move mouse a tiny bit to drigger drag event
  await page.mouse.move(originBox.x + 5, originBox.y + 5);

  const destinationBox = (await destinationElement.boundingBox())!;

  await page.mouse.move(
    destinationBox.x + destinationBox.width / 2,
    destinationBox.y + destinationBox.height / 2
  );
  // await destinationElement.hover();
  await page.mouse.up();
}

import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";

import swapItems from "./swapItems";

describe("Swap items", () => {
  const baseLayout: TemplatedGridProps = {
    areas: [
      ["a", "a", "b"],
      ["c", "c", "c"],
      ["d", "e", "e"],
    ],
    rowSizes: ["1fr", "1fr", "1fr"],
    colSizes: ["1fr", "1fr", "1fr"],
    gapSize: "10px",
  };
  test("Simple swap", () => {
    expect(
      swapItems(baseLayout, { item_a: "a", item_b: "e" }).areas
    ).toStrictEqual([
      ["e", "e", "b"],
      ["c", "c", "c"],
      ["d", "a", "a"],
    ]);
  });

  test("Errors if swap is invalid", () => {
    expect(() => {
      swapItems(baseLayout, { item_a: "a", item_b: "invalidArea" });
    }).toThrowError(
      `Attempted an invalid swap. Item "invalidArea" is not in layout.`
    );
  });
});

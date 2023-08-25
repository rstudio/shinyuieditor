import { swapItems } from "./swapItems";
import type { TemplatedGridProps } from "./TemplatedGridProps";

describe("Swap items", () => {
  const baseLayout: TemplatedGridProps = {
    areas: [
      ["a", "a", "b"],
      ["c", "c", "c"],
      ["d", "e", "e"],
    ],
    row_sizes: ["1fr", "1fr", "1fr"],
    col_sizes: ["1fr", "1fr", "1fr"],
    gap_size: "10px",
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

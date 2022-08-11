import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";

import { removeItems, removeItem } from "./removeItem";

describe("Remove single item", () => {
  const baseLayout: TemplatedGridProps = {
    areas: [
      ["a", "b", "b"],
      ["a", "c", "d"],
      ["e", "e", "f"],
    ],

    row_sizes: ["1fr", "1fr", "1fr"],
    col_sizes: ["1fr", "1fr", "1fr"],
    gap_size: "10px",
  };
  test("Remove a", () => {
    expect(removeItem(baseLayout, "a").areas).toStrictEqual([
      [".", "b", "b"],
      [".", "c", "d"],
      ["e", "e", "f"],
    ]);
  });
  test("Remove b", () => {
    expect(removeItem(baseLayout, "b").areas).toStrictEqual([
      ["a", ".", "."],
      ["a", "c", "d"],
      ["e", "e", "f"],
    ]);
  });

  test("Remove non-existant item", () => {
    expect(removeItem(baseLayout, "doesntExist").areas).toStrictEqual(
      baseLayout.areas
    );
  });
});

describe("Remove multiple items", () => {
  const baseLayout: TemplatedGridProps = {
    areas: [
      ["a", "b", "b"],
      ["a", "c", "d"],
      ["e", "e", "f"],
    ],
    row_sizes: ["1fr", "1fr", "1fr"],
    col_sizes: ["1fr", "1fr", "1fr"],
    gap_size: "10px",
  };

  test("Remove a and b", () => {
    expect(removeItems(baseLayout, ["a", "b"]).areas).toStrictEqual([
      [".", ".", "."],
      [".", "c", "d"],
      ["e", "e", "f"],
    ]);
  });

  test("Works same as removeItem with just one name provided", () => {
    expect(removeItems(baseLayout, ["a"]).areas).toStrictEqual(
      removeItem(baseLayout, "a").areas
    );
  });

  // test("Remove non-existant item", () => {
  //   expect(removeItem(baseLayout, "doesntExist").areas).toStrictEqual(
  //     baseLayout.areas
  //   );
  // });
});

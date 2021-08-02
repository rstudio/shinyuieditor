import type { GridItemDef } from "../types";

export default [
  {
    name: "Tri-Split",
    rows: ["100px", "2fr"],
    cols: ["1fr", "2fr", "1fr"],
    gap: "2rem",
    items: [
      { name: "header", rows: [1, 1], cols: [1, -1] },
      { name: "sidebar", rows: [2, 2], cols: [1, 1] },
      { name: "main", rows: [2, 2], cols: [2, 2] },
      { name: "sub", rows: [2, 2], cols: [3, 3] },
    ] as GridItemDef[],
  },
  {
    name: "Four Square",
    rows: ["1fr", "1fr"],
    cols: ["1fr", "1fr"],
    gap: "2rem",
    items: [
      { name: "A", rows: [1, 1], cols: [1, 1] },
      { name: "B", rows: [2, 2], cols: [1, 1] },
      { name: "C", rows: [1, 1], cols: [2, 2] },
      { name: "D", rows: [2, 2], cols: [2, 2] },
    ] as GridItemDef[],
  },
  {
    name: "Classic",
    rows: ["100px", "1fr"],
    cols: ["150px", "1fr"],
    gap: "2rem",
    items: [
      { name: "header", rows: [1, 1], cols: [1, 3] },
      { name: "sidebar", rows: [2, 2], cols: [1, 1] },
      { name: "main", rows: [2, 2], cols: [2, 2] },
    ] as GridItemDef[],
  },
];

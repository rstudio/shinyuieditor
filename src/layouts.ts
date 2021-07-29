import type { GridItemDef } from "./types";

export default [
  {
    name: "Tri-Split",
    rows: ["100px", "2fr"],
    cols: ["1fr", "2fr", "1fr"],
    gap: "2rem",
    items: [
      { id: "header", rows: [1, 1], cols: [1, -1] },
      { id: "sidebar", rows: [2, 2], cols: [1, 1] },
      { id: "main", rows: [2, 2], cols: [2, 2] },
      { id: "sub", rows: [2, 2], cols: [3, 3] },
    ] as GridItemDef[],
  },
  {
    name: "Four Square",
    rows: ["1fr", "1fr"],
    cols: ["1fr", "1fr"],
    gap: "2rem",
    items: [
      { id: "A", rows: [1, 1], cols: [1, 1] },
      { id: "B", rows: [2, 2], cols: [1, 1] },
      { id: "C", rows: [1, 1], cols: [2, 2] },
      { id: "D", rows: [2, 2], cols: [2, 2] },
    ] as GridItemDef[],
  },
  {
    name: "Classic",
    rows: ["100px", "1fr"],
    cols: ["150px", "1fr"],
    gap: "2rem",
    items: [
      { id: "header", rows: [1, 1], cols: [1, -1] },
      { id: "sidebar", rows: [2, 2], cols: [1, 1] },
      { id: "main", rows: [2, 2], cols: [2, 2] },
    ] as GridItemDef[],
  },
];

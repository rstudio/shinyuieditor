import type { GridItemDef } from "../types";

export default [
  {
    name: "Tri-Split",
    rows: ["100px", "2fr"],
    cols: ["1fr", "2fr", "1fr"],
    gap: "2rem",
    items: [
      { name: "header", startRow: 1, endRow: 1, startCol: 1, endCol: 3 },
      { name: "sidebar", startRow: 2, endRow: 2, startCol: 1, endCol: 1 },
      { name: "main", startRow: 2, endRow: 2, startCol: 2, endCol: 2 },
      { name: "sub", startRow: 2, endRow: 2, startCol: 3, endCol: 3 },
    ] as GridItemDef[],
  },
  {
    name: "Four Square",
    rows: ["1fr", "1fr"],
    cols: ["1fr", "1fr"],
    gap: "2rem",
    items: [
      { name: "A", startRow: 1, endRow: 1, startCol: 1, endCol: 1 },
      { name: "B", startRow: 2, endRow: 2, startCol: 1, endCol: 1 },
      { name: "C", startRow: 1, endRow: 1, startCol: 2, endCol: 2 },
      { name: "D", startRow: 2, endRow: 2, startCol: 2, endCol: 2 },
    ] as GridItemDef[],
  },
  {
    name: "Classic",
    rows: ["100px", "1fr"],
    cols: ["150px", "1fr"],
    gap: "2rem",
    items: [
      { name: "header", startRow: 1, endRow: 1, startCol: 1, endCol: 3 },
      { name: "sidebar", startRow: 2, endRow: 2, startCol: 1, endCol: 1 },
      { name: "main", startRow: 2, endRow: 2, startCol: 2, endCol: 2 },
    ] as GridItemDef[],
  },
];

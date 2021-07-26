export type GridItemDef = {
  id: string;
  rows: [number, number];
  cols: [number, number];
};

export type GridLayoutDef = {
  name: string;
  rows: string[];
  cols: string[];
  gap: string;
  items?: GridItemDef[];
};

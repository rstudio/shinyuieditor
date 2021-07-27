export type GridItemDef = {
  id: string;
  rows: [number, number];
  cols: [number, number];
};

export interface GridLayoutDef {
  rows: string[];
  cols: string[];
  gap: string;
}

export interface GridLayoutTemplate extends GridLayoutDef {
  name: string;
  items: GridItemDef[];
}

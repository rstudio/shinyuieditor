export type GridItemDef = {
  id: string;
  rows: [number, number];
  cols: [number, number];
};

export type GridLayoutDef = {
  rows?: string[];
  cols?: string[];
  gap: string;
};

export type GridLayoutTemplate = {
  rows: string[];
  cols: string[];
  gap: string;
  name: string;
  items: GridItemDef[];
};

export type GridTractDir = "rows" | "cols";
export type TractValue = {
  val: string | CSSMeasure;
  dir: GridTractDir;
  index: number;
};

type CSSUnits = "fr" | "px" | "rem" | "auto";
type CSSMeasure = `${number}${CSSUnits}`;

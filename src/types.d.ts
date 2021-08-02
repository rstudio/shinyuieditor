// A single export is needed in this file to let typescript know the types go out
export

type ItemTractPos = [number, number];

type GridItemDef = {
  name: string;
  rows: ItemTractPos;
  cols: ItemTractPos;
};

type GridLayoutDef = {
  rows?: string[];
  cols?: string[];
  gap: string;
};


type GridLayoutTemplate = {
  rows: string[];
  cols: string[];
  gap: string;
  name: string;
  items: GridItemDef[];
};

type GridTractDir = "rows" | "cols";
type TractValue = {
  val: string | CSSMeasure;
  dir: GridTractDir;
  index: number;
};

type CSSUnits = "fr" | "px" | "rem" | "auto";
type CSSMeasure = `${number}${CSSUnits}`;

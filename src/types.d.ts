// A single export is needed in this file to let typescript know the types go out
export type GridPos = {
  startRow: number;
  endRow?: number;
  startCol: number;
  endCol?: number;
}
export type GridItemDef = {
  name: string;
} & GridPos;


export type GridLayoutTemplate = {
  rows: string[];
  cols: string[];
  gap: string;
  name: string;
  items: GridItemDef[];
};

export type CSSUnits = "fr" | "px" | "rem" | "auto";
export type CSSMeasure = `${number}${CSSUnits}`;

export type DragDir = "top" | "topLeft" | "topRight" | "bottom" | "bottomLeft" | "bottomRight" | "left" | "right"| "middle";


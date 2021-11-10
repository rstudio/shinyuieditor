// A single export is needed in this file to let typescript know the types go out
export type GridPos = {
  startRow: number;
  endRow: number;
  startCol: number;
  endCol: number;
};
export type GridItemDef = {
  name: string;
} & GridPos;

export type GridLayoutTemplate = {
  rows: CSSMeasure[];
  cols: CSSMeasure[];
  gap: CSSMeasure;
  name: string;
  items: GridItemDef[];
};

export type CSSUnits = "fr" | "px" | "rem";
export type CSSMeasure = `${number}${CSSUnits}` | "auto";

export type BoxSide = "top" | "bottom" | "left" | "right";
export type BoxCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
export type BoxOverlap = BoxSide | BoxCorner | "center";
export type DragDir = BoxSide | BoxCorner;

export type GridLocString = `row${number}-col${number}`;

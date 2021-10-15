import { TractDirection } from "state-logic/gridLayout/atoms";
import { GridItemBoundingBox } from "state-logic/itemDragging";
import { GridLayoutTemplate, GridPos } from "../GridTypes";
import { getBBoxOfDiv } from "./overlap-helpers";

export function makeTractPos(start: number, end?: number) {
  const pos = String(start);
  if (typeof end === "undefined") return pos;

  // If a negative end index was provided then just leave it be
  const endIndex = end < 0 ? end : end + 1;
  return pos + "/" + endIndex;
}

export function sameGridPos(a?: GridPos, b?: GridPos) {
  if (typeof a === "undefined" && typeof b === "undefined") return true;

  // If any one of them is undefined now, then one is and the other isnt
  if (typeof a === "undefined" || typeof b === "undefined") return false;

  return (
    a.startCol === b.startCol &&
    a.endCol === b.endCol &&
    a.startRow === b.startRow &&
    a.endRow === b.endRow
  );
}

export function sameLayout(
  a: GridLayoutTemplate,
  b: GridLayoutTemplate | null
): boolean {
  if (b === null) return false;

  return JSON.stringify(a) === JSON.stringify(b);
}

export function placeOnGridOrCol({
  index,
  dir,
}: {
  index: number;
  dir: TractDirection;
}) {
  return dir === "rows"
    ? {
        gridColumn: makeTractPos(1, -1),
        gridRow: index + 1,
      }
    : {
        gridRow: makeTractPos(1, -1),
        gridColumn: index + 1,
      };
}

export function enumerateGridDims({
  numCols,
  numRows,
  startCol = 1,
  startRow = 1
}: {
  numCols: number;
  numRows: number;
  startCol?: number;
  startRow?: number;
}) {
  return Array.from({ length: numCols * numRows }).map((_, i) => ({
    row: Math.floor(i / numCols) + startCol,
    col: (i % numCols) + startRow,
  }));
}


export type GridLocString = `row${number}-col${number}`;
export const gridLocString = ({row, col}: {row: number; col: number}): GridLocString => `row${row}-col${col}`;
export function getCurrentGridCellBounds() {
  const allCells = document.querySelectorAll(
    ".gridCell"
  ) as NodeListOf<HTMLDivElement>;


  // const gridIndicesToBBox = new Map<`row${number}-col${number}`,GridItemBoundingBox>();
  const gridIndicesToBBox = new Map<GridLocString, GridItemBoundingBox>();
  allCells.forEach((cellDiv) => {
    const absolutePos = getBBoxOfDiv(cellDiv);
    if (!absolutePos) throw new Error("GridCells are misbehaving");
    const row = Number(cellDiv.dataset.row);
    const col = Number(cellDiv.dataset.col);
    gridIndicesToBBox.set(gridLocString({row, col}), {
      ...absolutePos,
      startRow: row,
      endRow: row,
      startCol: col,
      endCol: col,
    });
  });

  return gridIndicesToBBox;
}


export function findCenterOfBlock(
  block: GridPos,
  cellBounds: ReturnType<typeof getCurrentGridCellBounds>
) {
  const topLeftCell = cellBounds.get(
    `row${block.startRow}-col${block.startCol}`
  );
  const bottomRightCell = cellBounds.get(
    `row${block.endRow}-col${block.endCol}`
  );

  if (!topLeftCell || !bottomRightCell)
    throw new Error(
      "Failed to get all the cells needed to find position of block"
    );

  return {
    x: (topLeftCell.left + bottomRightCell.right) / 2,
    y: (topLeftCell.top + bottomRightCell.bottom) / 2,
  };
}

export const blockIsFree = (
  { startRow, endRow, startCol, endCol }: GridPos,
  occupiedCells: Set<GridLocString>
) => {
  for (let row = startRow; row <= endRow; row++) {
    for (let col = startCol; col <= endCol; col++) {
      if (occupiedCells.has(gridLocString({ row, col }))) return false;
    }
  }
  return true;
};

export const gridDimsFromCellBounds = (cellBounds: ReturnType<typeof getCurrentGridCellBounds>) => 
  [...cellBounds.keys()].reduce(
    (gridDims, pos) => {
      const [rowInd, colInd] = pos.split("-");
      gridDims.numCols = Math.max(Number(colInd.replace("col", "")));
      gridDims.numRows = Math.max(Number(rowInd.replace("row", "")));

      return gridDims;
    },
    { numRows: 0, numCols: 0 }
  )



export const getItemDims = (item: GridPos) => {
  return {
    numRows: item.endRow - item.startRow + 1,
    numCols: item.endCol - item.startCol + 1,
  }
}
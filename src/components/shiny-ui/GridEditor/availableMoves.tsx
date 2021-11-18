import {
  AiFillCaretDown,
  AiFillCaretLeft,
  AiFillCaretRight,
  AiFillCaretUp,
} from "react-icons/ai";
import { buildRange } from "utils/array-helpers";
import { toStringLoc } from "utils/grid-helpers";
import { emptyCell } from "utils/gridTemplates/itemLocations";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";
import { ItemBoundingBox } from "utils/overlap-helpers";
import { GridCellBounds } from ".";
import { gridLocationToExtent } from "./helpers";

export function availableMoves({
  gridLocation: { rowStart, rowSpan, colStart, colSpan },
  layoutAreas,
}: {
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
}) {
  const rowEnd = rowStart + rowSpan - 1;
  const colEnd = colStart + colSpan - 1;
  const rowIndices = buildRange(rowStart, rowEnd);
  const colIndices = buildRange(colStart, colEnd);
  const canShrinkRows = rowSpan > 1;
  const canShrinkCols = colSpan > 1;

  return {
    "expand up": rowIsFree({
      colRange: colIndices,
      rowIndex: rowStart - 1,
      layoutAreas,
    }),
    "expand down": rowIsFree({
      colRange: colIndices,
      rowIndex: rowEnd + 1,
      layoutAreas,
    }),
    "expand left": colIsFree({
      rowRange: rowIndices,
      colIndex: colStart - 1,
      layoutAreas,
    }),
    "expand right": colIsFree({
      rowRange: rowIndices,
      colIndex: colEnd + 1,
      layoutAreas,
    }),
    "shrink up": canShrinkRows,
    "shrink down": canShrinkRows,
    "shrink left": canShrinkCols,
    "shrink right": canShrinkCols,
  };
}

function boundingBoxToExtent(box: ItemBoundingBox) {
  const left = box.offsetLeft;
  const top = box.offsetTop;
  const width = box.right - left;
  const height = box.bottom - top;
  return {
    left,
    top,
    right: left + width,
    bottom: top + height,
  };
}
export function expansionRoom({
  side,
  gridLocation,
  layoutAreas,
  cellBounds,
}: {
  side: MovementType;
  gridLocation: ItemLocation;
  layoutAreas: TemplatedGridProps["areas"];
  cellBounds: GridCellBounds;
}) {
  const itemExtents = gridLocationToExtent(gridLocation);
  const itemRowSpan = buildRange(itemExtents.rowStart, itemExtents.rowEnd);
  const itemColSpan = buildRange(itemExtents.colStart, itemExtents.colEnd);
  const numRows = layoutAreas.length;
  const numCols = layoutAreas[0].length;

  let finalRowIndex: number;
  let finalColIndex: number;
  switch (side) {
    case "expand down":
      finalRowIndex = lastFreeRow({
        rowRange: buildRange(itemExtents.rowEnd, numRows),
        itemColSpan,
        layoutAreas,
      });

      return boundingBoxToExtent(
        cellBounds[toStringLoc({ row: finalRowIndex, col: 1 })]
      ).bottom;

    case "expand up":
      finalRowIndex = lastFreeRow({
        rowRange: buildRange(itemExtents.rowStart, 1),
        itemColSpan,
        layoutAreas,
      });

      return boundingBoxToExtent(
        cellBounds[toStringLoc({ row: finalRowIndex, col: 1 })]
      ).top;

    case "expand left":
      finalColIndex = lastFreeCol({
        colRange: buildRange(itemExtents.colStart, 1),
        itemRowSpan,
        layoutAreas,
      });

      return boundingBoxToExtent(
        cellBounds[toStringLoc({ row: 1, col: finalColIndex })]
      ).left;
    case "expand right":
      finalColIndex = lastFreeCol({
        colRange: buildRange(itemExtents.colEnd, numCols),
        itemRowSpan,
        layoutAreas,
      });

      return boundingBoxToExtent(
        cellBounds[toStringLoc({ row: 1, col: finalColIndex })]
      ).right;
    default:
      console.error("haven't implemented", side);
  }
}

function lastFreeRow({
  rowRange,
  itemColSpan,
  layoutAreas,
}: {
  rowRange: number[];
  itemColSpan: number[];
  layoutAreas: TemplatedGridProps["areas"];
}) {
  const finalRow = rowRange.find((rowIndex) =>
    rowIsFree({ colRange: itemColSpan, rowIndex, layoutAreas })
  );
  return finalRow ?? rowRange[0];
}
function lastFreeCol({
  colRange,
  itemRowSpan,
  layoutAreas,
}: {
  colRange: number[];
  itemRowSpan: number[];
  layoutAreas: TemplatedGridProps["areas"];
}) {
  const finalCol = colRange.find((colIndex) =>
    colIsFree({ rowRange: itemRowSpan, colIndex, layoutAreas })
  );

  return finalCol ?? colRange[0];
}

function rowIsFree({
  colRange,
  rowIndex,
  layoutAreas,
}: {
  colRange: number[];
  rowIndex: number;
  layoutAreas: TemplatedGridProps["areas"];
}): boolean {
  if (rowIndex < 1 || rowIndex > layoutAreas.length) return false;
  return colRange.every(
    (colIndex) => layoutAreas[rowIndex - 1][colIndex - 1] === emptyCell
  );
}
function colIsFree({
  rowRange,
  colIndex,
  layoutAreas,
}: {
  rowRange: number[];
  colIndex: number;
  layoutAreas: TemplatedGridProps["areas"];
}): boolean {
  if (colIndex < 1 || colIndex > layoutAreas[0].length) return false;

  return rowRange.every(
    (rowIndex) => layoutAreas[rowIndex - 1][colIndex - 1] === emptyCell
  );
}

export type MovementType = keyof ReturnType<typeof availableMoves>;

const RightArrow = AiFillCaretRight;
const LeftArrow = AiFillCaretLeft;
const UpArrow = AiFillCaretUp;
const DownArrow = AiFillCaretDown;

export const movementToArrow: Record<MovementType, JSX.Element> = {
  "expand up": <UpArrow />,
  "expand down": <DownArrow />,
  "shrink down": <UpArrow />,
  "shrink up": <DownArrow />,
  "expand left": <LeftArrow />,
  "expand right": <RightArrow />,
  "shrink left": <RightArrow />,
  "shrink right": <LeftArrow />,
};

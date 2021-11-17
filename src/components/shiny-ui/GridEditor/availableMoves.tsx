import {
  AiFillCaretRight,
  AiFillCaretLeft,
  AiFillCaretUp,
  AiFillCaretDown,
} from "react-icons/ai";
import { buildRange } from "utils/array-helpers";
import { emptyCell } from "utils/gridTemplates/itemLocations";
import { ItemLocation, TemplatedGridProps } from "utils/gridTemplates/types";

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
    "expand up": colIndices.every((col) =>
      isEmptyCell({ row: rowStart - 1, col }, layoutAreas)
    ),
    "expand down": colIndices.every((col) =>
      isEmptyCell({ row: rowEnd + 1, col }, layoutAreas)
    ),
    "expand left": rowIndices.every((row) =>
      isEmptyCell({ row, col: colStart - 1 }, layoutAreas)
    ),
    "expand right": rowIndices.every((row) =>
      isEmptyCell({ row, col: colEnd + 1 }, layoutAreas)
    ),
    "shrink up": canShrinkRows,
    "shrink down": canShrinkRows,
    "shrink left": canShrinkCols,
    "shrink right": canShrinkCols,
  };
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

function isEmptyCell(
  { row, col }: { row: number; col: number },
  layoutAreas: TemplatedGridProps["areas"]
) {
  if (row < 1 || row > layoutAreas.length) return false;
  const nCols = layoutAreas[0].length;
  if (col < 1 || col > nCols) return false;

  return layoutAreas[row - 1][col - 1] === emptyCell;
}

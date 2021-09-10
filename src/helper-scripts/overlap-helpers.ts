import type { SelectionRect } from "../state-logic/itemDragging";

type BoxSides =
  | "top"
  | "bottom"
  | "left"
  | "right"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center";

export type ItemBoundingBox = SelectionRect & {
  offsetLeft: number;
  offsetTop: number;
};
export function getBBoxOfDiv(
  divNode: HTMLDivElement | null
): ItemBoundingBox | null {
  if (!divNode) return null;
  const { top, bottom, left, right } = divNode.getBoundingClientRect();
  const { offsetLeft, offsetTop } = divNode;

  return {
    top,
    bottom,
    left,
    right,
    offsetLeft,
    offsetTop,
  };
}
// Figure out how interval B overlaps interval A
function intervalsOverlap(
  [aStart, aEnd]: [number, number],
  [bStart, bEnd]: [number, number],
  orientation: "vertical" | "horizontal"
): {
  type: "left" | "right" | "top" | "bottom" | "full" | "none";
  amount: number;
} {
  // aaaa       or      aaaa
  //     bbbb       bbbb
  if (aEnd <= bStart || aStart >= bEnd) return { type: "none", amount: 0 };

  // There is full overlap either because a contains b or b contains a
  if ((aStart <= bStart && aEnd >= bEnd) || (aStart >= bStart && aEnd <= bEnd))
    return { type: "full", amount: 0 };

  //   aaaa
  // bbbb
  if (aEnd > bEnd && aStart >= bStart)
    return {
      type: orientation === "horizontal" ? "left" : "top",
      amount: bEnd - aStart,
    };
  // aaaa
  //   bbbb
  if (aStart < bStart && aEnd <= bEnd)
    return {
      type: orientation === "horizontal" ? "right" : "bottom",
      amount: aEnd - bStart,
    };
  console.error("Unaccounted overlap");
  return { type: "none", amount: 0 };
}

export function boxesOverlap(
  boxA: SelectionRect,
  boxB: SelectionRect
): BoxSides | null {
  const colOverlap = intervalsOverlap(
    [boxA.left, boxA.right],
    [boxB.left, boxB.right],
    "horizontal"
  );
  const rowOverlap = intervalsOverlap(
    [boxA.top, boxA.bottom],
    [boxB.top, boxB.bottom],
    "vertical"
  );

  if (colOverlap.type === "none" || rowOverlap.type === "none") return null;

  const haveRowOverlap = rowOverlap.amount > 0;
  const haveColOverlap = colOverlap.amount > 0;
  if (haveRowOverlap && haveColOverlap) {
    // We have overlap in both directions so choose the direction with the
    // least overlap to make the adjustment that has the least deviation from
    // the mouse position
    return (
      rowOverlap.amount > colOverlap.amount ? colOverlap.type : rowOverlap.type
    ) as BoxSides;
  }

  if (haveRowOverlap) return rowOverlap.type as BoxSides;
  if (haveColOverlap) return colOverlap.type as BoxSides;

  // This means that one of the elements is completely enclosed in the other
  return "center";
}

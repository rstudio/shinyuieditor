import type { ActiveDrag, SelectionRect } from "./state-logic/itemDragging";
import { BoxOverlap, BoxSide, DragDir } from "./GridTypes";

export type ItemBoundingBox = SelectionRect & {
  offsetLeft: number;
  offsetTop: number;
};
export function getBBoxOfDiv(divNode?: HTMLDivElement | null): ItemBoundingBox {
  if (!divNode) {
    throw new Error("Can't find the bounding box of a non existant element");
  }

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
):
  | {
      type: BoxSide;
      amount: number;
    }
  | {
      type: "full" | "none";
      amount: 0;
    } {
  // aaaa       or      aaaa
  //     bbbb       bbbb
  if (aEnd < bStart || aStart > bEnd) return { type: "none", amount: 0 };

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
  if (aStart < bStart && aEnd <= bEnd) {
    return {
      type: orientation === "horizontal" ? "right" : "bottom",
      amount: aEnd - bStart,
    };
  }
  console.error("Unaccounted overlap");
  return { type: "none", amount: 0 };
}

export function boxesOverlap(
  boxA: SelectionRect,
  boxB: SelectionRect
): BoxOverlap | null {
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

  if (rowOverlap.type !== "full" && colOverlap.type !== "full") {
    // We have overlap in both directions so choose the direction with the
    // least overlap to make the adjustment that has the least deviation from
    // the mouse position

    return rowOverlap.amount > colOverlap.amount
      ? colOverlap.type
      : rowOverlap.type;
  }

  if (rowOverlap.type !== "full") return rowOverlap.type;
  if (colOverlap.type !== "full") return colOverlap.type;

  // This means that one of the elements is completely enclosed in the other
  return "center";
}

export function mutateToFixOverlapOfBoxes(
  dragRect: ActiveDrag["dragBox"],
  overlappedRect: SelectionRect,
  overlapType: BoxOverlap
) {
  // How far to shift after bumping into overlapped element. Needs to be
  // enough that it doesnt immediately go back and overlap on next move
  const moveDelta = 4;
  const dragDir = dragRect.dir;

  if (overlapType === "center") {
    if (containsDir(dragDir, "bottom")) {
      dragRect.bottom = overlappedRect.top - moveDelta;
    } else if (containsDir(dragDir, "top")) {
      dragRect.top = overlappedRect.bottom + moveDelta;
    } else if (containsDir(dragDir, "left")) {
      dragRect.left = overlappedRect.right + moveDelta;
    } else if (containsDir(dragDir, "right")) {
      dragRect.right = overlappedRect.left - moveDelta;
    }
    return;
  }

  if (dragDir === "bottom" && containsDir(overlapType, "top")) {
    dragRect.bottom = overlappedRect.top - moveDelta;
    return;
  }

  if (dragDir === "right" && containsDir(overlapType, "left")) {
    dragRect.right = overlappedRect.left - moveDelta;
    return;
  }

  if (dragDir === "top" && containsDir(overlapType, "bottom")) {
    dragRect.top = overlappedRect.bottom + moveDelta;
    return;
  }

  if (dragDir === "left" && containsDir(overlapType, "right")) {
    dragRect.left = overlappedRect.right + moveDelta;
    return;
  }

  if (containsDir(overlapType, "bottom")) {
    dragRect.top = overlappedRect.bottom + moveDelta;
  } else if (containsDir(overlapType, "top")) {
    dragRect.bottom = overlappedRect.top - moveDelta;
  }

  if (containsDir(overlapType, "left")) {
    dragRect.right = overlappedRect.left - moveDelta;
  } else if (containsDir(overlapType, "right")) {
    dragRect.left = overlappedRect.right + moveDelta;
  }
}

export function containsDir(fullDir: DragDir, partialDir: BoxSide): boolean {
  if (partialDir === fullDir) return true;
  switch (partialDir) {
    case "top":
      return fullDir === "topLeft" || fullDir === "topRight";
    case "left":
      return fullDir === "topLeft" || fullDir === "bottomLeft";
    case "bottom":
      return fullDir === "bottomLeft" || fullDir === "bottomRight";
    case "right":
      return fullDir === "topRight" || fullDir === "bottomRight";
  }
}

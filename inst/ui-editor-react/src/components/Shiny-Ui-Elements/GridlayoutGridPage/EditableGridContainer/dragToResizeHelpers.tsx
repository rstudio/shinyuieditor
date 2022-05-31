import type { TractUpdateValues } from "./tractUpdatingFunctions";
import {
  drag_pixel_before,
  drag_both_pixel,
  drag_both_relative,
} from "./tractUpdatingFunctions";

export type DragState = {
  dir: "rows" | "columns";
  beforeIndex: number;
  afterIndex: number;
  mouseStart: number;
  originalSizes: string[];
  currentSizes: string[];
  pixelToFrRatio: number;
} & DragInfo;

export type DragPixelBefore = {
  type: "before-pixel";
  beforeInfo: PxInfo;
};
type DragPixelAfter = {
  type: "after-pixel";
  afterInfo: PxInfo;
};
export type DragBothPixel = {
  type: "both-pixel";
  beforeInfo: PxInfo;
  afterInfo: PxInfo;
};

export type DragBothRelative = {
  type: "both-relative";
  beforeInfo: FrInfo;
  afterInfo: FrInfo;
};

type DragInfo =
  | DragPixelBefore
  | DragPixelAfter
  | DragBothPixel
  | DragBothRelative;

function getDragInfo(
  beforeUnit: string,
  afterUnit: string | null
): DragInfo | { type: "unsupported" } {
  const beforeInfo = getUnitInfo(beforeUnit);
  const afterInfo = afterUnit === null ? "missing" : getUnitInfo(afterUnit);

  if (
    beforeInfo.type === "pixel" &&
    (afterInfo === "missing" || afterInfo.type === "fr")
  ) {
    return {
      type: "before-pixel",
      beforeInfo,
    };
  }

  if (afterInfo === "missing") {
    throw new Error(
      "Somehow have a final tract drag without a pixel valued tract before...."
    );
  }

  // 1: Both sides are pixel units
  // Just add and subtract delta
  if (beforeInfo.type === "pixel" && afterInfo.type === "pixel") {
    return {
      type: "both-pixel",
      beforeInfo,
      afterInfo,
    };
  }

  if (beforeInfo.type === "fr" && afterInfo.type === "pixel") {
    return {
      type: "after-pixel",
      afterInfo,
    };
  }

  if (beforeInfo.type === "fr" && afterInfo.type === "fr") {
    return {
      type: "both-relative",
      beforeInfo,
      afterInfo,
    };
  }

  return { type: "unsupported" };
}

function getPxToFrRatioForRelativeTracts({
  container,
  index,
  dir,
  frCounts,
}: {
  container: HTMLDivElement;
  index: number;
  dir: DragState["dir"];
  frCounts: { before: number; after: number };
}) {
  // getComputedStyle() will convert all grid tracts to pixel values so we can
  // get the width or height of the tracts we need to resize in pixels and then
  // compute the amount of fr units we need to shift per pixel of drag
  const computedSizes = getComputedStyle(container)
    .getPropertyValue(
      dir === "rows" ? "grid-template-rows" : "grid-template-columns"
    )
    .split(" ");

  const beforePx = getUnitInfo(computedSizes[index - 2]).count;
  const afterPx = getUnitInfo(computedSizes[index - 1]).count;

  return (frCounts.before + frCounts.after) / (afterPx + beforePx);
}

export function initDragState({
  mousePosition,
  dir,
  index,
  container,
}: {
  mousePosition: MousePosition;
  dir: "rows" | "columns";
  index: number;
  container: HTMLDivElement;
}): DragState {
  const templateSelector =
    dir === "rows" ? "gridTemplateRows" : "gridTemplateColumns";

  let originalSizes = container.style[templateSelector].split(" ");

  const tractHasAutoUnits = getHasAutoUnits(originalSizes);
  const tractHasRelativeUnits = getHasRelativeUnits(originalSizes);
  if (tractHasAutoUnits && !tractHasRelativeUnits) {
    // If we're resizing a grid with auto units in it, then we go scorched earth
    // and just convert everything to pixels. This helps avoid any jumps due to
    // min or max heights and ensure the grid looks exactly the same after drag.
    // The downside is that the grid will no longer grow to fill the screen if
    // that behavior is desired. But in that case the user should not be using
    // auto units but relative units. The splice is to make sure there are no
    // ghost tracts added by the drag handlers that mess up the definition
    originalSizes = getComputedStyle(container)
      .getPropertyValue(
        dir === "rows" ? "grid-template-rows" : "grid-template-columns"
      )
      .split(" ")
      .slice(0, originalSizes.length);

    container.style[templateSelector] = originalSizes.join(" ");
  }

  if (tractHasAutoUnits && tractHasRelativeUnits) {
    console.warn(
      "There's a mixture of auto and relative units in the grid. " +
        "This may cause funky behavior on resize. " +
        "To prevent this switch to only relative or auto units"
    );
  }

  // Get the sizes of the two tracts on either side of the dragged divider
  // Grid tracts are indexed at one confusingly
  const beforeIndex = index - 2;
  const afterIndex = beforeIndex + 1;

  let beforeVal = originalSizes[beforeIndex];
  // We're at the end of the grid so there will be no "after".
  let afterVal =
    afterIndex >= originalSizes.length ? null : originalSizes[afterIndex];

  if (beforeVal === "auto" || afterVal === "auto") {
    // Convert auto tracts to pixels to allow for dragging
    const computedSizes = getComputedStyle(container)
      .getPropertyValue(
        dir === "rows" ? "grid-template-rows" : "grid-template-columns"
      )
      .split(" ");

    if (beforeVal === "auto") {
      beforeVal = computedSizes[beforeIndex];
      originalSizes[beforeIndex] = beforeVal;
    }
    if (afterVal === "auto") {
      afterVal = computedSizes[afterIndex];
      originalSizes[afterIndex] = afterVal;
    }

    // Update the sizes with these pixel values so auto-units. Otherwise, tracts
    // that may have a limited size will jump to that full size until the onDrag
    // callback sets the sizes
    console.log("Changing all the units to pixel values:");
    container.style[templateSelector] = computedSizes.join(" ");
  }

  const dragInfo = getDragInfo(beforeVal, afterVal);

  if (dragInfo.type === "unsupported") {
    throw new Error("Unsupported drag type");
  }

  // Let the container know that it's been dragged and thus can allow items to
  // be whatever size the user wants.
  container.classList.add("been-dragged");

  const dragState: DragState = {
    dir,
    mouseStart: getMousePosition(mousePosition, dir),
    originalSizes,
    currentSizes: [...originalSizes],
    beforeIndex,
    afterIndex,
    ...dragInfo,
    pixelToFrRatio:
      dragInfo.type === "both-relative"
        ? getPxToFrRatioForRelativeTracts({
            container,
            index,
            dir,
            frCounts: {
              before: dragInfo.beforeInfo.count,
              after: dragInfo.afterInfo.count,
            },
          })
        : 1,
  };

  return dragState;
}

export function updateDragState({
  mousePosition,
  drag,
  container,
}: {
  mousePosition: MousePosition;
  drag: DragState;
  container: HTMLDivElement;
}) {
  const mouseCurrent = getMousePosition(mousePosition, drag.dir);
  const delta = mouseCurrent - drag.mouseStart;
  const newSizes = [...drag.originalSizes];

  let updatedSizes: TractUpdateValues;
  switch (drag.type) {
    case "before-pixel":
      updatedSizes = drag_pixel_before(delta, drag);
      break;

    case "both-pixel":
      updatedSizes = drag_both_pixel(delta, drag);
      break;

    case "both-relative":
      updatedSizes = drag_both_relative(delta, drag);
      break;

    default:
      console.log("Havent implemented dragging for " + drag.type);
      return;
  }

  if (updatedSizes.beforeSize) {
    newSizes[drag.beforeIndex] = updatedSizes.beforeSize;
  }
  if (updatedSizes.afterSize) {
    newSizes[drag.afterIndex] = updatedSizes.afterSize;
  }

  drag.currentSizes = newSizes;
  // Actually apply those new sizes to the css appropriate grid template sizes
  if (drag.dir === "columns") {
    container.style.gridTemplateColumns = newSizes.join(" ");
  } else {
    container.style.gridTemplateRows = newSizes.join(" ");
  }
}

type PxUnit = `${number}px`;
function isPxUnit(unit: string): unit is PxUnit {
  return unit.match(/[0-9|.]+px/) !== null;
}

type FrUnit = `${number}fr`;
function isFrUnit(unit: string): unit is FrUnit {
  return unit.match(/[0-9|.]+fr/) !== null;
}

type FrInfo = {
  type: "fr";
  count: number;
  value: FrUnit;
};

type PxInfo = {
  type: "pixel";
  count: number;
  value: PxUnit;
};

type UnitInfo = FrInfo | PxInfo;

function getUnitInfo(unit: string): UnitInfo {
  if (isFrUnit(unit)) {
    return {
      type: "fr",
      count: Number(unit.replace("fr", "")),
      value: unit,
    };
  }

  if (isPxUnit(unit)) {
    return {
      type: "pixel",
      count: Number(unit.replace("px", "")),
      value: unit,
    };
  }

  throw new Error("Unknown tract sizing unit: " + unit);
}

type MousePosition = { clientX: number; clientY: number };
function getMousePosition(e: MousePosition, dir: DragState["dir"]) {
  return dir === "rows" ? e.clientY : e.clientX;
}

export function getHasRelativeUnits(tractSizes: string[]) {
  return tractSizes.some((size) => isFrUnit(size));
}
function getHasAutoUnits(tractSizes: string[]) {
  return tractSizes.some((size) => size === "auto");
}

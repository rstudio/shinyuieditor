import type {
  DragState,
  DragBothRelative,
  DragBothPixel,
  DragPixelBefore,
} from "./dragToResizeHelpers";

export type TractUpdateValues = { beforeSize?: string; afterSize?: string };

// How narrow should pixel tracts be allowed to get?
const minPx = 40;

// What is the smallest allowed ratio between two fr tracts? Any attempt to drag
// a tract smaller than `minFrRatio`*100% of its neighbor will be truncated
const minFrRatio = 0.15;

const roundTo = (precision: number) => (val: number) =>
  Math.round(val / precision) * precision;

const pixelRoundLevel = 5;
const roundPixel = roundTo(pixelRoundLevel);

const frRoundLevel = 0.05;
const roundFr = roundTo(frRoundLevel);

export function drag_both_relative(
  delta: number,
  {
    pixelToFrRatio,
    beforeInfo,
    afterInfo,
  }: {
    pixelToFrRatio: DragState["pixelToFrRatio"];
  } & Omit<DragBothRelative, "type">
): TractUpdateValues {
  const frDelta = roundFr(delta * pixelToFrRatio);

  const beforeCount = beforeInfo.count + frDelta;
  const afterCount = afterInfo.count - frDelta;

  const sizeRatio =
    frDelta < 0 ? beforeCount / afterCount : afterCount / beforeCount;

  // Make sure that we maintain a minimum size of the smaller tract
  if (sizeRatio < minFrRatio) {
    return {};
  }

  return {
    beforeSize: beforeCount + "fr",
    afterSize: afterCount + "fr",
  };
}
export function drag_both_pixel(
  delta: number,
  { beforeInfo, afterInfo }: Omit<DragBothPixel, "type">
): TractUpdateValues {
  const beforeCount = beforeInfo.count + delta;
  const afterCount = afterInfo.count - delta;

  if (beforeCount < minPx || afterCount < minPx) {
    return {};
  }

  return {
    beforeSize: beforeCount + "px",
    afterSize: afterCount + "px",
  };
}
export function drag_pixel_before(
  delta: number,
  { beforeInfo }: Omit<DragPixelBefore, "type">
): TractUpdateValues {
  const beforeCount = beforeInfo.count + delta;
  if (beforeCount < minPx) {
    return {};
  }
  return {
    beforeSize: roundPixel(beforeCount) + "px",
  };
}

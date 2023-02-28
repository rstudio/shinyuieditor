import type { TractDirection } from "../GridlayoutGridPage";

export type TractExtents = { index: number; start: number; end: number }[];
export function getTractExtents({
  dir,
  gridContainerStyles,
  gridContainerBoundingRect,
}: {
  dir: TractDirection;
  gridContainerStyles: CSSStyleDeclaration;
  gridContainerBoundingRect: DOMRect;
}): TractExtents {
  const gap = pxValToNumber(gridContainerStyles.getPropertyValue("gap"));
  const pad = pxValToNumber(gridContainerStyles.getPropertyValue("padding"));

  // On the edges we need to account for the padding in the tract size
  const gapAtStartAndEnd = pad + gap / 2;

  const startOffset = gridContainerBoundingRect[dir === "rows" ? "y" : "x"];
  const sizes = getGridTractSizes(gridContainerStyles, dir);

  const n_tracts = sizes.length;

  const tract_extents: TractExtents = [];
  for (let i = 0; i < sizes.length; i++) {
    const firstTract = i === 0;
    const start_of_tract = firstTract ? startOffset : tract_extents[i - 1].end;

    const firstOrLastTract = firstTract || i === n_tracts - 1;
    const tract_width = sizes[i] + (firstOrLastTract ? gapAtStartAndEnd : gap);

    tract_extents.push({
      // tracts are indexed starting at 1 to match how css indexes tracts
      index: i + 1,
      start: start_of_tract,
      end: start_of_tract + tract_width,
    });
  }

  return tract_extents;
}

function getGridTractSizes(
  containerStyles: CSSStyleDeclaration,
  dir: TractDirection
) {
  const tractPxVals = containerStyles
    .getPropertyValue(
      dir === "rows" ? "grid-template-rows" : "grid-template-columns"
    )
    .split(" ");

  return tractPxVals.map(pxValToNumber);
}
function pxValToNumber(pxVal: string): number {
  return Number(pxVal.replaceAll("px", ""));
}

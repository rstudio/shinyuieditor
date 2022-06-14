import type { TemplatedGridProps } from "components/Shiny-Ui-Elements/GridlayoutGridPage";
import { fillArr } from "utils/array-helpers";

export function fillInPartialTemplate({
  areas,
  rowSizes,
  colSizes,
  gapSize,
}: {
  areas: string[][];
  rowSizes?: TemplatedGridProps["rowSizes"];
  colSizes?: TemplatedGridProps["colSizes"];
  gapSize?: TemplatedGridProps["gapSize"];
}): TemplatedGridProps {
  return {
    areas,
    rowSizes: rowSizes ?? fillArr("1fr", areas.length),
    colSizes: colSizes ?? fillArr("1fr", areas[0].length),
    gapSize: gapSize ?? "10px",
  };
}

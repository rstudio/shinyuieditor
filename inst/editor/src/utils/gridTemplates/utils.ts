import type { TemplatedGridProps } from "../../Shiny-Ui-Elements/GridlayoutGridPage";
import { fillArr } from "../array-helpers";

export function fillInPartialTemplate({
  areas,
  row_sizes,
  col_sizes,
  gap_size,
}: {
  areas: string[][];
  row_sizes?: TemplatedGridProps["row_sizes"];
  col_sizes?: TemplatedGridProps["col_sizes"];
  gap_size?: TemplatedGridProps["gap_size"];
}): TemplatedGridProps {
  return {
    areas,
    row_sizes: row_sizes ?? fillArr("1fr", areas.length),
    col_sizes: col_sizes ?? fillArr("1fr", areas[0].length),
    gap_size: gap_size ?? "10px",
  };
}

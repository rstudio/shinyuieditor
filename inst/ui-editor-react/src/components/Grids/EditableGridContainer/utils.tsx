import type { CSSMeasure } from "CSSMeasure";

import type { TemplatedGridProps } from "../../../Shiny-Ui-Elements/GridlayoutGridPage";

import type { DragStatus, TractInfo } from "./useDragToResizeGrid";

export function buildRange(from: number, to: number): number[] {
  const numEls = Math.abs(to - from) + 1;
  const step = from < to ? 1 : -1;
  return Array.from({ length: numEls }, (_, i) => from + i * step);
}

export function layoutDefToStyles({
  areas,
  row_sizes,
  col_sizes,
  gap_size,
}: TemplatedGridProps): React.CSSProperties {
  return {
    gridTemplateAreas: areas.map((x) => `"${x.join(" ")}"`).join(" \n "),
    gridTemplateRows: row_sizes.join(" "),
    gridTemplateColumns: col_sizes.join(" "),
    "--grid-gap": gap_size,
  } as React.CSSProperties;
}

function getTractSizesFromStyleDeclaration(
  templateProperty: string
): TemplatedGridProps["col_sizes"] {
  return templateProperty.split(" ") as CSSMeasure[];
}

export function getAreaMatrixFromStyleDeclaration(
  areaProperty: string
): TemplatedGridProps["areas"] {
  const rows_match = areaProperty.match(/"([.\w\s]+)"/g);
  if (!rows_match) throw new Error("Can't parse area definition");

  return rows_match.map((r) => r.replaceAll(`"`, ``).split(" "));
}

export function getLayoutFromGridElement(el: HTMLElement): TemplatedGridProps {
  const row_sizes = getTractSizesFromStyleDeclaration(
    el.style.gridTemplateRows
  );
  const col_sizes = getTractSizesFromStyleDeclaration(
    el.style.gridTemplateColumns
  );
  const areas = getAreaMatrixFromStyleDeclaration(el.style.gridTemplateAreas);
  const gap_size = el.style.getPropertyValue("--grid-gap") as CSSMeasure;

  return {
    row_sizes: row_sizes,
    col_sizes: col_sizes,
    areas,
    gap_size: gap_size,
  };
}

export function tractIsBeingResized(
  dragStatus: DragStatus,
  tract: Pick<TractInfo, "dir" | "index">
): false | { current_size: CSSMeasure } {
  if (dragStatus.status === "idle") return false;

  if (dragStatus.dir !== tract.dir) return false;

  if (dragStatus.tracts[0].index === tract.index)
    return { current_size: dragStatus.tracts[0].size };
  if (dragStatus.tracts[1].index === tract.index)
    return { current_size: dragStatus.tracts[1].size };

  return false;
}

export function rowIsBeingResized(dragStatus: DragStatus, row_i: number) {
  return tractIsBeingResized(dragStatus, {
    dir: "rows",
    index: row_i,
  });
}

export function columnIsBeingResized(dragStatus: DragStatus, column_i: number) {
  return tractIsBeingResized(dragStatus, {
    dir: "cols",
    index: column_i,
  });
}

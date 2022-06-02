import type { CSSMeasure } from "CSSMeasure";

import type { TemplatedGridProps } from "..";

import type { DragStatus, TractInfo } from "./useDragToResizeGrid";

export function buildRange(from: number, to: number): number[] {
  const numEls = Math.abs(to - from) + 1;
  const step = from < to ? 1 : -1;
  return Array.from({ length: numEls }, (_, i) => from + i * step);
}

export function layoutDefToStyles({
  areas,
  rowSizes,
  colSizes,
  gapSize,
}: TemplatedGridProps): React.CSSProperties {
  return {
    gridTemplateAreas: areas.map((x) => `"${x.join(" ")}"`).join(" \n "),
    gridTemplateRows: rowSizes.join(" "),
    gridTemplateColumns: colSizes.join(" "),
    "--grid-gap": gapSize,
  } as React.CSSProperties;
}

function getTractSizesFromStyleDeclaration(
  templateProperty: string
): TemplatedGridProps["colSizes"] {
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
  const rowSizes = getTractSizesFromStyleDeclaration(el.style.gridTemplateRows);
  const colSizes = getTractSizesFromStyleDeclaration(
    el.style.gridTemplateColumns
  );
  const areas = getAreaMatrixFromStyleDeclaration(el.style.gridTemplateAreas);
  const gapSize = el.style.getPropertyValue("--grid-gap") as CSSMeasure;

  return { rowSizes, colSizes, areas, gapSize };
}

function tractIsBeingResized(
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
    dir: "columns",
    index: column_i,
  });
}

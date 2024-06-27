import type { TractDirection } from "util-functions/src/matrix-helpers";

import type { TemplatedGridProps } from "../../gridTemplates/TemplatedGridProps";
import type { CSSMeasure } from "../../../inputFieldTypes";

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

export function getTractSizesInPx({
  container,
  dir,
}: {
  container: HTMLDivElement;
  dir: TractDirection;
}): number[] {
  return getComputedStyle(container)
    .getPropertyValue(
      dir === "rows" ? "grid-template-rows" : "grid-template-columns"
    )
    .split(" ")
    .map((s) => Number(s.replaceAll("px", "")));
}

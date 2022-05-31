import type { CSSMeasure } from "CSSMeasure";
import type { TemplatedGridProps } from "utils/gridTemplates/types";

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
  return templateProperty.split(" ");
}

function getAreaMatrixFromStyleDeclaration(
  areaProperty: string
): TemplatedGridProps["areas"] {
  const rows_match = areaProperty.match(/"([\w\s]+)"/g);
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

import type { GridLayoutDef } from ".";

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
}: GridLayoutDef): React.CSSProperties {
  return {
    gridTemplateAreas: areas.map((x) => `"${x.join(" ")}"`).join(" \n "),
    gridTemplateRows: rowSizes.join(" "),
    gridTemplateColumns: colSizes.join(" "),
    "--grid-gap": gapSize,
  } as React.CSSProperties;
}

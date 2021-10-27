import { CSSMeasure } from "GridTypes";
import { uniqueMatrixElements } from "./array-helpers";

type GridContainerStyles = {
  gridTemplateAreas: React.CSSProperties["gridTemplateAreas"];
  gridTemplateColumns: React.CSSProperties["gridTemplateColumns"];
  gridTemplateRows: React.CSSProperties["gridTemplateRows"];
  gap: React.CSSProperties["gap"];
};

export type TemplatedGridProps = {
  areas: string[][];
  rowSizes?: CSSMeasure[] | CSSMeasure;
  colSizes?: CSSMeasure[] | CSSMeasure;
  gapSize?: CSSMeasure;
};
type ParsedTemplateResult = {
  numRows: number;
  numCols: number;
  styles: GridContainerStyles;
  uniqueAreas: string[];
};

export default function parseGridTemplateAreas({
  areas,
  rowSizes = "1fr",
  colSizes = "1fr",
  gapSize = "1rem",
}: TemplatedGridProps): ParsedTemplateResult {
  const { numRows, numCols, gridTemplateAreas } = buildGridTemplateAreas(areas);

  return {
    numRows,
    numCols,
    styles: {
      gridTemplateAreas,
      gridTemplateColumns: buildTractSizes(numCols, colSizes, "column"),
      gridTemplateRows: buildTractSizes(numRows, rowSizes, "row"),
      gap: gapSize,
    },
    uniqueAreas: uniqueMatrixElements(areas),
  };
}

export function buildGridTemplateAreas(
  areas: string[][]
): {
  numRows: number;
  numCols: number;
  gridTemplateAreas: React.CSSProperties["gridTemplateAreas"];
} {
  const numRows = areas.length;
  const numCols = areas[0].length;

  const gridTemplateAreas = areas
    .map((rowDef) => {
      if (rowDef.length !== numCols)
        throw new Error("Inconsistant number of columns in areas template");
      return `"${rowDef.join(" ")}"`;
    })
    .join("\n");

  return {
    numRows,
    numCols,
    gridTemplateAreas,
    // uniqueAreas: uniqueElements(areas),
  };
}

export function buildTractSizes(
  numTracts: number,
  tractSizes: CSSMeasure[] | CSSMeasure,
  dir: "row" | "column"
): string {
  if (!Array.isArray(tractSizes))
    return [...new Array(numTracts)].fill(tractSizes).join(" ");

  if (numTracts !== tractSizes.length)
    throw new Error(
      `Number of ${dir} sizes does not match the number of ${dir}s in the areas template. 
    Either make sure they match or use a single ${dir} size that will be repeated for all ${dir}s.`
    );

  return tractSizes.join(" ");
}

import { CSSMeasure } from "GridTypes";

type GridContainerStyles = {
  gridTemplateAreas: React.CSSProperties["gridTemplateAreas"];
  gridTemplateColumns: React.CSSProperties["gridTemplateColumns"];
  gridTemplateRows: React.CSSProperties["gridTemplateRows"];
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
}: {
  areas: string[][];
  rowSizes?: CSSMeasure[] | CSSMeasure;
  colSizes?: CSSMeasure[] | CSSMeasure;
}): ParsedTemplateResult {
  const numRows = areas.length;
  const numCols = areas[0].length;

  const uniqueAreas = new Set<string>();

  const gridTemplateAreas = areas
    .map((rowDef) => {
      if (rowDef.length !== numCols)
        throw new Error("Inconsistant number of columns in areas template");
      rowDef.map((area) => uniqueAreas.add(area));
      return `"${rowDef.join(" ")}"`;
    })
    .join("\n");

  return {
    numRows,
    numCols,
    styles: {
      gridTemplateAreas,
      gridTemplateColumns: buildTractSizes(numCols, colSizes, "column"),
      gridTemplateRows: buildTractSizes(numRows, rowSizes, "row"),
    },
    uniqueAreas: [...uniqueAreas],
  };
}

function buildTractSizes(
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

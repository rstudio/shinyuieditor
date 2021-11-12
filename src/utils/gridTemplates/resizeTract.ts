import { CSSMeasure } from "GridTypes";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { TemplatedGridProps } from "./types";

export default function resizeTract(
  template: TemplatedGridProps,
  { index, dir }: { index: number; dir: TractDirection },
  size: CSSMeasure
): TemplatedGridProps {
  const sizeForDirProp = dir === "rows" ? "rowSizes" : "colSizes";

  let newSizes: CSSMeasure[] | CSSMeasure | undefined;

  if (dir === "rows") {
    newSizes = template.rowSizes;
  } else {
    newSizes = template.colSizes;
  }

  if (!Array.isArray(newSizes)) {
    throw new Error(
      "Can't update sizes of tract because tract sizes is repeated"
    );
  }

  newSizes[index - 1] = size;

  return {
    ...template,
    [sizeForDirProp]: newSizes,
  };
}

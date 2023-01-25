import type { CSSMeasure } from "../Inputs/CSSUnitInput/CSSMeasure";

export type GridLayoutArgs = {
  layout: string[] | string;
  row_sizes: CSSMeasure[] | CSSMeasure;
  col_sizes: CSSMeasure[] | CSSMeasure;
  gap_size: CSSMeasure;
};

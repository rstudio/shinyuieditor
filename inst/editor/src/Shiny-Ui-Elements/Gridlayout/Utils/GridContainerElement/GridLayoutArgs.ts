import type { CSSMeasure } from "../../../../components/Inputs/CSSUnitInput/CSSMeasure";

export type GridLayoutArgs = {
  layout: string[];
  row_sizes: CSSMeasure[];
  col_sizes: CSSMeasure[];
  gap_size: CSSMeasure;
};

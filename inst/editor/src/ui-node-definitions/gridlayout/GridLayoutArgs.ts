import type { CSSMeasure } from "../inputFieldTypes";

export type GridLayoutArgs = {
  layout: string[];
  row_sizes: CSSMeasure[];
  col_sizes: CSSMeasure[];
  gap_size: CSSMeasure;
};

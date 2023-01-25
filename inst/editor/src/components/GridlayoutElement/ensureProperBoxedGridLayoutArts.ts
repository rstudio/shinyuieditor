import { ensureArray } from "../../utils/array-helpers";
import type { CSSMeasure } from "../Inputs/CSSUnitInput/CSSMeasure";

import type { GridLayoutArgs } from "./GridLayoutArgs";

export type GridLayoutArgsProperlyBoxed = {
  layout: string[];
  row_sizes: CSSMeasure[];
  col_sizes: CSSMeasure[];
  gap_size: CSSMeasure;
};

/**
 * When we have layouts that are a single row or column we can have issues with
 * our JSON parser/encoder deciding that a single element is just an unboxed
 * string instead of a single row definition etc.. This function makes sure the
 * arguments are in their proper array-ed format for parsing.
 * @param grid_args Straight from json parsing gridlayout args
 * @returns Gridlayout args where the layout and tract sizes are all ensured to
 * be arrays
 */
export function ensureProperBoxedGridLayoutArgs({
  layout,
  row_sizes,
  col_sizes,
  gap_size,
}: GridLayoutArgs): GridLayoutArgsProperlyBoxed {
  // Handle single row layout
  layout = ensureArray(layout);
  row_sizes = ensureArray(row_sizes);
  col_sizes = ensureArray(col_sizes);

  return {
    layout,
    row_sizes,
    col_sizes,
    gap_size,
  };
}

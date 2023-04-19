import { nodeInfoFactory } from "../nodeInfoFactory";

import type { GridLayoutArgs } from "./GridLayoutArgs";

export type TractDirection = "rows" | "cols";

export const grid_page = nodeInfoFactory<
  GridLayoutArgs & { theme?: unknown }
>()({
  id: "grid_page",
  r_info: {
    fn_name: "grid_page",
    package: "gridlayout",
  },
  title: "Grid Page",
  takesChildren: true,
  settingsInfo: {
    gap_size: {
      label: "Width",
      inputType: "cssMeasure",
      defaultValue: "10px",
      units: ["px", "rem"],
    },
    layout: {
      inputType: "omitted",
      defaultValue: [". .", ". ."],
    },
    row_sizes: {
      inputType: "omitted",
      defaultValue: ["1fr", "1fr"],
    },
    col_sizes: {
      inputType: "omitted",
      defaultValue: ["1fr", "1fr"],
    },
    theme: { inputType: "omitted", optional: true },
  },

  category: "gridlayout",
});

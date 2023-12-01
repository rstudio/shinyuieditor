import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { GridLayoutArgs } from "../GridLayoutArgs";

export const grid_container = nodeInfoFactory<GridLayoutArgs>()({
  id: "grid_container",
  r_info: {
    fn_name: "grid_container",
    package: "gridlayout",
  },
  title: "Grid Container",
  takesChildren: true,
  settingsInfo: {
    gap_size: {
      label: "Gap size",
      inputType: "cssMeasure",
      defaultValue: "10px",
      units: ["px", "rem"],
    },
    layout: {
      inputType: "omitted",
      defaultValue: [". .", ". ."],
    },
    row_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] },
    col_sizes: { inputType: "omitted", defaultValue: ["1fr", "1fr"] },
  },
  category: "Tabs",
  description: `A general container for arranging items using \`gridlayout\``,
});

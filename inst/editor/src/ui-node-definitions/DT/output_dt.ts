import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export const output_dt = nodeInfoFactory<{
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
}>()({
  id: "DTOutput",
  r_info: {
    fn_name: "DTOutput",
    package: "DT",
    output_bindings: {
      renderScaffold: {
        fn_name: "renderDT",
        fn_body: `iris`,
      },
    },
  },
  title: "DT Table",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "id",
      inputOrOutput: "output",
      label: "Output ID",
      defaultValue: "myTable",
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
      useDefaultIfOptional: true,
    },
    height: {
      label: "Height",
      inputType: "cssMeasure",
      defaultValue: "auto",
      optional: true,
    },
  },
  category: "Outputs",
  description: `\`DataTable\` table output`,
});

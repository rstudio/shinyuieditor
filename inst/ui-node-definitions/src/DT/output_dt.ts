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
  },
  title: "DT Table",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "string",
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
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderDT({\n  iris\n})`,
    },
  },
  category: "Outputs",
  description: `\`DataTable\` table output`,
});

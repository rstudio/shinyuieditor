import icon from "../../assets/icons/shinyTable.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import { nodeInfoFactory } from "../nodeInfoFactory";

import DtDTOutput from "./DtOutput";

export type DTOutputSettings = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const dtDTOutputInfo = nodeInfoFactory<DTOutputSettings>()({
  r_package: "DT",
  r_fn_name: "DTOutput",
  title: "DT Table",
  takesChildren: false,
  UiComponent: DtDTOutput,
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
  iconSrc: icon,
  category: "Outputs",
  description: `\`DataTable\` table output`,
});

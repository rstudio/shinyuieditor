import icon from "../../assets/icons/shinyTable.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import type { UiComponentInfo } from "../uiNodeTypes";

import DtDTOutput from "./DtOutput";

export type DTOutputSettings = {
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
};

export const dtDTOutputInfo: UiComponentInfo<DTOutputSettings> = {
  title: "DT Table",
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
  acceptsChildren: true,
  iconSrc: icon,
  category: "Outputs",
  description: `\`DataTable\` table output`,
};

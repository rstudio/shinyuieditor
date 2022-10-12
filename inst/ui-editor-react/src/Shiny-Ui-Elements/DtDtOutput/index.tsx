import icon from "assets/icons/shinyTable.png";
import type { CSSMeasure } from "components/Inputs/CSSUnitInput/CSSMeasure";
import {
  makeOutputIdInfo,
  optionalWidthInfo,
} from "Shiny-Ui-Elements/commonSettingsTemplates";

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
    outputId: makeOutputIdInfo("myTable"),
    width: optionalWidthInfo,
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

export default dtDTOutputInfo;

import buttonIcon from "../../assets/icons/shinyButton.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
} from "../commonSettingsTemplates";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyActionButton from "./ShinyActionButton";

export type ShinyActionButtonProps = {
  inputId: string;
  label: string;
  width?: CSSMeasure;
};

export const shinyActionButtonInfo: UiComponentInfo<ShinyActionButtonProps> = {
  title: "Action Button",
  UiComponent: ShinyActionButton,
  settingsInfo: {
    inputId: makeInputIdInfo("myButton"),
    label: makeLabelInputInfo("My Button"),
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
    },
  },
  acceptsChildren: false,
  iconSrc: buttonIcon,
  category: "Inputs",
  description:
    "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
};

export default ShinyActionButton;
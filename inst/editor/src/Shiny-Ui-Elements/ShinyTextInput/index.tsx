import icon from "../../assets/icons/shinyTextinput.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
import {
  makeInputIdInfo,
  makeLabelInputInfo,
} from "../commonSettingsTemplates";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyTextInput from "./ShinyTextInput";

export type ShinyTextInputProps = {
  inputId: string;
  label: string;
  value: string;
  placeholder?: string;
  width?: CSSMeasure;
};

export const shinyTextInputInfo: UiComponentInfo<ShinyTextInputProps> = {
  title: "Text Input",
  UiComponent: ShinyTextInput,
  settingsInfo: {
    inputId: makeInputIdInfo("myTextInput"),
    label: makeLabelInputInfo("Text Input"),
    value: {
      inputType: "string",
      label: "Starting text",
      defaultValue: "",
    },
    placeholder: {
      inputType: "string",
      label: "Empty input placeholder",
      defaultValue: "placeholder text",
      optional: true,
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
    },
  },
  acceptsChildren: false,
  iconSrc: icon,
  category: "Inputs",
  description: "Create an input control for entry of unstructured text values.",
};

import icon from "../../assets/icons/shinyTextinput.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";
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
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "myTextInput",
    },
    label: {
      inputType: "string",
      label: "label",
      defaultValue: "Text Input",
    },
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
  serverBindings: {
    inputs: {
      inputIdKey: "inputId",
    },
  },
  acceptsChildren: false,
  iconSrc: icon,
  category: "Inputs",
  description: "Create an input control for entry of unstructured text values.",
};

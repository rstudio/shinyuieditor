import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";

export type ShinyActionButtonArgs = {
  inputId: string;
  label: string;
  width?: CSSMeasure;
};

export const input_action_button = nodeInfoFactory<ShinyActionButtonArgs>()({
  title: "Action Button",
  r_info: {
    fn_name: "actionButton",
    package: "shiny",
  },
  id: "actionButton",
  takesChildren: false,
  settingsInfo: {
    inputId: {
      inputType: "string",
      label: "inputId",
      defaultValue: "myButton",
    },
    label: {
      inputType: "string",
      label: "Label",
      defaultValue: "My Button",
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
  category: "Inputs",
  description:
    "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
});

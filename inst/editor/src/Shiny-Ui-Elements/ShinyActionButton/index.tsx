import buttonIcon from "../../assets/icons/shinyButton.png";
import type { CSSMeasure } from "../../components/Inputs/CSSUnitInput/CSSMeasure";

import { nodeInfoFactory } from "./makeUiNodeInfo";
import ShinyActionButton from "./ShinyActionButton";

export type ShinyActionButtonProps = {
  inputId: string;
  label: string;
  width?: CSSMeasure;
};

export const shinyActionButtonInfo = nodeInfoFactory<ShinyActionButtonProps>()({
  title: "Action Button",
  library: "shiny",
  name: "actionButton",
  acceptsChildren: false,
  UiComponent: ShinyActionButton,
  iconSrc: buttonIcon,
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

// export const shinyActionButtonInfo = makeUiNodeInfo<ShinyActionButtonProps>({
//   library: "shiny",
//   name: "actionButton",
//   title: "Action Button",
//   UiComponent: ShinyActionButton,
//   settingsInfo: makeSettingsInfo<ShinyActionButtonProps>({
//     inputId: {
//       inputType: "string",
//       label: "inputId",
//       defaultValue: "myButton",
//     },
//     label: {
//       inputType: "string",
//       label: "Label",
//       defaultValue: "My Button",
//     },
//     width: {
//       inputType: "cssMeasure",
//       label: "Width",
//       defaultValue: "100%",
//       units: ["%", "px", "rem"],
//       optional: true,
//     },
//   }),
//   serverBindings: {
//     inputs: {
//       inputIdKey: "inputId",
//     },
//   },
//   acceptsChildren: false,
//   iconSrc: buttonIcon,
//   category: "Inputs",
//   description:
//     "Creates an action button whose value is initially zero, and increments by one each time it is pressed.",
// });

export default ShinyActionButton;

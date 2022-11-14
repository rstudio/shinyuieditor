import uiIcon from "assets/icons/shinyTextOutput.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyTextOutput from "./ShinyTextOutput";

export type ShinyTextOutputProps = {
  outputId: string;
};

export const shinyTextOutputInfo: UiComponentInfo<ShinyTextOutputProps> = {
  title: "Text Output",
  UiComponent: ShinyTextOutput,
  settingsInfo: {
    outputId: {
      label: "Output ID",
      inputType: "string",
      defaultValue: "textOutput",
    },
  },
  acceptsChildren: false,
  iconSrc: uiIcon,
  category: "Outputs",
  description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `,
};

export default ShinyTextOutput;

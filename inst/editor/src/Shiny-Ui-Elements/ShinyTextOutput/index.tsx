import uiIcon from "../../assets/icons/shinyTextOutput.png";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinyTextOutput from "./ShinyTextOutput";

export type ShinyTextOutputProps = {
  outputId: string;
};

export const shinyTextOutputInfo = nodeInfoFactory<ShinyTextOutputProps>()({
  r_package: "shiny",
  name: "textOutput",
  title: "Text Output",
  takesChildren: false,
  UiComponent: ShinyTextOutput,
  settingsInfo: {
    outputId: {
      label: "Output ID",
      inputType: "string",
      defaultValue: "textOutput",
    },
  },
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderText({\n  "Hello, World"\n})`,
    },
  },
  iconSrc: uiIcon,
  category: "Outputs",
  description: `
  Render a reactive output variable as text within an application page. 
  Usually paired with \`renderText()\`.
  `,
});
export default ShinyTextOutput;

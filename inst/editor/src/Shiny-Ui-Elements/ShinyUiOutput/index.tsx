import uiIcon from "../../assets/icons/shinyImage.png";
import { nodeInfoFactory } from "../nodeInfoFactory";

import ShinyUiOutput from "./ShinyUiOutput";

export type ShinyUiOutputProps = {
  outputId: string;
};

export const shinyUiOutputInfo = nodeInfoFactory<ShinyUiOutputProps>()({
  r_package: "shiny",
  name: "uiOutput",
  title: "Dynamic UI Output",
  takesChildren: false,
  UiComponent: ShinyUiOutput,
  settingsInfo: {
    outputId: {
      label: "Output ID",
      inputType: "string",
      defaultValue: "dynamicUiOutput",
    },
  },
  serverBindings: {
    outputs: {
      outputIdKey: "outputId",
      renderScaffold: `renderUI({\n  h1("Hello, World")\n})`,
    },
  },
  iconSrc: uiIcon,
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `,
});
export default ShinyUiOutput;

import uiIcon from "../../assets/icons/shinyImage.png";
import type { UiComponentInfo } from "../uiNodeTypes";

import ShinyUiOutput from "./ShinyUiOutput";

export type ShinyUiOutputProps = {
  outputId: string;
};

export const shinyUiOutputInfo: UiComponentInfo<ShinyUiOutputProps> = {
  title: "Dynamic UI Output",
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
  acceptsChildren: false,
  iconSrc: uiIcon,
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `,
};

export default ShinyUiOutput;

import uiIcon from "assets/icons/shinyImage.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyuiOutputSettings } from "./SettingsPanel";
import ShinyUiOutput from "./ShinyUiOutput";

export type ShinyUiOutputProps = {
  outputId: string;
};

export const shinyUiOutputInfo: UiComponentInfo<ShinyUiOutputProps> = {
  title: "Dynamic UI Output",
  UiComponent: ShinyUiOutput,
  SettingsComponent: ShinyuiOutputSettings,
  acceptsChildren: false,
  defaultSettings: { outputId: "myUi" },
  iconSrc: uiIcon,
  category: "Outputs",
  description: `
  Render a reactive output variable as HTML within an application page. 
  The text will be included within an HTML \`div\` tag, and is presumed to 
  contain HTML content which should not be escaped.
  `,
};

export default ShinyUiOutput;

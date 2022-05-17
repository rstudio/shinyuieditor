import uiIcon from "assets/icons/shinyTextOutput.png";

import type { UiComponentInfo } from "../uiNodeTypes";

import { ShinyTextOutputSettings } from "./SettingsPanel";
import ShinyTextOutput from "./ShinyTextOutput";

export type ShinyTextOutputProps = {
  outputId: string;
};

export const shinyTextOutputInfo: UiComponentInfo<ShinyTextOutputProps> = {
  title: "Text Output",
  UiComponent: ShinyTextOutput,
  SettingsComponent: ShinyTextOutputSettings,
  acceptsChildren: false,
  defaultSettings: { outputId: "myText" },
  iconSrc: uiIcon,
  category: "Outputs",
};

export default ShinyTextOutput;

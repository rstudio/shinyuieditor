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
};

export default ShinyUiOutput;

import type { UiComponentInfo } from "../uiNodeTypes";

import { UnknownUiFunctionSettings } from "./SettingsPanel";
import UnknownUiFunction from "./UnknownUiFunction";

export type UnknownUiFunctionProps = {
  text: string;
};

export const unknownUiFunctionInfo: UiComponentInfo<UnknownUiFunctionProps> = {
  title: "Unknown UI Function",
  UiComponent: UnknownUiFunction,
  SettingsComponent: UnknownUiFunctionSettings,
  acceptsChildren: false,
  defaultSettings: { text: "unknownUiFunction()" },
};

export default UnknownUiFunction;

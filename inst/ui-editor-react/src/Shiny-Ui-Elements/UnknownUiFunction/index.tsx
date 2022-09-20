import type { UiComponentInfo } from "../uiNodeTypes";

import UnknownUiFunction from "./UnknownUiFunction";

export type UnknownUiFunctionProps = {
  text: string;
};

export const unknownUiFunctionInfo: UiComponentInfo<UnknownUiFunctionProps> = {
  title: "Unknown UI Function",
  UiComponent: UnknownUiFunction,
  settingsInfo: {
    text: {
      inputType: "omitted",
      defaultValue: "Unknown Ui Function",
    },
  },
  acceptsChildren: false,
  defaultSettings: { text: "unknownUiFunction()" },
};

export default UnknownUiFunction;

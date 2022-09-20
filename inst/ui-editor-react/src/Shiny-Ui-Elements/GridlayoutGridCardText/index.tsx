import textIcon from "assets/icons/shinyText.png";
import {
  alignTextCenter,
  alignTextLeft,
  alignTextRight,
} from "components/Icons";
import type { UiNodeSettingsInfo } from "components/Inputs/SettingsFormBuilder/inputFieldTypes";

import type { UiComponentInfo } from "../uiNodeTypes";

import GridlayoutGridCardText from "./GridlayoutCardText";

export interface GridlayoutGridCardTextProps {
  content: string;
  alignment: "center" | "start" | "end";
  area: string;
  is_title?: boolean;
}

export const gridCardTextSettingsInfo: UiNodeSettingsInfo = {
  content: {
    label: "Panel text",
    inputType: "string",
    defaultValue: "Text for card",
  },
  alignment: {
    label: "Text alignment",
    inputType: "radio",
    defaultValue: "start",
    choices: {
      start: { icon: alignTextLeft, label: "left" },
      center: { icon: alignTextCenter, label: "center" },
      end: { icon: alignTextRight, label: "right" },
    },
  },
  area: {
    label: "Name of grid area",
    inputType: "string",
    defaultValue: "default-area",
  },
  is_title: {
    label: "Use text as website title",
    inputType: "boolean",
    defaultValue: false,
    optional: true,
  },
};

export const gridlayoutTextPanelInfo: UiComponentInfo<GridlayoutGridCardTextProps> =
  {
    title: "Grid Text Card",
    UiComponent: GridlayoutGridCardText,
    settingsInfo: gridCardTextSettingsInfo,
    acceptsChildren: false,
    defaultSettings: {
      area: "text_panel",
      content: "Text from Chooser",
      alignment: "start",
    },
    iconSrc: textIcon,
    category: "gridlayout",
    description:
      "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics.",
  };

export default GridlayoutGridCardText;

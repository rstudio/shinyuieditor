import textIcon from "../../../assets/icons/shinyText.png";
import {
  alignTextLeft,
  alignTextCenter,
  alignTextRight,
} from "../../../components/Icons";
import type { UiComponentInfo } from "../../uiNodeTypes";
import { grid_container_nodes } from "../grid_container_nodes";

import GridlayoutGridCardText from "./GridlayoutCardText";

export type GridlayoutGridCardTextProps = {
  content: string;
  alignment: "center" | "start" | "end";
  area: string;
  is_title?: boolean;
};

export const gridlayoutTextPanelInfo: UiComponentInfo<GridlayoutGridCardTextProps> =
  {
    library: "gridlayout",
    name: "grid_card_text",
    title: "Grid Text Card",
    UiComponent: GridlayoutGridCardText,
    settingsInfo: {
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
    },
    allowedParents: grid_container_nodes,
    acceptsChildren: false,
    iconSrc: textIcon,
    category: "gridlayout",
    description:
      "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics.",
  };

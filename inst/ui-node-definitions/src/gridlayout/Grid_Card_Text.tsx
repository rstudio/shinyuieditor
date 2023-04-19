import { nodeInfoFactory } from "../nodeInfoFactory";

import { grid_parents } from "./Grid_Card";

export const grid_card_text = nodeInfoFactory<{
  content: string;
  alignment: "center" | "start" | "end";
  area: string;
  is_title?: boolean;
}>()({
  id: "grid_card_text",
  r_info: {
    fn_name: "grid_card_text",
    package: "gridlayout",
  },
  title: "Grid Text Card",
  takesChildren: false,
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
        // start: { icon: alignTextLeft, label: "left" },
        // center: { icon: alignTextCenter, label: "center" },
        // end: { icon: alignTextRight, label: "right" },
        // TODO: Figure out how to get icons in here again
        start: { label: "left" },
        center: { label: "center" },
        end: { label: "right" },
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
  allowedParents: grid_parents,
  category: "gridlayout",
  description:
    "A grid card that contains just text that is vertically centered within the panel. Useful for app titles or displaying text-based statistics.",
});

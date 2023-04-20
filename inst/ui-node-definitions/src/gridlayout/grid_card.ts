import type { BslibCardArguments } from "../Bslib/card";
import { bslib_card } from "../Bslib/card";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

export type GridItemSettings = {
  area: string;
};

export type GridBslibCardSettings = BslibCardArguments & GridItemSettings;

export const grid_parents = ["grid_container", "grid_page"];

export const grid_card = nodeInfoFactory<GridBslibCardSettings>()({
  id: "grid_card",
  r_info: {
    fn_name: "grid_card",
    package: "gridlayout",
  },
  title: "Grid Card",
  takesChildren: true,
  settingsInfo: {
    area: {
      label: "Name of grid area",
      inputType: "string",
      defaultValue: "default-area",
    },
    ...bslib_card.settingsInfo,
  },
  allowedParents: grid_parents,
  category: "gridlayout",
  description: "bslib styled card for grid layouts",
});

export type GridlayoutCardNode = Extract<KnownShinyUiNode, { id: "grid_card" }>;

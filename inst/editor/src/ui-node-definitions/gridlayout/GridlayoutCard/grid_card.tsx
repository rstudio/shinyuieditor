import { BslibCardContainer } from "../../Bslib/BslibCardContainer";
import type { BslibCardArguments } from "../../Bslib/card";
import { bslib_card } from "../../Bslib/card";
import { renderCardElements } from "../../Bslib/Utils/render_card_elements";
import type { UiNodeComponent } from "../../nodeInfoFactory";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { KnownShinyUiNode } from "../../uiNodeTypes";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

export type GridItemSettings = {
  area: string;
};

const GridlayoutGridCard: UiNodeComponent<
  GridBslibCardSettings,
  { TakesChildren: true }
> = (node) => {
  const {
    namedArgs: { area, ...card_args },
    children = [],
    path,
    wrapperProps,
  } = node;

  const compRef = useGridItemSwapping({ area, path });

  return (
    <BslibCardContainer
      ref={compRef}
      style={{ gridArea: area }}
      card_args={card_args}
      {...wrapperProps}
    >
      {renderCardElements(children, path)}
    </BslibCardContainer>
  );
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
  ui_component: GridlayoutGridCard,
});

export type GridlayoutCardNode = Extract<KnownShinyUiNode, { id: "grid_card" }>;

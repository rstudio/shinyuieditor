import { grid_card } from "ui-node-definitions/src/gridlayout/Grid_Card";
import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { BslibCardContainer } from "../../Bslib/BslibCardContainer";
import { render_card_elements } from "../../Bslib/Utils/render_card_elements";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../../utils/add_editor_info_to_ui_node";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

const GridlayoutGridCard: UiComponentFromInfo<typeof grid_card> = (node) => {
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
      {render_card_elements(children, path)}
    </BslibCardContainer>
  );
};

export const gridlayoutCardInfo = add_editor_info_to_ui_node(grid_card, {
  UiComponent: GridlayoutGridCard,
});
export type GridlayoutCardNode = Extract<KnownShinyUiNode, { id: "grid_card" }>;

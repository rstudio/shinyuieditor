import { BslibCardContainer } from "../../../ui-node-definitions/Bslib/BslibCardContainer";
import { renderCardElements } from "../../../ui-node-definitions/Bslib/Utils/render_card_elements";
import { grid_card } from "../../../ui-node-definitions/gridlayout/grid_card";
import type { KnownShinyUiNode } from "../../../ui-node-definitions/uiNodeTypes";
import type { UiComponentFromInfo } from "../../utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../utils/add_editor_info_to_ui_node";
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
      {renderCardElements(children, path)}
    </BslibCardContainer>
  );
};

export const gridlayoutCardInfo = addEditorInfoToUiNode(grid_card, {
  UiComponent: GridlayoutGridCard,
});
export type GridlayoutCardNode = Extract<KnownShinyUiNode, { id: "grid_card" }>;

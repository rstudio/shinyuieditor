import containerIcon from "../../../assets/icons/shinyContainer.png";
import type { BslibCardArguments } from "../../Bslib/BslibCard";
import { bslib_card_settings_info } from "../../Bslib/BslibCard";
import { BslibCardContainer } from "../../Bslib/BslibCardContainer";
import { render_card_elements } from "../../Bslib/Utils/render_card_elements";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { UiNodeComponent } from "../../uiNodeTypes";
import { grid_container_nodes } from "../grid_container_nodes";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

export type GridItemSettings = {
  area: string;
};
export type GridBslibCardSettings = BslibCardArguments & GridItemSettings;

const GridlayoutGridCard: UiNodeComponent<GridBslibCardSettings> = (node) => {
  const {
    uiArguments: { area, ...card_args },
    uiChildren = [],
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
      {render_card_elements(uiChildren, path)}
    </BslibCardContainer>
  );
};

export const gridlayoutCardInfo = nodeInfoFactory<GridBslibCardSettings>()({
  library: "gridlayout",
  name: "grid_card",
  title: "Grid Card",
  UiComponent: GridlayoutGridCard,
  settingsInfo: {
    area: {
      label: "Name of grid area",
      inputType: "string",
      defaultValue: "default-area",
    },
    ...bslib_card_settings_info,
  },
  allowedParents: grid_container_nodes,
  iconSrc: containerIcon,
  category: "gridlayout",
  description: "bslib styled card for grid layouts",
});

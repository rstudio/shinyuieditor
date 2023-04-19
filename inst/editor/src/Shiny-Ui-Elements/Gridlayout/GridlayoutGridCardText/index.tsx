import { grid_card_text } from "ui-node-definitions/src/gridlayout/Grid_Card_Text";

import textIcon from "../../../assets/icons/shinyText.png";
import { mergeClasses } from "../../../utils/mergeClasses";
import type { UiComponent_from_info } from "../../add_editor_info_to_ui_node";
import { add_editor_info_to_ui_node } from "../../add_editor_info_to_ui_node";
import { BsCard } from "../Utils/GridLayoutPanelHelpers/GridCards";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import classes from "./styles.module.css";

const GridlayoutGridCardText: UiComponent_from_info<typeof grid_card_text> = ({
  namedArgs: { content: title, area, alignment },
  path,
  wrapperProps,
}) => {
  const compRef = useGridItemSwapping({ area, path });

  return (
    <BsCard
      ref={compRef}
      className={mergeClasses(classes.textPanel, "gridlayout-textPanel")}
      style={{ gridArea: area, justifyItems: alignment }}
      {...wrapperProps}
    >
      <div className={classes.text_holder}>
        <h1>{title}</h1>
      </div>
    </BsCard>
  );
};

export const gridlayoutTextPanelInfo = add_editor_info_to_ui_node(
  grid_card_text,
  {
    iconSrc: textIcon,
    component: GridlayoutGridCardText,
  }
);

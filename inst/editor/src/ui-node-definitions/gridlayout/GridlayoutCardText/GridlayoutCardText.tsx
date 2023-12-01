import type { UiComponentFromInfo } from "../../../Shiny-Ui-Elements/utils/add_editor_info_to_ui_node";
import { addEditorInfoToUiNode } from "../../../Shiny-Ui-Elements/utils/add_editor_info_to_ui_node";
import textIcon from "../../assets/icons/shinyText.png";
import { BsCard } from "../Utils/BsCard";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import { grid_card_text } from "./grid_card_text";

const GridlayoutGridCardText: UiComponentFromInfo<typeof grid_card_text> = ({
  namedArgs: { content: title, area, alignment },
  path,
  wrapperProps,
}) => {
  const compRef = useGridItemSwapping({ area, path });

  return (
    <BsCard
      ref={compRef}
      className="bg-white w-full h-full relative gridlayout-textPanel flex flex-row items-center px-3"
      style={{ gridArea: area, justifyContent: alignment }}
      {...wrapperProps}
    >
      <h1 className="text-3xl">{title}</h1>
    </BsCard>
  );
};

export const gridlayoutTextPanelInfo = addEditorInfoToUiNode(grid_card_text, {
  iconSrc: textIcon,
  UiComponent: GridlayoutGridCardText,
});

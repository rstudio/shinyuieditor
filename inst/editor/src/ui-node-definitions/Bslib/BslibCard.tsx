import icon from "../../assets/icons/shinyContainer.png";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";

import { BslibCardContainer } from "./BslibCardContainer";
import { bslib_card } from "./card";
import { renderCardElements } from "./Utils/render_card_elements";

export const bslibCardInfo = addEditorInfoToUiNode(bslib_card, {
  iconSrc: icon,
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <BslibCardContainer {...wrapperProps} card_args={namedArgs}>
        {renderCardElements(children, path)}
      </BslibCardContainer>
    );
  },
});

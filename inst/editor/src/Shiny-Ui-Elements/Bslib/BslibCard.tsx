import { bslib_card } from "ui-node-definitions/src/Bslib/card";

import icon from "../../assets/icons/shinyContainer.png";
import { add_editor_info_to_ui_node } from "../add_editor_info_to_ui_node";

import { BslibCardContainer } from "./BslibCardContainer";
import { render_card_elements } from "./Utils/render_card_elements";

export const bslibCardInfo = add_editor_info_to_ui_node(bslib_card, {
  iconSrc: icon,
  UiComponent: ({ namedArgs, children = [], path, wrapperProps }) => {
    return (
      <BslibCardContainer {...wrapperProps} card_args={namedArgs}>
        {render_card_elements(children, path)}
      </BslibCardContainer>
    );
  },
});

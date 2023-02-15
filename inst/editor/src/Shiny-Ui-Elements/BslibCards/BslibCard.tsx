import { mergeClasses } from "../../utils/mergeClasses";
import type { UiNodeComponent } from "../uiNodeTypes";

import { render_card_elements } from "./render_card_elements";
import styles from "./style.module.css";

export type CardSettings = {};

const BslibCard: UiNodeComponent<CardSettings> = ({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}) => {
  return (
    <div className={mergeClasses("card", styles.container)} {...wrapperProps}>
      {render_card_elements(uiChildren, path)}
    </div>
  );
};

export default BslibCard;

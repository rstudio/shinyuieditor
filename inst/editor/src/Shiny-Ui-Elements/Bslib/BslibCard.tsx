import icon from "../../assets/icons/shinyContainer.png";
import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import styles from "./BslibCard.module.css";
import { render_card_elements } from "./Utils/render_card_elements";

export type CardSettings = {};

const BslibCard: UiNodeComponent<CardSettings> = ({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}) => {
  return (
    <div className={mergeClasses("card", styles.card)} {...wrapperProps}>
      <div className={styles.card_contents_holder}>
        {render_card_elements(uiChildren, path)}
      </div>
    </div>
  );
};

export const bslibCardInfo: UiComponentInfo<CardSettings> = {
  title: "Card",
  UiComponent: BslibCard,
  settingsInfo: {},
  acceptsChildren: true,
  iconSrc: icon,
  category: "Containers",
  description: "Bootstrap card with smart fill behavior",
};

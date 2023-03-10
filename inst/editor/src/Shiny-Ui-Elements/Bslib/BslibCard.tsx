import icon from "../../assets/icons/shinyContainer.png";
import type { ArgsToDynamicInfo } from "../../components/Inputs/SettingsFormBuilder/inputFieldTypes";
import { mergeClasses } from "../../utils/mergeClasses";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { UiNodeComponent } from "../uiNodeTypes";

import styles from "./BslibCard.module.css";
import { render_card_elements } from "./Utils/render_card_elements";

export type CardSettings = {
  full_screen?: boolean;
};

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

export const bslib_card_settings_info: ArgsToDynamicInfo<CardSettings> = {
  full_screen: {
    inputType: "boolean",
    defaultValue: true,
    label: "Allow fullscreen mode?",
    optional: true,
  },
};

export const bslibCardInfo = nodeInfoFactory<CardSettings>()({
  library: "bslib",
  name: "card",
  title: "Card",
  UiComponent: BslibCard,
  settingsInfo: bslib_card_settings_info,
  iconSrc: icon,
  category: "Containers",
  description: "Bootstrap card with smart fill behavior",
});

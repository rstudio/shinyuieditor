import icon from "../../assets/icons/shinyContainer.png";
import type { UiComponentInfo } from "../uiNodeTypes";

import type { CardSettings } from "./BslibCard";
import BslibCard from "./BslibCard";

export const bslibCardInfo: UiComponentInfo<CardSettings> = {
  title: "Card",
  UiComponent: BslibCard,
  settingsInfo: {},
  acceptsChildren: true,
  iconSrc: icon,
  category: "Containers",
  description: "Bootstrap card with smart fill behavior",
};

export { bslibCardBodyInfo } from "./BslibCardBody";
export { bslibCardFooterInfo } from "./BslibCardFooter";
export { bslibCardHeaderInfo } from "./BslibCardHeader";

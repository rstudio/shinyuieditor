import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import styles from "./style.module.css";
export type CardHeaderSettings = {
  title: string;
};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = (node) => {
  const { uiArguments, uiChildren = [], path, wrapperProps } = node;
  console.log("Card header", node);
  return (
    <div
      className={mergeClasses(styles.header, "card-header")}
      {...wrapperProps}
    >
      <span>{uiArguments.title}</span>
      <div>Another item!</div>
    </div>
  );
};

export const bslibCardHeaderInfo: UiComponentInfo<CardHeaderSettings> = {
  title: "Card Header",
  UiComponent: BslibCardHeader,
  settingsInfo: {
    title: {
      label: "Name of node",
      inputType: "string",
      defaultValue: "NODE NAME",
    },
  },
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};

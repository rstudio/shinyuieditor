import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import { ChildrenWithDropNodes } from "./ChildrenWithDropNodes";
import styles from "./style.module.css";
export type CardHeaderSettings = {};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = (node) => {
  const { uiArguments, uiChildren, path, wrapperProps } = node;

  return (
    <div
      className={mergeClasses(styles.card_header, "card-header")}
      {...wrapperProps}
    >
      <ChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        dropPanelClass={styles.drop_watcher}
      />
    </div>
  );
};

export const bslibCardHeaderInfo: UiComponentInfo<CardHeaderSettings> = {
  title: "Card Header",
  UiComponent: BslibCardHeader,
  settingsInfo: {},
  acceptsChildren: true,
  category: "Cards",
  description: "Header for bslib cards",
};

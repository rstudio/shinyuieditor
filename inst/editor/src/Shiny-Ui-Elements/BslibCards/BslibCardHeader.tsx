import { mergeClasses } from "../../utils/mergeClasses";
import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import { ChildrenWithDropNodes } from "./ChildrenWithDropNodes";
import { MutedText } from "./MutedText";
import styles from "./style.module.css";
export type CardHeaderSettings = {};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = (node) => {
  const { uiArguments, uiChildren, path, wrapperProps } = node;

  return (
    <div
      className={mergeClasses(styles.header, "card-header")}
      {...wrapperProps}
    >
      <ChildrenWithDropNodes
        uiChildren={uiChildren}
        path={path}
        dropPanelClass={styles.drop_watcher}
        showOnEmpty={<MutedText>Drag elements to add to card header</MutedText>}
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

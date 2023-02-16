import React from "react";

import UiNode from "../../components/UiNode/UiNode";
import { mergeClasses } from "../../utils/mergeClasses";
import { DropWatcherPanel } from "../GridlayoutGridCard/DropWatcherPanel";
import { makeChildPath } from "../nodePathUtils";
import type { UiComponentInfo, UiNodeComponent } from "../uiNodeTypes";

import styles from "./style.module.css";
export type CardHeaderSettings = {
  title: string;
};

const BslibCardHeader: UiNodeComponent<CardHeaderSettings> = (node) => {
  const { uiArguments, uiChildren, path, wrapperProps } = node;
  console.log("Card header", node);

  const children_nodes = uiChildren.map((childNode, i) => (
    <React.Fragment key={path.join(".") + i}>
      <UiNode path={makeChildPath(path, i)} node={childNode} />
      <DropWatcherPanel
        index={i + 1}
        numChildren={uiChildren.length}
        parentPath={path}
      />
    </React.Fragment>
  ));

  return (
    <div
      className={mergeClasses(styles.header, "card-header")}
      {...wrapperProps}
    >
      <span>{uiArguments.title}</span>
      {children_nodes}
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

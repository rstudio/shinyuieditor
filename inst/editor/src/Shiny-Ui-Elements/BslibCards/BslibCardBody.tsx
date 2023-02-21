import React from "react";

import UiNode from "../../components/UiNode/UiNode";
import { CardDropWatcherPanel } from "../GridlayoutGridCard/DropWatcherPanel";
import { makeChildPath } from "../nodePathUtils";
import type { UiComponentInfo, UiNodeComponentProps } from "../uiNodeTypes";

import { CardBody } from "./CardBody";
import styles from "./style.module.css";

export const bslibCardBodyInfo: UiComponentInfo<CardBodySettings> = {
  title: "Card Body",
  UiComponent: BslibCardBody,
  settingsInfo: {
    title: {
      label: "Name of node",
      inputType: "string",
      defaultValue: "NODE NAME",
    },
  },
  acceptsChildren: true,
  category: "Cards",
  description: "body holder for bslib cards",
};

export type CardBodySettings = {
  title: string;
};

function BslibCardBody({
  uiArguments,
  uiChildren = [],
  path,
  wrapperProps,
}: UiNodeComponentProps<CardBodySettings, { TakesChildren: true }>) {
  const numChildren = uiChildren.length;

  return (
    <CardBody {...wrapperProps}>
      <CardDropWatcherPanel
        index={0}
        parentPath={path}
        numChildren={numChildren}
      />
      {numChildren > 0 ? (
        uiChildren?.map((childNode, i) => (
          <React.Fragment key={path.join(".") + i}>
            <UiNode path={makeChildPath(path, i)} node={childNode} />
            <CardDropWatcherPanel
              index={i + 1}
              numChildren={uiChildren.length}
              parentPath={path}
            />
          </React.Fragment>
        ))
      ) : (
        <div className={styles.empty_msg} />
      )}
    </CardBody>
  );
}

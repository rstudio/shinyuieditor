import React from "react";

import { CardBody } from "../../components/cards/CardBody";
import UiNode from "../../components/UiNode/UiNode";
import { CardDropWatcherPanel } from "../GridlayoutGridCard/DropWatcherPanel";
import { makeChildPath } from "../nodePathUtils";
import type { UiComponentInfo, UiNodeComponentProps } from "../uiNodeTypes";

import { MutedText } from "./MutedText";
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
    <CardBody {...wrapperProps} className={styles.card_body}>
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
        <div className={styles.empty_msg}>
          <MutedText>I am an empty card body</MutedText>
        </div>
      )}
    </CardBody>
  );
}

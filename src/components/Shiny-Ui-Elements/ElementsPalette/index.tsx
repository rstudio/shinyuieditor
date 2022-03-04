import * as React from "react";

import {
  ShinyUiNames,
  ShinyUiNode,
  shinyUiNodeInfo,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import { createDragStartCallback } from "../DragAndDropHelpers/DragAndDropHelpers";

import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = shinyUiNodeInfo,
}: {
  availableUi?: typeof shinyUiNodeInfo;
}) {
  const uiNames = Object.keys(availableUi) as ShinyUiNames[];

  return (
    <div className={classes.OptionsList}>
      {uiNames.map((uiName) => {
        const { iconSrc, title, defaultSettings } = availableUi[uiName];
        if (iconSrc === undefined) {
          return null;
        }
        const uiNode = {
          uiName,
          uiArguments: defaultSettings,
        } as ShinyUiNode;
        return (
          <div
            key={uiName}
            className={classes.OptionItem}
            draggable
            onDragStart={createDragStartCallback({ node: uiNode })}
          >
            <img src={iconSrc} alt={title} />
            <label>{title}</label>
          </div>
        );
      })}
    </div>
  );
}

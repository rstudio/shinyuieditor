import {
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { assignElementDragData } from "../DragAndDropHelpers/useDragAndDropElements";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";
import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = uiComponentAndSettings,
}: {
  availableUi?: typeof uiComponentAndSettings;
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
            onDragStart={(e) => {
              // Tag the drag event with the element type being dragged
              assignElementDragData(e, { node: uiNode });
            }}
          >
            <img src={iconSrc} alt={title} />
            <label>{title}</label>
          </div>
        );
      })}
    </div>
  );
}

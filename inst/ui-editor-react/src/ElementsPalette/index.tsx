import * as React from "react";

import type {
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";

import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = shinyUiNodeInfo,
}: {
  availableUi?: typeof shinyUiNodeInfo;
}) {
  const uiNames = Object.keys(availableUi) as ShinyUiNames[];

  return (
    <div className={classes.OptionsList}>
      {uiNames.map((uiName) => (
        <ElementOption key={uiName} uiName={uiName} />
      ))}
    </div>
  );
}

function ElementOption({ uiName }: { uiName: ShinyUiNames }) {
  const { iconSrc, title, defaultSettings } = shinyUiNodeInfo[uiName];
  const node = {
    uiName,
    uiArguments: defaultSettings,
  } as ShinyUiNode;

  const elRef = React.useRef<HTMLDivElement>(null);
  useMakeDraggable({ ref: elRef, nodeInfo: { node } });

  if (iconSrc === undefined) {
    return null;
  }
  return (
    <div ref={elRef} className={classes.OptionItem}>
      <img src={iconSrc} alt={title} />
      <label>{title}</label>
    </div>
  );
}

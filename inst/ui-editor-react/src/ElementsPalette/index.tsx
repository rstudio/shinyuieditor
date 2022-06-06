import * as React from "react";

import type {
  ShinyUiNames,
  ShinyUiNode,
  ShinyUiNodeInfo,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";

import classes from "./styles.module.css";

const categoryOrder: string[] = [
  "Inputs",
  "Outputs",
  "gridlayout",
  "uncategorized",
];

function sortByCategory(nameA: ShinyUiNames, nameB: ShinyUiNames): number {
  const categoryA = categoryOrder.indexOf(
    shinyUiNodeInfo[nameA]?.category || "uncategorized"
  );
  const categoryB = categoryOrder.indexOf(
    shinyUiNodeInfo[nameB]?.category || "uncategorized"
  );

  if (categoryA < categoryB) return -1;
  if (categoryA > categoryB) return 1;

  return 0;
}

export default function ElementsPalette({
  availableUi = shinyUiNodeInfo,
}: {
  availableUi?: ShinyUiNodeInfo;
}) {
  const ui_node_names = React.useMemo(
    () => (Object.keys(availableUi) as ShinyUiNames[]).sort(sortByCategory),
    [availableUi]
  );

  return (
    <div className={classes.elementsPalette}>
      {ui_node_names.map((uiName) => (
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
    <div ref={elRef} className={classes.OptionItem} data-ui-name={uiName}>
      <img src={iconSrc} alt={title} className={classes.OptionIcon} />
      <label className={classes.OptionLabel}>{title}</label>
    </div>
  );
}

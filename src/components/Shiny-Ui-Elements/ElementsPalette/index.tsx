import * as React from "react";

import {
  ShinyUiNames,
  ShinyUiNode,
  shinyUiNodeInfo,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import {
  useMakeDraggable,
  useSetCurrentDraggedNode,
} from "../DragAndDropHelpers/useCurrentDraggedNode";

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
  useMakeDraggable(elRef, { node });
  // const setCurrentDraggedNode = useSetCurrentDraggedNode({ node });

  if (iconSrc === undefined) {
    return null;
  }
  return (
    <div
      ref={elRef}
      className={classes.OptionItem}
      draggable
      // onDragStart={setCurrentDraggedNode}
    >
      <img src={iconSrc} alt={title} />
      <label>{title}</label>
    </div>
  );
}

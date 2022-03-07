import React from "react";

import { useDropHandlers } from "components/Shiny-Ui-Elements/DragAndDropHelpers/useDropHandlers";
import {
  NodePath,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import { sendTreeUpdateMessage } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/treeUpdateEvents";

import { VerticalStackPanelSettings } from "./index";

import classes from "./styles.module.css";

const GridlayoutVerticalStackPanel: UiContainerNodeComponent<
  VerticalStackPanelSettings
> = ({ uiArguments, uiChildren, nodeInfo, children, eventHandlers }) => {
  const { path } = nodeInfo;
  const { area, item_alignment, item_gap } = uiArguments;

  return (
    <div
      className={classes.container}
      data-alignment={item_alignment ?? "top"}
      style={
        {
          gridArea: area,
          "--item-gap": item_gap,
        } as React.CSSProperties
      }
      onClick={eventHandlers.onClick}
    >
      <DropWatcherPanel
        index={0}
        parentPath={path}
        numChildren={uiChildren.length}
      />
      {uiChildren?.map((childNode, i) => (
        <React.Fragment key={path.join(".") + i}>
          <UiNode path={[...path, i]} {...childNode} />
          <DropWatcherPanel
            index={i + 1}
            numChildren={uiChildren.length}
            parentPath={path}
          />
        </React.Fragment>
      ))}
      {children}
    </div>
  );
};

function DropWatcherPanel({
  index,
  numChildren,
  parentPath,
}: {
  index: number;
  numChildren: number;
  parentPath: NodePath;
}) {
  const dropListeners = useDropHandlers({
    parentPath,
    positionInChildren: index,
  });

  const position_class = dropWatcherPositionClass(index, numChildren);

  return (
    <div
      className={classes.dropWatcher + " " + position_class}
      {...dropListeners}
    />
  );
}

// Assign special classes to the drop watcher divs to note their positions
function dropWatcherPositionClass(i: number, numChildren: number) {
  if (i === 0) {
    return classes.firstDropWatcher;
  }

  if (i === numChildren) {
    return classes.lastDropWatcher;
  }

  return classes.middleDropWatcher;
}

export default GridlayoutVerticalStackPanel;

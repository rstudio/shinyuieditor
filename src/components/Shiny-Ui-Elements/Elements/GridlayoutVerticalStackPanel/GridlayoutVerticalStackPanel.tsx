import React from "react";

import { buildDragAndDropHandlers } from "components/Shiny-Ui-Elements/DragAndDropHelpers/useDragAndDropElements";
import { UiContainerNodeComponent } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";
import { sendTreeUpdateMessage } from "components/Shiny-Ui-Elements/UiNode/TreeManipulation/treeUpdateEvents";

import { VerticalStackPanelSettings } from "./index";

import classes from "./styles.module.css";

const GridlayoutVerticalStackPanel: UiContainerNodeComponent<
  VerticalStackPanelSettings
> = ({ uiArguments, uiChildren, path, children, ...passthroughProps }) => {
  const { area, item_alignment, item_gap } = uiArguments;

  const buildDropListeners = (index: number) =>
    buildDragAndDropHandlers((droppedNode) => {
      sendTreeUpdateMessage({
        type: "PLACE_NODE",
        ...droppedNode,
        parentPath: path,
        positionInChildren: index,
      });
    });

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
      // {...passthroughProps}
    >
      <DropWatcherPanel
        index={0}
        numChildren={uiChildren.length}
        dropHandlers={buildDropListeners(0)}
      />
      {uiChildren?.map((childNode, i) => (
        <React.Fragment key={path.join(".") + i}>
          <UiNode path={[...path, i]} {...childNode} />
          <DropWatcherPanel
            index={i + 1}
            numChildren={uiChildren.length}
            dropHandlers={buildDropListeners(i + 1)}
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
  dropHandlers,
}: {
  index: number;
  numChildren: number;
  dropHandlers?: ReturnType<typeof buildDragAndDropHandlers>;
}) {
  const position_class = dropWatcherPositionClass(index, numChildren);

  return (
    <div
      className={classes.dropWatcher + " " + position_class}
      {...dropHandlers}
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

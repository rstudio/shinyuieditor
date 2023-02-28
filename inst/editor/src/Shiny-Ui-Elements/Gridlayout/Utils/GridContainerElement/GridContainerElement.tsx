import React from "react";

import UiNode from "../../../../components/UiNode/UiNode";
import type { DraggedNodeInfo } from "../../../../DragAndDropHelpers/DragAndDropHelpers";
import { usePlaceNode } from "../../../../state/usePlaceNode";
import { findEmptyCells } from "../../../../utils/gridTemplates/findItemLocation";
import { areasToItemLocations } from "../../../../utils/gridTemplates/itemLocations";
import type { GridItemExtent } from "../../../../utils/gridTemplates/types";
import { makeChildPath } from "../../../nodePathUtils";
import type { UiNodeComponent } from "../../../uiNodeTypes";
import { AreaOverlay } from "../AreaOverlay";
import EditableGridContainer from "../EditableGridContainer/EditableGridContainer";
import type { TemplatedGridProps } from "../EditableGridContainer/TemplatedGridProps";
import { GridCell } from "../GridCell";
import { toStringLoc } from "../helpers";
import type { GridItemNode } from "../isValidGridItem";
import { isValidGridItem } from "../isValidGridItem";
import { NameNewPanelModal } from "../NameNewPanelModal";
import { LayoutDispatchContext } from "../useSetLayout";
import { useUpdateUiArguments } from "../useUpdateUiArguments";

import { ensureProperBoxedGridLayoutArgs } from "./ensureProperBoxedGridLayoutArts";
import type { GridLayoutArgs } from "./GridLayoutArgs";
import type { GridLayoutAction } from "./gridLayoutReducer";
import { gridLayoutReducer } from "./gridLayoutReducer";
import {
  convertTemplatedLayoutToGridlayoutArgs,
  parseGridLayoutArgs,
} from "./layoutParsing";
import classes from "./styles.module.css";

export type NewItemInfo = DraggedNodeInfo & {
  pos: GridItemExtent;
};

export const GridContainerElement: UiNodeComponent<GridLayoutArgs> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  const layoutDef = ensureProperBoxedGridLayoutArgs(uiArguments);
  const place_node = usePlaceNode();
  const { uniqueAreas, ...layout } = parseGridLayoutArgs(layoutDef);
  const { areas } = layout;
  const updateArguments = useUpdateUiArguments(path);
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const [showModal, setShowModal] = React.useState<NewItemInfo | null>(null);

  const handleNodeDrop = (nodeInfo: NewItemInfo) => {
    const { node, currentPath, pos } = nodeInfo;
    const isNodeMove = currentPath !== undefined;
    const isGridCard = isValidGridItem(node);

    if (
      isNodeMove &&
      isGridCard &&
      "area" in node.uiArguments &&
      node.uiArguments.area
    ) {
      // Just move the panel and let the layout know to update. No need to
      // update the tree because nothing about the node itself changed
      const areaName = node.uiArguments.area;
      handleLayoutUpdate({ type: "MOVE_ITEM", name: areaName, pos });

      return;
    }

    setShowModal(nodeInfo);
  };

  const handleLayoutUpdate = (action: GridLayoutAction) => {
    updateArguments(gridLayoutReducer(layoutDef, action));
  };

  const handleNewLayoutTemplate = React.useCallback(
    (newLayoutTemplate: TemplatedGridProps) => {
      updateArguments(
        convertTemplatedLayoutToGridlayoutArgs(newLayoutTemplate)
      );
    },
    [updateArguments]
  );

  const areaOverlays = uniqueAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={areas}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(pos) =>
        handleLayoutUpdate({ type: "MOVE_ITEM", name: area, pos })
      }
    />
  ));

  const stylesForGrid = {
    "--gap": layoutDef.gap_size,
    "--row-gutter": "150px",
    "--col-gutter": "100px",
    "--pad": "8px",
  } as React.CSSProperties;

  const addNewGridItem = (
    name: string,
    { node, currentPath, pos }: NewItemInfo
  ) => {
    // If we're using a grid-aware node already then we just need to put the
    // new name into its settings. Otherwise automatically wrap the item in a
    // grid container
    const dropped_is_grid_aware = isValidGridItem(node);
    if (dropped_is_grid_aware) {
      const argsWithArea: GridItemNode["uiArguments"] = {
        ...node.uiArguments,
        area: name,
      };
      node.uiArguments = argsWithArea;
    }

    // Let the state know we have a new child node
    place_node({
      // Place in the last position
      path: makeChildPath(path, uiChildren?.length ?? 0),
      node: dropped_is_grid_aware
        ? node
        : {
            uiName: "gridlayout::grid_card",
            uiArguments: { area: name },
            uiChildren: [
              {
                uiName: "bslib::card_body",
                uiArguments: {},
                uiChildren: [node],
              },
            ],
          },
      currentPath,
    });

    handleLayoutUpdate({
      type: "ADD_ITEM",
      name: name,
      pos: pos,
    });

    // Reset the modal/new item info state
    setShowModal(null);
  };

  return (
    <LayoutDispatchContext.Provider value={handleLayoutUpdate}>
      <div
        style={stylesForGrid}
        className={classes.container}
        {...wrapperProps}
        // Disable dragging on the main app. Note this is below the wrapperProps passthrough
        draggable={false}
        onDragStart={() => {}}
      >
        <EditableGridContainer
          {...layout}
          onNewLayout={handleNewLayoutTemplate}
        >
          {findEmptyCells(areas).map(({ row, col }) => (
            <GridCell
              key={toStringLoc({ row, col })}
              gridRow={row}
              gridColumn={col}
              onDroppedNode={handleNodeDrop}
            />
          ))}
          {uiChildren?.map((childNode, i) => (
            <UiNode
              key={path.join(".") + i}
              path={[...path, i]}
              node={childNode}
            />
          ))}
          {areaOverlays}
        </EditableGridContainer>
      </div>
      {showModal ? (
        <NameNewPanelModal
          info={showModal}
          onCancel={() => setShowModal(null)}
          onDone={(name) => addNewGridItem(name, showModal)}
          existingAreaNames={uniqueAreas}
        />
      ) : null}
    </LayoutDispatchContext.Provider>
  );
};

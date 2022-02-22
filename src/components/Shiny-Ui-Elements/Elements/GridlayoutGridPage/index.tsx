import {
  buildDragAndDropHandlers,
  dragAndDropTargetEvents,
} from "components/Shiny-Ui-Elements/DragAndDropHelpers/useDragAndDropElements";
import { AreaOverlay } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/AreaOverlay";
import {
  CellLocRef,
  GridCell,
} from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/GridCell";
import {
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import omit from "just-omit";
import React from "react";
import { subtractElements } from "utils/array-helpers";
import { enumerateGridDims, toStringLoc } from "utils/grid-helpers";
import { areasToItemLocations } from "utils/gridTemplates/itemLocations";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { GridItemExtent, TemplatedGridProps } from "utils/gridTemplates/types";
import { GridPanelSettings } from "../GridlayoutGridPanel";
import {
  sendTreeUpdateMessage,
  useListenForTreeUpdateEvent,
} from "../treeUpdateEvents";
import {
  defaultSettingsForElements,
  UiNodeComponent,
} from "../uiComponentAndSettings";
import { GridLayoutAction, gridLayoutReducer } from "./gridLayoutReducer";
import { NameNewPanelModal } from "./NameNewPanelModal";
import classes from "./styles.module.css";
import { TractControls } from "./TractControls";

export type NewItemInfo = {
  uiName: ShinyUiNames;
  pos: GridItemExtent;
};

export const LayoutDispatchContext =
  React.createContext<React.Dispatch<GridLayoutAction> | null>(null);

const GridlayoutGridPage: UiNodeComponent<TemplatedGridProps> = ({
  uiArguments,
  children,
  ...passthroughProps
}) => {
  const { areas } = uiArguments;
  const { numRows, numCols, styles, sizes, uniqueAreas } =
    parseGridTemplateAreas(uiArguments);

  const gridCellLocations: CellLocRef = React.useRef({});
  const itemGridLocations = React.useMemo(
    () => areasToItemLocations(areas),
    [areas]
  );

  const [showModal, setShowModal] = React.useState<NewItemInfo | null>(null);

  const handleLayoutUpdate = React.useCallback(
    (action: GridLayoutAction) => {
      sendTreeUpdateMessage({
        type: "UPDATE_NODE",
        path: [],
        newNode: {
          uiName: "gridlayout::grid_page",
          uiArguments: gridLayoutReducer(uiArguments, action),
        },
      });
    },
    [uiArguments]
  );

  useListenForTreeUpdateEvent((e) => {
    console.log(
      "Intercepted custom tree-update message in GridlayoutGridPage",
      e
    );

    // We're assuming that this grid layout is at the root of the tree. This
    // will break if we have nested grid layouts...
    const childNodeChange = e.type === "UPDATE_NODE" && e.path.length === 1;
    if (childNodeChange) {
      const oldAreaName = areasOfChildren(children)[e.path[0]];
      const newAreaName = (e.newNode.uiArguments as GridPanelSettings).area;
      if (typeof newAreaName === "undefined") {
        console.error(
          "Somehow a child of the gridlayout page doesn't have a grid area value..."
        );
        return;
      }

      if (oldAreaName !== newAreaName) {
        handleLayoutUpdate({
          type: "RENAME_ITEM",
          oldName: oldAreaName,
          newName: newAreaName,
        });
      }
    }
  });

  React.useEffect(() => {
    // If a user removes a grid panel from the app there will be an extra area
    // in the layout that's floating around unused which can cause issues. Here
    // we make sure everytime the component renders that all the areas in the
    // layout definition are mirrored in the children and update the layout to
    // remove areas that are in the layout but not the children. This won't fix
    // the reverse situation where there is a child with a grid area now in the
    // layout.
    const extra_areas_in_layout = subtractElements(
      uniqueAreas,
      areasOfChildren(children)
    );

    if (extra_areas_in_layout.length > 0) {
      handleLayoutUpdate({
        type: "REMOVE_ITEMS",
        names: extra_areas_in_layout,
      });
    }
  }, [children, handleLayoutUpdate, uniqueAreas]);

  const areaOverlays = uniqueAreas.map((area) => (
    <AreaOverlay
      key={area}
      area={area}
      areas={areas}
      cellLocRef={gridCellLocations}
      gridLocation={itemGridLocations.get(area)}
      onNewPos={(pos) =>
        handleLayoutUpdate({ type: "MOVE_ITEM", name: area, pos })
      }
    />
  ));

  const stylesForGrid = {
    ...styles,
    "--gap": uiArguments.gapSize,
    "--row-gutter": "150px",
    "--col-gutter": "100px",
  } as React.CSSProperties;

  const addNewGridItem = React.useCallback(
    (name: string, info: NewItemInfo) => {
      // For right now we'll just use the default settings for the
      // dropped ui element
      const newElement = defaultSettingsForElements.find(
        ({ uiName }) => uiName === info.uiName
      );

      if (!newElement) {
        throw new Error(
          "Could not find default settings for node of type " + info.uiName
        );
      }
      handleLayoutUpdate({
        type: "ADD_ITEM",
        name: name,
        pos: info.pos,
      });

      // If we're using a grid-aware node already then we just need to put the
      // new name into its settings. Otherwise automatically wrap the item in a
      // grid container
      let newNode: ShinyUiNode;
      if (
        newElement.uiName === "gridlayout::grid_panel" ||
        newElement.uiName === "gridlayout::title_panel"
      ) {
        newElement.uiArguments.area = name;
        newNode = newElement;
      } else {
        newNode = {
          uiName: "gridlayout::grid_panel",
          uiArguments: {
            area: name,
            horizontalAlign: "spread",
            verticalAlign: "spread",
          },
          uiChildren: [newElement],
        };
      }

      // Let the state know we have a new child node
      sendTreeUpdateMessage({
        type: "ADD_NODE",
        parentPath: [],
        newNode: newNode,
      });

      // Reset the modal/new item info state
      setShowModal(null);
    },
    [handleLayoutUpdate]
  );

  // Don't let the drag and drop behavior trigger on the background of the
  // containing div as the grid cells are responsible for handling that here
  const noDragAndDropPassthrough = omit(
    passthroughProps,
    dragAndDropTargetEvents
  );

  return (
    <LayoutDispatchContext.Provider value={handleLayoutUpdate}>
      <div
        style={stylesForGrid}
        className={classes.container}
        {...noDragAndDropPassthrough}
      >
        {enumerateGridDims({
          numRows,
          numCols,
        }).map(({ row, col }) => (
          <GridCell
            key={toStringLoc({ row, col })}
            gridRow={row}
            gridColumn={col}
            cellLocations={gridCellLocations}
            {...buildDragAndDropHandlers((nameOfDroppedUi) => {
              // This will eventually filter by element type
              const allowedDrop = true;
              if (!allowedDrop) return;
              setShowModal({
                uiName: nameOfDroppedUi,
                pos: {
                  rowStart: row,
                  rowEnd: row,
                  colStart: col,
                  colEnd: col,
                },
              });
            })}
          />
        ))}

        <TractControls areas={areas} sizes={sizes} />
        {children}
        {areaOverlays}
      </div>
      {showModal ? (
        <NameNewPanelModal
          info={showModal}
          onCancel={() => setShowModal(null)}
          onDone={(name) => addNewGridItem(name, showModal)}
        />
      ) : null}
    </LayoutDispatchContext.Provider>
  );
};

/** Get the grid areas present in the children nodes passed to the Grid_Page()
 * component. This assumes that they are stored in the "area" property on the
 * uiArguments */
function areasOfChildren(children: React.ReactNode) {
  let all_children_areas: string[] = [];
  React.Children.forEach(children, (child) => {
    if (
      child &&
      typeof child === "object" &&
      "props" in child &&
      "uiArguments" in child.props &&
      "area" in child.props.uiArguments
    ) {
      all_children_areas.push(child.props.uiArguments.area);
    }
  });

  return all_children_areas;
}

export default GridlayoutGridPage;

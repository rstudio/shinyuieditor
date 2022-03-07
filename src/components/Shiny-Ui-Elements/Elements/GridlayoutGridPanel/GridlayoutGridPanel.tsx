import { useAddOnDropHandlers } from "components/Shiny-Ui-Elements/DragAndDropHelpers/useDropHandlers";
import {
  ShinyUiNames,
  UiContainerNodeComponent,
} from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";
import UiNode from "components/Shiny-Ui-Elements/UiNode";

import {
  GridPanelSettings,
  HorizontalAlignments,
  VerticalAlignments,
} from "./index";

import classes from "./styles.module.css";

const rejectedNodes: ShinyUiNames[] = [
  "gridlayout::grid_page",
  "gridlayout::grid_panel",
  "gridlayout::title_panel",
  "gridlayout::vertical_stack_panel",
];
const GridlayoutGridPanel: UiContainerNodeComponent<GridPanelSettings> = ({
  uiChildren,
  uiArguments,
  nodeInfo,
  children,
  eventHandlers,
  compRef,
}) => {
  const { path } = nodeInfo;
  const { area, verticalAlign, horizontalAlign } = uiArguments;

  useAddOnDropHandlers(compRef, {
    parentPath: nodeInfo.path,
    positionInChildren: 0,
    dropFilters: { rejectedNodes },
  });

  return (
    <div
      ref={compRef}
      className={classes.container}
      style={{
        gridArea: area,
        justifyContent: dirToFlexProp[horizontalAlign ?? "spread"],
        alignContent: dirToFlexProp[verticalAlign ?? "spread"],
      }}
      onClick={eventHandlers.onClick}
    >
      {uiChildren?.map((childNode, i) => (
        <UiNode key={path.join(".") + i} path={[...path, i]} {...childNode} />
      ))}
      {children}
    </div>
  );
};

export default GridlayoutGridPanel;

const dirToFlexProp: Record<HorizontalAlignments | VerticalAlignments, string> =
  {
    center: "center",
    left: "start",
    top: "start",
    right: "end",
    bottom: "end",
    spread: "space-evenly",
  };

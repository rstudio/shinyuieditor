import { grid_page } from "ui-node-definitions/src/gridlayout/grid_page";

import { add_editor_info_to_ui_node } from "../../utils/add_editor_info_to_ui_node";
import { GridContainerElement } from "../Utils/GridContainerElement/GridContainerElement";
import {
  removeDeletedGridAreaFromLayout,
  updateGridLayoutAreaOnItemAreaChange,
} from "../Utils/watchAndReactToGridAreaUpdatesupdate";

export const gridlayoutGridPageInfo = add_editor_info_to_ui_node(grid_page, {
  UiComponent: (args) => {
    return <GridContainerElement {...args} />;
  },
  stateUpdateSubscribers: {
    UPDATE_NODE: updateGridLayoutAreaOnItemAreaChange,
    DELETE_NODE: removeDeletedGridAreaFromLayout,
  },
});

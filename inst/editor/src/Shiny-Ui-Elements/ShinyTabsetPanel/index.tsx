import { getTabPanelTitle } from "ui-node-definitions/src/Bslib/page_navbar";
import {
  makeChildPath,
  pathToString,
} from "ui-node-definitions/src/nodePathUtils";

import icon from "../../assets/icons/tabsetPanel.png";
import TabPanel from "../../components/Tabs/TabPanel/TabPanel";
import Tabset from "../../components/Tabs/Tabset/Tabset";
import UiNode from "../../components/UiNode/UiNode";
import { addEditorInfoById } from "../utils/add_editor_info_to_ui_node";

export const shinyTabsetPanelInfo = addEditorInfoById("tabsetPanel", {
  UiComponent: ({ namedArgs, children, path, wrapperProps }) => {
    const numChildren = children?.length ?? 0;

    return (
      <Tabset path={path} {...wrapperProps}>
        {numChildren > 0 ? (
          children?.map((node, i) => {
            const nodePath = makeChildPath(path, i);
            const title = getTabPanelTitle(node) ?? "unknown tab";
            return (
              <TabPanel key={pathToString(nodePath)} title={title}>
                <UiNode path={nodePath} node={node} />
              </TabPanel>
            );
          })
        ) : (
          <div style={{ padding: "5px" }}>
            <span>
              Empty tabset. Drag elements or Tab Panel on to add content
            </span>
          </div>
        )}
      </Tabset>
    );
  },
  iconSrc: icon,
});

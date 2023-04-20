// import icon from "../../assets/icons/tabsetPanel.png";

import {
  makeChildPath,
  pathToString,
} from "ui-node-definitions/src/nodePathUtils";
import {
  getTabPanelTitle,
  page_navbar,
} from "ui-node-definitions/src/Shiny/page_navbar";

import TabPanel from "../../components/Tabs/TabPanel/TabPanel";
import Tabset from "../../components/Tabs/Tabset/Tabset";
import UiNode from "../../components/UiNode/UiNode";
import { add_editor_info_to_ui_node } from "../utils/add_editor_info_to_ui_node";

import classes from "./ShinyNavbarPage.module.css";

export const shinyNavbarPageInfo = add_editor_info_to_ui_node(page_navbar, {
  UiComponent: ({ namedArgs: { title }, children, path, wrapperProps }) => {
    const numChildren = children?.length ?? 0;
    const hasChildren = numChildren > 0;

    return (
      <Tabset
        path={path}
        title={title}
        className={classes.container}
        {...wrapperProps}
      >
        {children ? (
          children.map((node, i) => {
            const nodePath = makeChildPath(path, i);
            const title = getTabPanelTitle(node) ?? "unknown tab";
            return (
              <TabPanel key={pathToString(nodePath)} title={title}>
                <UiNode path={nodePath} node={node} />
              </TabPanel>
            );
          })
        ) : (
          <EmptyNavbarPageMessage hasChildren={hasChildren} />
        )}
      </Tabset>
    );
  },
});

function EmptyNavbarPageMessage({ hasChildren }: { hasChildren: boolean }) {
  return hasChildren ? null : (
    <div className={classes.noTabsMessage}>
      <span>Empty page. Drag elements or Tab Panel on to add content</span>
    </div>
  );
}

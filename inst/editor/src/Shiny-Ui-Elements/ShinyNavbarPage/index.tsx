// import icon from "../../assets/icons/tabsetPanel.png";

import TabPanel from "../../components/Tabs/TabPanel/TabPanel";
import Tabset from "../../components/Tabs/Tabset/Tabset";
import { NodeWrapper } from "../../components/UiNode/NodeWraper";
import UiNode from "../../components/UiNode/UiNode";
import { useLanguageMode } from "../../state/languageMode";
import { getTabPanelTitle } from "../../ui-node-definitions/Bslib/page_navbar";
import { SidebarDropWatcherPanel } from "../../ui-node-definitions/Bslib/SidebarDropWatcherPanel";
import {
  makeChildPath,
  pathToString,
} from "../../ui-node-definitions/nodePathUtils";
import { addEditorInfoById } from "../utils/add_editor_info_to_ui_node";

export const shinyNavbarPageInfo = addEditorInfoById("navbarPage", {
  UiComponent: ({
    namedArgs: { title, sidebar },
    children,
    path,
    wrapperProps,
  }) => {
    const languageMode = useLanguageMode();
    const numChildren = children?.length ?? 0;
    const hasChildren = numChildren > 0;

    // Wrap the tabset in an extra div so overflow can be set to auto but we
    // still get the outline for selection
    return (
      <NodeWrapper
        className="h-full p-[1px] bg-light-grey"
        wrapperProps={wrapperProps}
      >
        <Tabset
          path={path}
          title={title}
          className=""
          sidebar={
            // We only have support for the sidebar argument in R mode
            languageMode === "PYTHON" ? undefined : sidebar ? (
              <UiNode path={makeChildPath(path, "sidebar")} node={sidebar} />
            ) : (
              <SidebarDropWatcherPanel path={path} />
            )
          }
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
      </NodeWrapper>
    );
  },
});

function EmptyNavbarPageMessage({ hasChildren }: { hasChildren: boolean }) {
  return hasChildren ? null : (
    <div className="p-1">
      <span>Empty page. Drag elements or Tab Panel on to add content</span>
    </div>
  );
}

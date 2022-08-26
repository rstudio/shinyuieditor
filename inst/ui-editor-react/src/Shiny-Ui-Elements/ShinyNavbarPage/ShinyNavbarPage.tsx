import TabPanel from "components/Tabs/TabPanel/TabPanel";
import Tabset from "components/Tabs/Tabset/Tabset";
import UiNode from "components/UiNode/UiNode";
import { useSetSelectedPath } from "NodeSelectionState";
import type {
  ShinyUiNode,
  ShinyUiNodeByName,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import { makeChildPath } from "Shiny-Ui-Elements/uiNodeTypes";

import type { NavbarPageSettings } from "./index";

import classes from "./ShinyNavbarPage.module.css";

type TabPanelNode = ShinyUiNodeByName["shiny::tabPanel"];
function isTabPanelNode(node: ShinyUiNode): node is TabPanelNode {
  return node.uiName === "shiny::tabPanel";
}

const ShinyNavbarPage: UiNodeComponent<NavbarPageSettings> = ({
  uiArguments: { title: pageTitle },
  uiChildren,
  nodeInfo: { path },
  compRef,
}) => {
  const setSelectedPath = useSetSelectedPath();
  const hasChildren = Boolean(uiChildren);

  return (
    <Tabset
      title={pageTitle}
      onNewTab={() => console.log("New panel requested")}
      onTabSelect={(tabIndex) => setSelectedPath(makeChildPath(path, tabIndex))}
      ref={compRef}
    >
      {uiChildren ? (
        uiChildren.map((node, i) => {
          const nodePath = makeChildPath(path, i);
          const title = isTabPanelNode(node)
            ? node.uiArguments.title
            : "unknown tab";
          return (
            <TabPanel key={nodePath.join("-")} title={title}>
              <UiNode path={nodePath} {...node} />
            </TabPanel>
          );
        })
      ) : (
        <EmptyNavbarPageMessage hasChildren={hasChildren} />
      )}
    </Tabset>
  );
};

function EmptyNavbarPageMessage({ hasChildren }: { hasChildren: boolean }) {
  return hasChildren ? null : (
    <div className={classes.noTabsMessage}>
      <span>Empty page. Drag elements or Tab Panel on to add content</span>
    </div>
  );
}

export default ShinyNavbarPage;

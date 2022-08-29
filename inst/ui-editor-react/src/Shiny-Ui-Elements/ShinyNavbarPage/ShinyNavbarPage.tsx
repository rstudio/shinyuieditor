import TabPanel from "components/Tabs/TabPanel/TabPanel";
import { AddTabButton } from "components/Tabs/Tabset/AddTabButton";
import Tabset from "components/Tabs/Tabset/Tabset";
import UiNode from "components/UiNode/UiNode";
import { useSetSelectedPath } from "NodeSelectionState";
import { makeChildPath, pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import type {
  ShinyUiNode,
  ShinyUiNodeByName,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";
import DropDetector from "Shiny-Ui-Elements/utils/DropDetector";

import type { NavbarPageSettings } from "./index";

import classes from "./ShinyNavbarPage.module.css";

type TabPanelNode = ShinyUiNodeByName["shiny::tabPanel"];
function isTabPanelNode(node: ShinyUiNode): node is TabPanelNode {
  return node.uiName === "shiny::tabPanel";
}

function wrapNodeInTabPanel(node: ShinyUiNode): ShinyUiNode {
  return {
    uiName: "shiny::tabPanel",
    uiArguments: {
      title: "Tab",
    },
    uiChildren: [node],
  };
}

const ShinyNavbarPage: UiNodeComponent<NavbarPageSettings> = ({
  uiArguments: { title: pageTitle },
  uiChildren,
  path,
  wrapperProps,
}) => {
  const setSelectedPath = useSetSelectedPath();
  const numChildren = uiChildren?.length ?? 0;
  const hasChildren = numChildren > 0;

  return (
    <Tabset
      title={pageTitle}
      onNewTab={() => console.log("New panel requested")}
      onTabSelect={(tabIndex) => setSelectedPath(makeChildPath(path, tabIndex))}
      addTabButton={
        <DropDetector
          className={classes.newTabDropDetector}
          parentPath={path}
          positionInChildren={numChildren}
          dropFilters={{
            rejectedNodes: [
              "shiny::navbarPage",
              "gridlayout::grid_card",
              "gridlayout::grid_card_plot",
              "gridlayout::grid_card_text",
            ],
          }}
          onDrop="add-node"
          processDropped={wrapNodeInTabPanel}
        >
          <AddTabButton
            onNewTab={() => {
              console.log("New tab please");
            }}
          />
        </DropDetector>
      }
      {...wrapperProps}
    >
      {uiChildren ? (
        uiChildren.map((node, i) => {
          const nodePath = makeChildPath(path, i);
          const title = isTabPanelNode(node)
            ? node.uiArguments.title
            : "unknown tab";
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
};

function EmptyNavbarPageMessage({ hasChildren }: { hasChildren: boolean }) {
  return hasChildren ? null : (
    <div className={classes.noTabsMessage}>
      <span>Empty page. Drag elements or Tab Panel on to add content</span>
    </div>
  );
}

export default ShinyNavbarPage;

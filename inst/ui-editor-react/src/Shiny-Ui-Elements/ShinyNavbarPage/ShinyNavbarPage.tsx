import TabPanel from "components/Tabs/TabPanel/TabPanel";
import Tabset from "components/Tabs/Tabset/Tabset";
import UiNode from "components/UiNode/UiNode";
import { useSetSelectedPath } from "NodeSelectionState";
import { makeChildPath, pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import { shinyTabPanelDefaultSettings } from "Shiny-Ui-Elements/ShinyTabPanel";
import type {
  ShinyUiNode,
  ShinyUiNodeByName,
  UiNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";

import type { NavbarPageSettings } from "./index";

import { NewTabButtonWithDropDetection } from "./NewTabButtonWithDropDetection";
import classes from "./ShinyNavbarPage.module.css";

type TabPanelNode = ShinyUiNodeByName["shiny::tabPanel"];
function isTabPanelNode(node: ShinyUiNode): node is TabPanelNode {
  return node.uiName === "shiny::tabPanel";
}

export const newTabPanelNode: ShinyUiNode = {
  uiName: "shiny::tabPanel",
  uiArguments: shinyTabPanelDefaultSettings,
  uiChildren: [],
};

export function wrapNodeInTabPanel(node: ShinyUiNode): ShinyUiNode {
  // Already wrapped?
  if (node.uiName === "shiny::tabPanel") return node;

  return {
    ...newTabPanelNode,
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
        <NewTabButtonWithDropDetection path={path} numSiblings={numChildren} />
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

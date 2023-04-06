import TabPanel from "../../components/Tabs/TabPanel/TabPanel";
import Tabset from "../../components/Tabs/Tabset/Tabset";
import UiNode from "../../components/UiNode/UiNode";
import { makeChildPath, pathToString } from "../nodePathUtils";
import { isValidTabPanel } from "../ShinyTabPanel/isValidTabPanel";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { NavbarPageSettings } from "./index";

import classes from "./ShinyNavbarPage.module.css";

const ShinyNavbarPage: UiNodeComponent<
  NavbarPageSettings,
  { TakesChildren: true }
> = ({ namedArgs: { title }, children, path, wrapperProps }) => {
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
          const title = isValidTabPanel(node)
            ? node.namedArgs.title
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

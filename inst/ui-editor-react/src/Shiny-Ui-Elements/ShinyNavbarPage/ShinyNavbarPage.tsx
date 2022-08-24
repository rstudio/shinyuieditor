import Tabset from "components/Tabs/Tabset/Tabset";
import type {
  NodePath,
  UiContainerNodeComponent,
} from "Shiny-Ui-Elements/uiNodeTypes";

import type { NavbarPageSettings } from "./index";

import classes from "./ShinyNavbarPage.module.css";

const ShinyNavbarPage: UiContainerNodeComponent<NavbarPageSettings> = ({
  uiArguments: { pageTitle },
  uiChildren,
  nodeInfo: { path },
  children,
  eventHandlers,
  compRef,
}) => {
  const has_children = uiChildren.length > 0;

  return (
    <Tabset
      pageTitle={pageTitle}
      onNewTab={() => console.log("New panel requested")}
    >
      {has_children ? null : <EmptyNavbarPageMessage path={path} />}
    </Tabset>
  );
};

function EmptyNavbarPageMessage({ path }: { path: NodePath }) {
  return (
    <div className={classes.noTabsMessage}>
      <span>Empty page. Drag elements or Tab Panel on to add content</span>
    </div>
  );
}

export default ShinyNavbarPage;

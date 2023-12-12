import TabPanel from "../../components/Tabs/TabPanel/TabPanel";
import Tabset from "../../components/Tabs/Tabset/Tabset";
import { NodeWrapper } from "../../components/UiNode/NodeWraper";
import UiNode from "../../components/UiNode/UiNode";
import { useLanguageMode } from "../../state/languageMode";
import type { UiNodeComponent } from "../nodeInfoFactory";
import { nodeInfoFactory } from "../nodeInfoFactory";
import type { ShinyUiNode, ShinyUiParentNode } from "../ShinyUiNode";
import { makeChildPath, pathToString } from "../utils/nodePathUtils";

import { SidebarDropWatcherPanel } from "./SidebarDropWatcherPanel";

type NavbarArgs = {
  title?: string;
  collapsible: boolean;
  id?: string;
  selected?: string;
  sidebar?: ShinyUiNode;
  theme?: unknown;
};

const NavbarComponent: UiNodeComponent<NavbarArgs, { TakesChildren: true }> = ({
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
};

export const page_navbar = nodeInfoFactory<NavbarArgs>()({
  id: "navbarPage",
  r_info: {
    fn_name: "page_navbar",
    package: "bslib",
  },
  py_info: {
    fn_name: "ui.page_navbar",
    package: "shiny",
  },
  title: "Navbar Page",
  takesChildren: true,
  settingsInfo: {
    title: {
      optional: true,
      inputType: "string",
      label: "Page title",
      defaultValue: "navbar-page",
    },
    collapsible: {
      label: "Collapse navigation on mobile",
      inputType: "boolean",
      defaultValue: false,
    },
    id: {
      inputType: "id",
      label: "Id for tabset",
      defaultValue: "tabset-default-id",
      optional: true,
    },
    selected: {
      inputType: "dropdown",
      optional: true,
      label: "Selected tab on load",
      defaultValue: (node) =>
        node ? getFirstTabName(node as ShinyUiParentNode) : "First Tab",
      choices: (node) =>
        node ? getTabNames(node as ShinyUiParentNode) : ["First Tab"],
    },
    sidebar: {
      inputType: "ui-node",
      optional: true,
      defaultValue: {
        id: "sidebar",
        namedArgs: {
          title: "Sidebar Title",
        },
        children: [],
      },
    },
    theme: { inputType: "omitted", optional: true },
  },
  // iconSrc: icon,
  category: "Layout",
  description: "Layout an app with tab-based navigation",
  ui_component: NavbarComponent,
});

export function getTabPanelTitle(node: ShinyUiNode): string | null {
  // if (isValidTabPanel(node)) {
  // return node.namedArgs.title;
  // }
  // TODO: Resetup the isValidTabPanel function
  if ("title" in node.namedArgs && typeof node.namedArgs.title === "string") {
    return node.namedArgs.title;
  }
  return null;
}

export function getTabNames({ children }: ShinyUiParentNode): string[] {
  let titles: string[] = [];

  children?.forEach((child) => {
    const panelTitle = getTabPanelTitle(child);
    if (panelTitle) titles.push(panelTitle);
  });

  return titles;
}

export function getFirstTabName({ children }: ShinyUiParentNode): string {
  const firstChild = children?.[0];
  if (!firstChild) return "First Tab";
  return getTabPanelTitle(firstChild) ?? "First Tab";
}

function EmptyNavbarPageMessage({ hasChildren }: { hasChildren: boolean }) {
  return hasChildren ? null : (
    <div className="p-1">
      <span>Empty page. Drag elements or Tab Panel on to add content</span>
    </div>
  );
}

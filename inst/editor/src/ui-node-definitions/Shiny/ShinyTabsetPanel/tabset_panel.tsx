import TabPanel from "../../../components/Tabs/TabPanel/TabPanel";
import Tabset from "../../../components/Tabs/Tabset/Tabset";
import UiNode from "../../../components/UiNode/UiNode";
import icon from "../../assets/icons/tabsetPanel.png";
import {
  getFirstTabName,
  getTabNames,
  getTabPanelTitle,
} from "../../Bslib/page_navbar";
import { nodeInfoFactory } from "../../nodeInfoFactory";
import type { ShinyUiParentNode } from "../../ShinyUiNode";
import { makeChildPath, pathToString } from "../../utils/nodePathUtils";

export const tabset_panel = nodeInfoFactory<{
  id?: string;
  selected?: string;
}>()({
  id: "tabsetPanel",
  r_info: {
    fn_name: "tabsetPanel",
    package: "shiny",
  },
  py_info: {
    fn_name: "ui.navset_tab",
    package: "shiny",
  },
  title: "Tabset Panel",
  takesChildren: true,
  settingsInfo: {
    id: {
      inputType: "id",
      label: "Id for tabset",
      defaultValue: "tabset-default-id",
      inputOrOutput: "input",
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
  },
  category: "Tabs",
  description: "A container filled with tabs",
  ui_component: ({ namedArgs, children, path, wrapperProps }) => {
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

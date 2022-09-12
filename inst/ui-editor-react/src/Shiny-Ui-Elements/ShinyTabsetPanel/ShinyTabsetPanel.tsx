import TabPanel from "components/Tabs/TabPanel/TabPanel";
import Tabset from "components/Tabs/Tabset/Tabset";
import UiNode from "components/UiNode/UiNode";
import { makeChildPath, pathToString } from "Shiny-Ui-Elements/nodePathUtils";
import { isValidTabPanel } from "Shiny-Ui-Elements/ShinyTabPanel/isValidTabPanel";
import type { UiNodeComponent } from "Shiny-Ui-Elements/uiNodeTypes";

import type { TabsetPanelSettings } from "./index";

const ShinyTabsetPanel: UiNodeComponent<TabsetPanelSettings> = ({
  uiArguments,
  uiChildren,
  path,
  wrapperProps,
}) => {
  const numChildren = uiChildren?.length ?? 0;

  return (
    <Tabset path={path} {...wrapperProps}>
      {numChildren > 0 ? (
        uiChildren?.map((node, i) => {
          const nodePath = makeChildPath(path, i);
          const title = isValidTabPanel(node)
            ? node.uiArguments.title
            : "unknown tab";
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
};

export default ShinyTabsetPanel;

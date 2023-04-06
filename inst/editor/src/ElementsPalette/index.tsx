import { PanelHeader } from "../EditorLayout/PanelHeader";
import type {
  ShinyUiNodeCategories,
  ShinyUiNodeIds,
} from "../Shiny-Ui-Elements/uiNodeTypes";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyids } from "../Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";
import { UiElementIcon } from "./UiElementIcon";

// We use an object here to enforce that we categorize all of the objects
const catOrderObj: Record<ShinyUiNodeCategories, 1> = {
  Utilities: 1,
  Inputs: 1,
  Outputs: 1,
  layouts: 1,
  gridlayout: 1,
  Tabs: 1,
  Containers: 1,
  Cards: 1,
  Plotting: 1,
  Uncategorized: 1,
};

const categoryOrder = Object.keys(catOrderObj);

function getNodeCategory(name: string) {
  const node_info = getUiNodeInfo(name);

  if ("category" in node_info && node_info.category) return node_info.category;

  return "uncategorized";
}

function sortByCategory(nameA: ShinyUiNodeIds, nameB: ShinyUiNodeIds): number {
  const categoryA = categoryOrder.indexOf(getNodeCategory(nameA));
  const categoryB = categoryOrder.indexOf(getNodeCategory(nameB));

  if (categoryA < categoryB) return -1;
  if (categoryA > categoryB) return 1;

  return 0;
}

export default function ElementsPalette({
  availableUiNodes = shinyids,
}: {
  availableUiNodes?: typeof shinyids;
}) {
  const ui_node_names = ([...availableUiNodes] as ShinyUiNodeIds[]).sort(
    sortByCategory
  );

  return (
    <>
      <PanelHeader>Elements</PanelHeader>
      <div className={classes.elementsPalette}>
        {ui_node_names.map((id) => (
          <UiElementIcon key={id} id={id} />
        ))}
      </div>
    </>
  );
}

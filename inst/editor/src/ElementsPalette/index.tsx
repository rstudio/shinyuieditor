import { PanelHeader } from "../EditorSkeleton/EditorSkeleton";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/getUiNodeInfo";
import type { ShinyUiNodeNames } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNames } from "../Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";
import { UiElementIcon } from "./UiElementIcon";

const categoryOrder: string[] = [
  "Inputs",
  "Outputs",
  "gridlayout",
  "uncategorized",
];

function sortByCategory(
  nameA: ShinyUiNodeNames,
  nameB: ShinyUiNodeNames
): number {
  const categoryA = categoryOrder.indexOf(
    getUiNodeInfo(nameA)?.category || "uncategorized"
  );
  const categoryB = categoryOrder.indexOf(
    getUiNodeInfo(nameB)?.category || "uncategorized"
  );

  if (categoryA < categoryB) return -1;
  if (categoryA > categoryB) return 1;

  return 0;
}

export default function ElementsPalette({
  availableUiNodes = shinyUiNames,
}: {
  availableUiNodes?: typeof shinyUiNames;
}) {
  const ui_node_names = ([...availableUiNodes] as ShinyUiNodeNames[]).sort(
    sortByCategory
  );

  return (
    <>
      <PanelHeader>Elements</PanelHeader>
      <div className={classes.elementsPalette}>
        {ui_node_names.map((uiName) => (
          <UiElementIcon key={uiName} uiName={uiName} />
        ))}
      </div>
    </>
  );
}

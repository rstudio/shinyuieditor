import * as React from "react";

import { PanelHeader } from "../EditorSkeleton/EditorSkeleton";
import { getUiNodeInfo } from "../Shiny-Ui-Elements/getUiNodeInfo";
import type {
  ShinyUiNames,
  ShinyUiNodeInfo,
} from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";

import classes from "./styles.module.css";
import { UiElementIcon } from "./UiElementIcon";

const categoryOrder: string[] = [
  "Inputs",
  "Outputs",
  "gridlayout",
  "uncategorized",
];

function sortByCategory(nameA: ShinyUiNames, nameB: ShinyUiNames): number {
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
  availableUi = shinyUiNodeInfo,
}: {
  availableUi?: ShinyUiNodeInfo;
}) {
  const ui_node_names = React.useMemo(
    () => (Object.keys(availableUi) as ShinyUiNames[]).sort(sortByCategory),
    [availableUi]
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

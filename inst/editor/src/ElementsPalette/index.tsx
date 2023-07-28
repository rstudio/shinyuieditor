import type { Language_Mode } from "communication-types/src/AppInfo";
import type { ShinyUiNodeInfo } from "ui-node-definitions/src/uiNodeTypes";

import { PanelHeader } from "../EditorLayout/PanelHeader";
import { registered_ui_nodes } from "../Shiny-Ui-Elements/registered_ui_nodes";
import { useLanguageMode } from "../state/languageMode";

import classes from "./styles.module.css";
import { UiElementIcon } from "./UiElementIcon";

// We use an object here to enforce that we categorize all of the objects and
// decide their order
const categoryOrder = Object.keys({
  Utilities: 1,
  Inputs: 1,
  Outputs: 1,
  Layout: 1,
  gridlayout: 1,
  Tabs: 1,
  Containers: 1,
  Cards: 1,
  Plotting: 1,
  Uncategorized: 1,
} satisfies Record<Exclude<ShinyUiNodeInfo["category"], "TESTING">, 1>);

type NodeInfo = (typeof registered_ui_nodes)[number];

function sortByCategory(info_a: NodeInfo, info_b: NodeInfo): number {
  const cat_a = categoryOrder.indexOf(info_a.category);
  const cat_b = categoryOrder.indexOf(info_b.category);

  return cat_a < cat_b ? -1 : cat_a > cat_b ? 1 : 0;
}

function filterToLanguage(info: NodeInfo, language: Language_Mode): boolean {
  switch (language) {
    case "R":
      return info.r_info !== undefined;
    case "PYTHON":
      return info.py_info !== undefined;
  }
}

export default function ElementsPalette() {
  const languageMode = useLanguageMode();

  const ui_node_names = registered_ui_nodes
    .filter((info) => filterToLanguage(info, languageMode))
    .sort(sortByCategory)
    .map((info) => info.id);

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

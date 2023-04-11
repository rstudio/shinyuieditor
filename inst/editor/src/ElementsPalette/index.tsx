import { PanelHeader } from "../EditorLayout/PanelHeader";
import type { ShinyUiNodeCategories } from "../Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfoArray } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { Language_Mode } from "../state/languageMode";
import { useLanguageMode } from "../state/languageMode";

import classes from "./styles.module.css";
import { UiElementIcon } from "./UiElementIcon";

// We use an object here to enforce that we categorize all of the objects and
// decide their order
const categoryOrder = Object.keys({
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
} satisfies Record<ShinyUiNodeCategories, 1>);

type Node_Info = typeof shinyUiNodeInfoArray[number];

function sortByCategory(info_a: Node_Info, info_b: Node_Info): number {
  const cat_a = categoryOrder.indexOf(info_a.category);
  const cat_b = categoryOrder.indexOf(info_b.category);

  return cat_a < cat_b ? -1 : cat_a > cat_b ? 1 : 0;
}

function filterToLanguage(info: Node_Info, language: Language_Mode): boolean {
  switch (language) {
    case "R":
      return info.r_fn_name !== undefined;
    case "PYTHON":
      return info.py_fn_name !== undefined && info.py_fn_name !== "none";
  }
}

export default function ElementsPalette() {
  const languageMode = useLanguageMode();

  const ui_node_names = shinyUiNodeInfoArray
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

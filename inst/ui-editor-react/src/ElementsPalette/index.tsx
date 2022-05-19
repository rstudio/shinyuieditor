import * as React from "react";

import CategoryHeader from "components/CategoryHeader";
import type {
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import { shinyUiNodeInfo } from "components/Shiny-Ui-Elements/uiNodeTypes";

import { useMakeDraggable } from "../DragAndDropHelpers/useMakeDraggable";

import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = shinyUiNodeInfo,
}: {
  availableUi?: typeof shinyUiNodeInfo;
}) {
  const ui_by_category = makeCategories({ availableUi });

  return (
    <div className={classes.elementsPalette}>
      {ui_by_category.map(({ category, nodes }) => (
        <React.Fragment key={category}>
          {category ? <CategoryHeader category={category} /> : null}
          <div className={classes.OptionsList}>
            {nodes.map((uiName) => (
              <ElementOption key={uiName} uiName={uiName} />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function ElementOption({ uiName }: { uiName: ShinyUiNames }) {
  const { iconSrc, title, defaultSettings } = shinyUiNodeInfo[uiName];
  const node = {
    uiName,
    uiArguments: defaultSettings,
  } as ShinyUiNode;

  const elRef = React.useRef<HTMLDivElement>(null);
  useMakeDraggable({ ref: elRef, nodeInfo: { node } });

  if (iconSrc === undefined) {
    return null;
  }
  return (
    <div ref={elRef} className={classes.OptionItem} data-ui-name={uiName}>
      <img src={iconSrc} alt={title} />
      <label>{title}</label>
    </div>
  );
}

function makeCategories({
  availableUi = shinyUiNodeInfo,
}: {
  availableUi?: typeof shinyUiNodeInfo;
}): { category?: string; nodes: ShinyUiNames[] }[] {
  const by_category: Record<string | symbol, ShinyUiNames[]> = {};

  const uncategorized: ShinyUiNames[] = [];

  let uiName: ShinyUiNames;
  for (uiName in availableUi) {
    const { category, iconSrc } = availableUi[uiName];

    if (!iconSrc) {
      continue;
    }

    if (!category) {
      uncategorized.push(uiName);
      continue;
    }

    if (!by_category[category]) {
      by_category[category] = [];
    }
    by_category[category].push(uiName);
  }

  let category_list: { category?: string; nodes: ShinyUiNames[] }[] =
    Object.keys(by_category).map((category) => ({
      category,
      nodes: by_category[category],
    }));

  // Add the uncategorized if they're present
  if (uncategorized.length > 0) {
    category_list = [{ nodes: uncategorized }, ...category_list];
  }

  return category_list;
}

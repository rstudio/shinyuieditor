import React from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import { render_card_elements } from "../BslibCards/render_card_elements";
import { useGridItemSwapping } from "./useGridItemSwapping";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { GridBslibCardCardSettings } from ".";

import styles from "./styles.module.css";

const GridlayoutGridCard: UiNodeComponent<GridBslibCardCardSettings> = (
  node
) => {
  const {
    uiArguments: { area, ...bslibCardArgs },
    uiChildren = [],
    path,
    wrapperProps,
  } = node;

  const compRef = useGridItemSwapping({ area, path });

  return (
    <div
      ref={compRef}
      style={{ gridArea: area }}
      className={mergeClasses("card", styles.container)}
      {...wrapperProps}
    >
      {render_card_elements(uiChildren, path)}
    </div>
  );
};

export default GridlayoutGridCard;

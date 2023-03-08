import React from "react";

import { mergeClasses } from "../../../utils/mergeClasses";
import { render_card_elements } from "../../Bslib/Utils/render_card_elements";
import type { UiNodeComponent } from "../../uiNodeTypes";
import { useGridItemSwapping } from "../Utils/useGridItemSwapping";

import type { GridBslibCardCardSettings } from ".";

import styles from "./styles.module.css";

const GridlayoutGridCard: UiNodeComponent<GridBslibCardCardSettings> = (
  node
) => {
  const {
    uiArguments: { area },
    // uiArguments: { area, ...bslibCardArgs },
    uiChildren = [],
    path,
    wrapperProps,
  } = node;

  const compRef = useGridItemSwapping({ area, path });

  return (
    <div ref={compRef} style={{ gridArea: area }} {...wrapperProps}>
      <div className={mergeClasses("card", styles.container)}>
        {render_card_elements(uiChildren, path)}
      </div>
    </div>
  );
};

export default GridlayoutGridCard;

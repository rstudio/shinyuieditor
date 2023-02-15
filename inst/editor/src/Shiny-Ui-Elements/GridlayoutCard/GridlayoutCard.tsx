import React from "react";

import { mergeClasses } from "../../utils/mergeClasses";
import { find_card_elements } from "../BslibCards/BslibCard";
import { useGridItemSwapping } from "../GridlayoutGridCard/useGridItemSwapping";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { GridBslibCardCardSettings } from ".";

import styles from "./styles.module.css";

const GridlayoutGridCard: UiNodeComponent<GridBslibCardCardSettings> = ({
  uiArguments: { area, ...bslibCardArgs },
  uiChildren = [],
  path,
  wrapperProps,
}) => {
  const compRef = React.useRef<HTMLDivElement>(null);

  useGridItemSwapping({ containerRef: compRef, area, path });

  const { body_node, header_node, footer_node } = find_card_elements(
    uiChildren,
    path
  );

  return (
    <div
      ref={compRef}
      style={
        {
          gridArea: area,
        } as React.CSSProperties
      }
      className={mergeClasses("card", styles.container)}
      {...wrapperProps}
    >
      {header_node}
      {body_node}
      {footer_node}
    </div>
  );
};

export default GridlayoutGridCard;

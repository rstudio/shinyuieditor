/** @jsxImportSource @emotion/react */

import * as React from "react";
import { CSSMeasure } from "../GridTypes";
import { GridItem } from "./GridItem";
import { IconName, SvgIcon } from "./icons";

type GridCardCommonProps = {
  gridArea: string;
  children: React.ReactNode;
  padding?: CSSMeasure;
};

function GridCardImpl(
  props: GridCardCommonProps & {
    title?: string;
    icon?: IconName;
    header?: JSX.Element;
  }
) {
  const { padding = "0.5rem", gridArea } = props;
  return (
    <GridItem
      css={{
        borderRadius: "var(--corner-radius)",
        boxShadow: "var(--shadow)",
        background: "var(--rstudio-white)",
        display: "grid",
        gridTemplateRows: "var(--card-header-height, 35px) 1fr",
        "> *:first-child": {
          borderBottom: "1px solid #d1d0d09a",
          marginLeft: "3px",
          marginRight: "3px",
        },
      }}
      gridArea={gridArea}
    >
      {"header" in props ? (
        props.header
      ) : (
        <h3
          css={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          style={{ padding }}
        >
          <SvgIcon name={props.icon} />
          {props.title}
        </h3>
      )}
      <div style={{ padding }}>{props.children}</div>
    </GridItem>
  );
}

export const GridCard = React.memo(GridCardImpl);

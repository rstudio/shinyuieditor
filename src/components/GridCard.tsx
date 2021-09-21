/** @jsxImportSource @emotion/react */

import { Heading } from "@chakra-ui/layout";
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
  const { padding = "1rem", gridArea } = props;
  return (
    <GridItem
      css={{
        borderRadius: "var(--corner-radius)",
        boxShadow: "var(--shadow)",
        background: "var(--rstudio-white)",
        display: "grid",
        gridTemplateRows: "var(--card-header-height, 35px) 1fr",
      }}
      gridArea={gridArea}
    >
      {"header" in props ? (
        props.header
      ) : (
        <Heading
          size="md"
          css={{
            margin: 0,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            borderBottom: "1px solid #d1d0d09a",
            marginLeft: "3px",
            marginRight: "3px",
          }}
        >
          <SvgIcon name={props.icon} />
          {props.title}
        </Heading>
      )}
      <div css={{ padding }}>{props.children}</div>
    </GridItem>
  );
}

export const GridCard = React.memo(GridCardImpl);

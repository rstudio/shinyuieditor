/** @jsxImportSource @emotion/react */

import { Heading } from "@chakra-ui/layout";
import * as React from "react";
import { CSSMeasure } from "../GridTypes";
import { GridItemDiv } from "./GridItemDiv";

function GridCardImpl(props: {
  area: string;
  children: React.ReactNode;
  padding?: CSSMeasure;
  title?: string;
  icon?: React.ReactElement;
  header?: JSX.Element;
  overloadStyles?: React.CSSProperties;
}) {
  const { padding = "1rem", area } = props;
  return (
    <GridItemDiv
      css={{
        overflow: "scroll",
        borderRadius: "var(--corner-radius)",
        boxShadow: "var(--shadow)",
        background: "var(--rstudio-white)",
        display: "grid",
        gridTemplateRows: "var(--card-header-height, 35px) 1fr",
        ...props.overloadStyles,
      }}
      gridArea={area}
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
            padding: "0.3rem",
          }}
        >
          {props.icon}

          {props.title}
        </Heading>
      )}
      <div css={{ padding }}>{props.children}</div>
    </GridItemDiv>
  );
}

export const GridCard = React.memo(GridCardImpl);

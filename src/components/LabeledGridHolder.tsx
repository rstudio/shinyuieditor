/** @jsxImportSource @emotion/react */
import React from "react";
import parseGridTemplateAreas from "utils/gridTemplates/parseGridTemplateAreas";
import { TemplatedGridProps } from "utils/gridTemplates/types";

export function GridHolder({
  areas,
  rowSizes = "1fr",
  colSizes = "1fr",
  gapSize = "1rem",
  children,
}: TemplatedGridProps & { children?: React.ReactNode }) {
  const parsedProps = parseGridTemplateAreas({
    areas,
    rowSizes,
    colSizes,
    gapSize,
  });

  return (
    <div style={parsedProps.styles} css={{ display: "grid", padding: gapSize }}>
      {children}
    </div>
  );
}

export function LabeledGridHolder({
  children,
  ...props
}: TemplatedGridProps & { children?: React.ReactNode }) {
  const parsedProps = parseGridTemplateAreas(props);

  const areaMarkers = parsedProps.uniqueAreas.map((area) => (
    <div
      key={area}
      css={{
        outline: "1px solid black",
        display: "grid",
        placeContent: "end",
        fontWeight: "lighter",
        fontStyle: "italic",
        padding: "2px",
        opacity: 0.2,
      }}
      style={{ gridArea: area }}
    >
      area: {area}
    </div>
  ));

  return (
    <GridHolder {...props}>
      {areaMarkers} {children}
    </GridHolder>
  );
}

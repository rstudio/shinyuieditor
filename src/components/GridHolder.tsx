/** @jsxImportSource @emotion/react */
import React from "react";
import parseGridTemplateAreas, {
  TemplatedGridProps,
} from "utils/parseGridTemplateAreas";

export function GridHolder({
  areas,
  rowSizes,
  colSizes,
  gapSize,
  children,
}: TemplatedGridProps & { children: React.ReactNode }) {
  const parsedProps = parseGridTemplateAreas({
    areas,
    rowSizes,
    colSizes,
    gapSize,
  });

  return (
    <div style={parsedProps.styles} css={{ display: "grid" }}>
      {children}
    </div>
  );
}

export function AreaLabeledGridHolder({
  children,
  ...props
}: TemplatedGridProps & { children: React.ReactNode }) {
  const parsedProps = parseGridTemplateAreas(props);

  const areaMarkers = [...parsedProps.uniqueAreas].map((area) => (
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

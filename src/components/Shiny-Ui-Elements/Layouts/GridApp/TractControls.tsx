/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { CSSUnitInput } from "components/CSSUnitInput";
import { CSSMeasure } from "GridTypes";
import React from "react";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { LayoutDispatchContext } from ".";
import { directions, TractDirection } from "./helpers";
import { TractAddButton } from "./TractAddButton";
import { TractRemoveButton } from "./TractRemoveButton";
import classes from "./TractControls.module.css";

export function TractControls({
  areas,
  sizes,
}: {
  areas: TemplatedGridProps["areas"];
  sizes: ParsedGridTemplate["sizes"];
}) {
  const tracts: Record<TractDirection, JSX.Element[]> = {
    rows: [],
    cols: [],
  };

  for (let dir of directions) {
    const tractSizes = sizes[dir];

    tracts[dir] = tractSizes.map((size, i) => {
      const tractIndex = i + 1;
      const deletionConflicts = conflictsToRemoveTract(areas, {
        dir,
        index: tractIndex,
      });
      return (
        <TractControl
          key={size + i}
          dir={dir}
          size={size}
          tractIndex={tractIndex}
          deletionConflicts={deletionConflicts}
        />
      );
    });
  }

  return (
    <>
      {tracts.rows}
      {tracts.cols}
    </>
  );
}

const NEW_TRACT_SIZE = "120px";

function TractControl({
  dir,
  tractIndex,
  size,
  deletionConflicts,
}: {
  dir: TractDirection;
  tractIndex: number;
  size: CSSMeasure;
  deletionConflicts: ReturnType<typeof conflictsToRemoveTract>;
}) {
  const setLayout = React.useContext(LayoutDispatchContext);
  const positionStyles = {
    [dir === "rows" ? "gridRow" : "gridColumn"]: tractIndex,
  };

  return (
    <TractControlsHolder className={dir} style={positionStyles}>
      <CSSUnitInput
        value={size}
        w="120px"
        onChange={(newSize) => {
          setLayout?.({
            type: "RESIZE_TRACT",
            dir,
            index: tractIndex,
            size: newSize,
          });
        }}
      />
      <div
        className={
          dir === "rows" ? classes.buttonHolderRows : classes.buttonHolderCols
        }
      >
        <TractAddButton
          dir={dir}
          tractIndex={tractIndex}
          size={NEW_TRACT_SIZE}
          beforeOrAfter="before"
        />
        <TractRemoveButton
          dir={dir}
          index={tractIndex}
          conflicts={deletionConflicts}
        />
        <TractAddButton
          dir={dir}
          tractIndex={tractIndex}
          size={NEW_TRACT_SIZE}
          beforeOrAfter="after"
        />
      </div>
    </TractControlsHolder>
  );
}

const TractControlsHolder = styled.div({
  "--control-tracts": "1fr auto",
  "--offset-margin": `calc(-1*(var(--tract-gutter-size) + var(--gap)))`,
  "--offset-into-gap": "calc(-1*var(--gap))",
  "--add-button-offset": "calc(var(--gap)/2)",
  display: "grid",
  position: "relative",
  gap: "5px",
  "&.rows": {
    "--tract-gutter-size": "var(--row-gutter)",
    paddingRight: "var(--gap)",
    gridTemplateColumns: "var(--control-tracts)",
    width: "calc(var(--row-gutter) + var(--gap))",
    marginTop: "var(--offset-into-gap)",
    marginBottom: "var(--offset-into-gap)",
    marginLeft: `var(--offset-margin)`,
    gridColumn: 1,
    alignItems: "center",
    justifyItems: "end",
  },
  "&.cols": {
    "--tract-gutter-size": "var(--col-gutter)",
    paddingBottom: "var(--gap)",
    gridTemplateRows: "var(--control-tracts)",
    height: "calc(var(--col-gutter) + var(--gap))",
    marginTop: `var(--offset-margin)`,
    marginLeft: "var(--offset-into-gap)",
    marginRight: "var(--offset-into-gap)",
    gridRow: 1,
    justifyItems: "center",
    alignItems: "end",
  },
  "&:not(:hover) .add-button": {
    opacity: "0",
  },
  "&:hover": {
    "--edge-color": "var(--rstudio-blue)",
    zIndex: 1000,
  },
  "&::after": {
    "--thickness": "2px",
    "--inset-to-edge": "calc(var(--gap) + 5px)",
    "--edge-color": "var(--light-grey)",
    content: `""`,
    position: "absolute",
    pointerEvents: "none",
  },
  "&.rows::after": {
    height: "calc(100% - 2*var(--gap))",
    width: "calc(100% - 2*var(--inset-to-edge))",
    right: "var(--inset-to-edge)",
    borderTop: "1px solid var(--edge-color)",
    borderBottom: "1px solid var(--edge-color)",
  },
  "&.cols::after": {
    bottom: "var(--inset-to-edge)",
    width: "calc(100% - 2*var(--gap))",
    height: "calc(100% - 2*var(--inset-to-edge))",
    borderLeft: "1px solid var(--edge-color)",
    borderRight: "1px solid var(--edge-color)",
  },
});

const TractControlMemo = React.memo(TractControl);

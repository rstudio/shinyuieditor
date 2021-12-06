/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { CSSUnitInput } from "components/CSSUnitInput";
import { CSSMeasure } from "GridTypes";
import React from "react";
import { TractDirection } from "state-logic/gridLayout/atoms";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";
import resizeTract from "utils/gridTemplates/resizeTract";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { SetLayoutContext } from "../GridApp";
import { directions } from "./helpers";
import { TractAddButton } from "./TractAddButton";
import { TractRemoveButton } from "./TractRemoveButton";

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
        <TractControlMemo
          key={i}
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
  const setLayout = React.useContext(SetLayoutContext);
  const positionStyles = {
    [dir === "rows" ? "gridRow" : "gridColumn"]: tractIndex,
  };

  return (
    <TractControlsHolder className={dir} style={positionStyles}>
      <CSSUnitInput
        value={size}
        w="120px"
        onChange={(newSize) => {
          setLayout?.((layout) =>
            resizeTract(layout, { dir, index: tractIndex }, newSize)
          );
        }}
      />
      <ButtonsHolder className={dir}>
        <TractAddButton
          dir={dir}
          tractIndex={tractIndex}
          size="100px"
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
          size="100px"
          beforeOrAfter="after"
        />
      </ButtonsHolder>
    </TractControlsHolder>
  );
}

const TractControlsHolder = styled.div({
  "--control-tracts": "1fr auto",
  "--offset-margin": `calc(-1*(var(--tract-gutter-size) + var(--gap)))`,
  "--offset-into-gap": "calc(-1*var(--gap))",
  display: "grid",
  position: "relative",
  gap: "5px",
  // backgroundColor: "blanchedalmond",
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
    display: "none",
  },
  "&:hover": {
    "--edge-color": "var(--rstudio-blue)",
    zIndex: 1000,
  },
  "&::after": {
    "--thickness": "2px",
    "--inset-to-edge": "calc(var(--gap) - var(--thickness)*2)",
    content: `""`,
    position: "absolute",
    backgroundColor: "var(--edge-color, var(--light-grey))",
  },
  "&.cols::after": {
    bottom: "var(--inset-to-edge)",
    width: "calc(100% - 2*var(--gap))",
    height: "var(--thickness)",
  },
  "&.rows::after": {
    height: "calc(100% - 2*var(--gap))",
    width: "var(--thickness)",
    right: "var(--inset-to-edge)",
  },
});

const ButtonsHolder = styled.div({
  "--edge-style": "2px solid var(--edge-color, var(--light-grey))",
  height: "100%",
  width: "100%",
  display: "flex",
  position: "relative",
  justifyContent: "center",
  ".add-button": {
    position: "absolute",
  },
  "&.rows": {
    // borderRight: "var(--edge-style)",
    flexDirection: "column",
    ".before": { top: "0" },
    ".after": { bottom: "0" },
  },

  "&.cols": {
    // borderBottom: "var(--edge-style)",
    flexDirection: "row",
    ".before": { left: "0" },
    ".after": { right: "0" },
  },
});

const TractControlMemo = React.memo(TractControl);

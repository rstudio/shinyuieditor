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
import { SetLayoutContext } from ".";
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
        w="110px"
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
  display: "grid",
  "&.rows": {
    "--tract-gutter-size": "var(--row-gutter)",
    gridTemplateColumns: "var(--control-tracts)",
    width: "var(--row-gutter)",
    marginLeft: `var(--offset-margin)`,
    gridColumn: 1,
    alignItems: "center",
  },
  "&.cols": {
    "--tract-gutter-size": "var(--col-gutter)",
    gridTemplateRows: "var(--control-tracts)",
    height: "var(--col-gutter)",
    marginTop: `var(--offset-margin)`,
    alignItems: "end",
    gridRow: 1,
    justifyItems: "center",
  },
});

const ButtonsHolder = styled.div({
  "--edge-style": "2px solid var(--light-grey)",
  height: "100%",
  width: "100%",
  display: "flex",
  position: "relative",
  justifyContent: "center",
  ".add-button": {
    position: "absolute",
  },
  "&:not(:hover) .add-button": {
    display: "none",
  },
  "&.rows": {
    borderRight: "var(--edge-style)",
    flexDirection: "column",
    ".before": {
      bottom: "100%",
    },
    ".after": {
      top: "100%",
    },
  },
  "&.cols": {
    borderBottom: "var(--edge-style)",
    flexDirection: "row",
    ".before": {
      right: "100%",
    },
    ".after": {
      left: "100%",
    },
  },
});

const TractControlMemo = React.memo(TractControl);

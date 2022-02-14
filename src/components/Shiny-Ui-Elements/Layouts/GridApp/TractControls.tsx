/** @jsxImportSource @emotion/react */

import styled from "@emotion/styled";
import { CSSUnitInput } from "components/Inputs/CSSUnitInput";
import { GridLayoutAction } from "components/Shiny-Ui-Elements/Elements/GridlayoutGridPage/gridLayoutReducer";
import { CSSMeasure } from "GridTypes";
import React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { joinPretty } from "utils/array-helpers";
import { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { LayoutDispatchContext } from ".";
import { directions, singular, TractDirection } from "./helpers";
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
        onChange={(newSize) => {
          setLayout?.({
            type: "RESIZE_TRACT",
            dir,
            index: tractIndex,
            size: newSize,
          });
        }}
      />

      <div className="display-size">{size}</div>
      <div
        className={
          dir === "rows" ? classes.buttonHolderRows : classes.buttonHolderCols
        }
      >
        <AddTractButton
          dir={dir}
          beforeOrAfter="before"
          index={tractIndex}
          setLayout={setLayout}
        />
        <TractRemoveButton
          dir={dir}
          index={tractIndex}
          conflicts={deletionConflicts}
          setLayout={setLayout}
        />
        <AddTractButton
          dir={dir}
          beforeOrAfter="after"
          index={tractIndex}
          setLayout={setLayout}
        />
      </div>
    </TractControlsHolder>
  );
}

function AddTractButton({
  dir,
  beforeOrAfter,
  index,
  setLayout,
}: {
  dir: TractDirection;
  beforeOrAfter: "before" | "after";
  index: number;
  setLayout: React.Dispatch<GridLayoutAction> | null;
}) {
  const dirSingular = singular(dir);

  const description = `Add ${dirSingular} before ${dirSingular} ${index}`;

  return (
    <button
      className={
        beforeOrAfter === "before"
          ? classes.tractAddBeforeButton
          : classes.tractAddAfterButton
      }
      title={description}
      aria-label={description}
      onClick={() =>
        setLayout?.({
          type: "ADD_TRACT",
          dir,
          afterIndex: beforeOrAfter === "before" ? index - 1 : index,
          size: NEW_TRACT_SIZE,
        })
      }
    >
      <FaPlus />
    </button>
  );
}

function TractRemoveButton({
  dir,
  index,
  conflicts,
  setLayout,
}: {
  dir: TractDirection;
  index: number;
  setLayout: React.Dispatch<GridLayoutAction> | null;

  conflicts: string[];
}) {
  const dirSingular = singular(dir);

  const cantDelete = conflicts.length > 0;

  const description = `remove ${dirSingular} ${index}`;
  const popupText = cantDelete
    ? `Can't ${description} as items ${joinPretty(
        conflicts
      )} are entirely contained within it.`
    : description;

  return (
    <button
      className={classes.tractDeleteButton}
      aria-label={description}
      title={popupText}
      disabled={cantDelete}
      onClick={
        cantDelete
          ? undefined
          : () => setLayout?.({ type: "REMOVE_TRACT", dir, index })
      }
    >
      <FaTrash />
    </button>
  );
}

const TractControlsHolder = styled.div({
  "--control-tracts": "1fr auto",
  "--offset-margin": `calc(-1*(var(--tract-gutter-size) + var(--gap)))`,
  "--offset-into-gap": "calc(-1*var(--gap)/2)",
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
  "& > .display-size": {
    fontStyle: "italic",
    opacity: 0.7,
    position: "absolute",
    display: "grid",
    width: "100%",
    height: "100%",
    placeContent: "center",
  },
  "&:not(:hover) > *:not(.display-size)": {
    opacity: "0",
  },
  "&:hover > .display-size": {
    display: "none",
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
    opacity: 1,
    position: "absolute",
    pointerEvents: "none",
  },
  "&.rows::after": {
    height: "calc(100% - 2*var(--gap))",
    width: "calc(100% - 2*var(--inset-to-edge))",
    right: "var(--inset-to-edge)",
    borderTop: "1px dashed var(--edge-color)",
    borderBottom: "1px dashed var(--edge-color)",
  },
  "&.cols::after": {
    bottom: "var(--inset-to-edge)",
    width: "calc(100% - 2*var(--gap))",
    height: "calc(100% - 2*var(--inset-to-edge))",
    borderLeft: "1px dashed var(--edge-color)",
    borderRight: "1px dashed var(--edge-color)",
  },
});

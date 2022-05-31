import React from "react";

import { CSSUnitInput } from "components/Inputs/CSSUnitInput";
import type { GridLayoutAction } from "components/Shiny-Ui-Elements/GridlayoutGridPage/gridLayoutReducer";
import type { TractDirection } from "components/Shiny-Ui-Elements/GridlayoutGridPage/helpers";
import {
  directions,
  singular,
} from "components/Shiny-Ui-Elements/GridlayoutGridPage/helpers";
import type { CSSMeasure } from "CSSMeasure";
import { FaPlus, FaTrash } from "react-icons/fa";
import { joinPretty } from "utils/array-helpers";
import type { ParsedGridTemplate } from "utils/gridTemplates/parseGridTemplateAreas";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";

import { PopoverButton } from "../../Inputs/PopoverButton";

import type { TemplatedGridProps } from ".";

import classes from "./TractControls.module.css";
import { useSetLayout } from "./useSetLayout";

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
  const setLayout = useSetLayout();
  const positionStyles = {
    [dir === "rows" ? "gridRow" : "gridColumn"]: tractIndex,
  };

  return (
    <div
      className={classes.container + " " + classes[dir]}
      style={positionStyles}
    >
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
      <div className={classes.displaySize}>{size}</div>
      <div className={classes.buttonHolder}>
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
    </div>
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
  const description = `Add ${dirSingular}`;

  return (
    <PopoverButton
      className={
        beforeOrAfter === "before"
          ? classes.tractAddBeforeButton
          : classes.tractAddAfterButton
      }
      placement={dir === "rows" ? "right" : "bottom"}
      aria-label={description}
      popoverText={description}
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
    </PopoverButton>
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

  let popupText = description;

  if (conflicts.length === 1) {
    popupText = `Can't ${description} as item ${conflicts[0]} is entirely contained within it.`;
  }
  if (conflicts.length > 1) {
    popupText = `Can't ${description} as the items ${joinPretty(
      conflicts
    )} are entirely contained within it.`;
  }

  return (
    <PopoverButton
      className={
        classes.tractDeleteButton + " " + (cantDelete ? classes.disabled : null)
      }
      placement={dir === "rows" ? "right" : "bottom"}
      aria-label={description}
      onClick={
        cantDelete
          ? undefined
          : () => setLayout?.({ type: "REMOVE_TRACT", dir, index })
      }
      popoverText={popupText}
    >
      <FaTrash />
    </PopoverButton>
  );
}

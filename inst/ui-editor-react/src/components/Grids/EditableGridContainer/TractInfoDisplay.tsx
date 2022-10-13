import * as React from "react";

import { Trash } from "components/Icons";
import type {
  CSSMeasure,
  CSSUnit,
} from "components/Inputs/CSSUnitInput/CSSMeasure";
import { CSSUnitInput } from "components/Inputs/CSSUnitInput/CSSUnitInput";
import { TooltipButton } from "components/PopoverEl/Tooltip";
import { FaPlus } from "react-icons/fa";
import type { TemplatedGridProps } from "Shiny-Ui-Elements/GridlayoutGridPage";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";

import type { TractUpdateAction } from "./EditableGridContainer";
import classes from "./TractInfoDisplay.module.css";
import type { TractInfo } from "./useDragToResizeGrid";

const ALLOWED_UNITS: CSSUnit[] = ["fr", "px"];
export function TractInfoDisplay({
  dir,
  index,
  size,
  onUpdate,
  deletionConflicts,
}: TractInfo & {
  onUpdate: (a: TractUpdateAction) => void;
  deletionConflicts: string[];
}) {
  const onNewSize = React.useCallback(
    (s: CSSMeasure) => onUpdate({ type: "RESIZE", dir, index, size: s }),
    [dir, index, onUpdate]
  );

  const onNewTract = React.useCallback(
    (i: number) =>
      onUpdate({
        type: "ADD",
        dir,
        index: i,
      }),
    [dir, onUpdate]
  );

  const onNewTractBefore = React.useCallback(
    () => onNewTract(index),
    [onNewTract, index]
  );
  const onNewTractAfter = React.useCallback(
    () => onNewTract(index + 1),
    [onNewTract, index]
  );
  const onTractDelete = React.useCallback(
    () => onUpdate({ type: "DELETE", dir, index: index + 1 }),
    [dir, index, onUpdate]
  );

  return (
    <div
      className={classes.tractInfoDisplay}
      data-drag-dir={dir}
      style={
        {
          "--tract-index": index + 1,
        } as React.CSSProperties
      }
    >
      <div className={classes.hoverListener} />
      <div className={classes.sizeWidget} onClick={stopPropagation}>
        <div className={classes.buttons}>
          <AddTractButton dir={dir} onClick={onNewTractBefore} />
          <DeleteTractButton
            dir={dir}
            onClick={onTractDelete}
            deletionConflicts={deletionConflicts}
          />
          <AddTractButton dir={dir} onClick={onNewTractAfter} />
        </div>
        <div className={classes.cssSizeInput}>
          <CSSUnitInput
            label={`Sizing for ${dir} ${index}`}
            id={"Tract-Size-" + dir + index}
            value={size}
            units={ALLOWED_UNITS}
            onChange={onNewSize}
          />
        </div>
      </div>
    </div>
  );
}

function DeleteTractButton({
  dir,
  onClick,
  deletionConflicts,
}: {
  dir: TractInfo["dir"];
  onClick: () => void;
  deletionConflicts: string[];
}) {
  const popoverPlacement = dir === "rows" ? "right" : "down";

  const enabled = deletionConflicts.length === 0;
  const message = !enabled
    ? `Can't delete because the items ${deletionConflicts.join(
        ","
      )} are entirely contained in tract`
    : "Delete tract";
  return (
    <TooltipButton
      className={classes.deleteButton}
      onClick={removeFocusAfterClick(enabled ? onClick : undefined)}
      data-enabled={enabled}
      text={message}
      size="medium"
      position={popoverPlacement}
    >
      <Trash />
    </TooltipButton>
  );
}

function AddTractButton({
  dir,
  onClick,
}: {
  dir: TractInfo["dir"];
  onClick: () => void;
}) {
  const popoverPlacement = dir === "rows" ? "right" : "down";

  const label = dir === "rows" ? `Add row` : `Add column`;

  return (
    <TooltipButton
      className={classes.tractAddButton}
      onClick={removeFocusAfterClick(onClick)}
      position={popoverPlacement}
      text={label}
    >
      <FaPlus />
    </TooltipButton>
  );
}

function removeFocusAfterClick(onClick?: () => void) {
  return function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    // Clicking will cause current focus to enter the tract control and thus
    // keep it open (we do this to keep the controls from collapsing when
    // the user is adjusting the sizes manually, which relies on the use of
    // the :focus-within psuedo class), by unfocusing the tract control
    // knows it can (and should) collapse.
    e.currentTarget.blur();
    onClick?.();
  };
}

export function TractInfoDisplays({
  dir,
  sizes,
  areas,
  onUpdate,
}: {
  dir: TractInfo["dir"];
  sizes: TemplatedGridProps["col_sizes"] | TemplatedGridProps["row_sizes"];
  areas: TemplatedGridProps["areas"];
  onUpdate: (a: TractUpdateAction) => void;
}) {
  const findDeleteConflicts = React.useCallback(
    ({ dir, index }: Omit<TractInfo, "size">) =>
      conflictsToRemoveTract(areas, {
        dir,
        index: index + 1,
      }),
    [areas]
  );

  return (
    <>
      {sizes.map((size, index) => (
        <TractInfoDisplay
          key={dir + index}
          index={index}
          dir={dir}
          size={size}
          onUpdate={onUpdate}
          deletionConflicts={findDeleteConflicts({ dir, index })}
        />
      ))}
    </>
  );
}

function stopPropagation(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  e.stopPropagation();
}

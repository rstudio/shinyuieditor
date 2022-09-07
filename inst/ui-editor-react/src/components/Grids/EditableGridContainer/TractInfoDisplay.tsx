import * as React from "react";

import { Trash } from "components/Icons";
import { CSSUnitInputSimple } from "components/Inputs/CSSUnitInput/CSSUnitInputSimple";
import { PopoverButton } from "components/Inputs/PopoverButton";
import type { CSSMeasure, CSSUnits } from "CSSMeasure";
import { FaPlus } from "react-icons/fa";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";

import type { TemplatedGridProps } from "../../../Shiny-Ui-Elements/GridlayoutGridPage";

import type { TractUpdateAction } from ".";

import classes from "./TractInfoDisplay.module.css";
import type { TractInfo } from "./useDragToResizeGrid";

const ALLOWED_UNITS: CSSUnits[] = ["fr", "px"];
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
            onClick={onTractDelete}
            deletionConflicts={deletionConflicts}
          />
          <AddTractButton dir={dir} onClick={onNewTractAfter} />
        </div>
        <CSSUnitInputSimple
          value={size}
          units={ALLOWED_UNITS}
          onChange={onNewSize}
        />
      </div>
    </div>
  );
}

// We slighly delay the opening of the buttons because if they under the mouse
// on animation they can trigger the popover to show up in their mid-animation
// position, causing some confusingly placed tooltips
const BUTTON_POPOVER_DELAY = 200;

function DeleteTractButton({
  onClick,
  deletionConflicts,
}: {
  onClick: () => void;
  deletionConflicts: string[];
}) {
  const enabled = deletionConflicts.length === 0;
  const message = !enabled
    ? `Can't delete because the items ${deletionConflicts.join(
        ","
      )} are entirely contained in tract`
    : "Delete tract";
  return (
    <PopoverButton
      className={classes.deleteButton}
      onClick={removeFocusAfterClick(enabled ? onClick : undefined)}
      popoverContent={message}
      data-enabled={enabled}
      openDelayMs={BUTTON_POPOVER_DELAY}
    >
      <Trash />
    </PopoverButton>
  );
}

function AddTractButton({
  dir,
  onClick,
}: {
  dir: TractInfo["dir"];
  onClick: () => void;
}) {
  const popoverPlacement = dir === "rows" ? "right" : "bottom";

  const label = dir === "rows" ? `Add row` : `Add column`;

  return (
    <PopoverButton
      className={classes.tractAddButton}
      placement={popoverPlacement}
      aria-label={label}
      popoverContent={label}
      onClick={removeFocusAfterClick(onClick)}
      openDelayMs={BUTTON_POPOVER_DELAY}
    >
      <FaPlus />
    </PopoverButton>
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

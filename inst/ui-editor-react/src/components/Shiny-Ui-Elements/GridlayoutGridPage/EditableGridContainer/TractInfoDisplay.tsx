import * as React from "react";

import { Trash } from "components/Icons";
import Button from "components/Inputs/Button/Button";
import { CSSUnitInputSimple } from "components/Inputs/CSSUnitInput/CSSUnitInputSimple";
import { PopoverButton } from "components/Inputs/PopoverButton";
import type { CSSMeasure, CSSUnits } from "CSSMeasure";
import { FaPlus } from "react-icons/fa";
import { conflictsToRemoveTract } from "utils/gridTemplates/removeTract";

import type { TemplatedGridProps } from "..";

import type { TractUpdateAction } from ".";

import classes from "./TractInfoDisplay.module.css";
import type { DragStatus, TractInfo } from "./useDragToResizeGrid";
import { tractIsBeingResized } from "./utils";

const ALLOWED_UNITS: CSSUnits[] = ["fr", "px"];
export function TractInfoDisplay({
  dir,
  index,
  size,
  dragStatus,
  onUpdate,
  deletionConflicts,
}: TractInfo & {
  dragStatus: DragStatus;
  onUpdate: (a: TractUpdateAction) => void;
  deletionConflicts: string[];
}) {
  const resized_size = tractIsBeingResized(dragStatus, { dir, index });
  const show = resized_size !== false;
  const displayed_size =
    resized_size === false ? size : resized_size.current_size;

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
      data-visible={show}
      style={
        {
          "--tract-index": index + 1,
        } as React.CSSProperties
      }
    >
      <div className={classes.hoverListener}>
        <AddTractButton
          placement="before"
          dir={dir}
          onClick={onNewTractBefore}
        />
        <DeleteTractButton
          onClick={onTractDelete}
          deletionConflicts={deletionConflicts}
        />
        <AddTractButton placement="after" dir={dir} onClick={onNewTractAfter} />
      </div>
      <div className={classes.sizeWidget} onClick={stopPropagation}>
        <CSSUnitInputSimple
          value={displayed_size}
          units={ALLOWED_UNITS}
          onChange={onNewSize}
        />
      </div>
    </div>
  );
}

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
      onClick={enabled ? onClick : undefined}
      popoverText={message}
      data-enabled={enabled}
    >
      <Trash />
    </PopoverButton>
  );
}

function AddTractButton({
  placement,
  dir,
  onClick,
}: {
  placement: "before" | "after";
  dir: TractInfo["dir"];
  onClick: () => void;
}) {
  const className =
    placement === "after"
      ? classes.tractAddAfterButton
      : classes.tractAddBeforeButton;

  const popoverPlacement = dir === "rows" ? "right" : "bottom";

  const label = dir === "rows" ? `Add row` : `Add column`;

  return (
    <PopoverButton
      className={className}
      placement={popoverPlacement}
      aria-label={label}
      popoverText={label}
      onClick={onClick}
    >
      <FaPlus />
    </PopoverButton>
  );
}

export function TractInfoDisplays({
  dir,
  sizes,
  dragStatus,
  areas,
  onUpdate,
}: {
  dir: TractInfo["dir"];
  sizes: TemplatedGridProps["colSizes"] | TemplatedGridProps["rowSizes"];
  dragStatus: DragStatus;
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
          dragStatus={dragStatus}
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

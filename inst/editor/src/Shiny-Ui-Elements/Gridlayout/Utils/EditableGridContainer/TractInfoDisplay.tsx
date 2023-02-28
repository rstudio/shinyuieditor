import * as React from "react";

import { FaPlus } from "react-icons/fa";

import type { TemplatedGridProps } from "./TemplatedGridProps";
import { conflictsToRemoveTract } from "../../../../utils/gridTemplates/removeTract";
import { Trash } from "../../../../components/Icons";
import { parseCSSMeasure } from "../../../../components/Inputs/CSSUnitInput/CSSMeasure";
import { CSSUnitChooser } from "../../../../components/Inputs/CSSUnitInput/CSSUnitChooser";
import { NumberInputSimple } from "../../../../components/Inputs/NumberInput/NumberInput";
import { TooltipButton } from "../../../../components/PopoverEl/Tooltip";

import { getUnitInfo } from "./dragToResizeHelpers";
import type { TractUpdateAction } from "./EditableGridContainer";
import classes from "./TractInfoDisplay.module.css";
import { roundFr, roundPixel } from "./tractUpdatingFunctions";
import type { TractInfo } from "./useDragToResizeGrid";
import { cleanNumber } from "./utils";

type TractUnit = "fr" | "px";
const ALLOWED_UNITS: TractUnit[] = ["fr", "px"];
function TractInfoDisplay({
  dir,
  index,
  size,
  deletionConflicts,
  addTract,
  deleteTract,
  changeUnit,
  changeCount,
}: TractInfo & {
  addTract: (where: "before" | "after") => void;
  deleteTract: () => void;
  changeUnit: (u: TractUnit) => void;
  changeCount: (c: number) => void;
  deletionConflicts: string[];
}) {
  const { unit, count } = parseCSSMeasure(size);

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
          <AddTractButton dir={dir} onClick={() => addTract("before")} />
          <DeleteTractButton
            dir={dir}
            onClick={deleteTract}
            deletionConflicts={deletionConflicts}
          />
          <AddTractButton dir={dir} onClick={() => addTract("after")} />
        </div>
        <div className={classes.cssSizeInput}>
          <NumberInputSimple
            name="value-count"
            aria-label="value-count"
            value={count}
            onChange={changeCount}
            min={0}
          />
          <CSSUnitChooser
            unit={unit as TractUnit}
            availableUnits={ALLOWED_UNITS}
            onChange={(u) => changeUnit(u)}
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

function getFrUnitSizeInPx(
  actualSizes: number[],
  sizes: TractInfoDisplaysProps["sizes"]
): number | "NO_FR_UNITS" {
  let totalFrSizes: number = 0;
  let totalPxSizes: number = 0;

  for (let i = 0; i < sizes.length; i++) {
    const { type, count } = getUnitInfo(sizes[i]);

    if (type === "fr") {
      totalFrSizes += count;
      totalPxSizes += actualSizes[i];
    }
  }

  if (totalFrSizes === 0) return "NO_FR_UNITS";

  return totalFrSizes / totalPxSizes;
}

type TractInfoDisplaysProps = {
  dir: TractInfo["dir"];
  sizes: TemplatedGridProps["col_sizes"] | TemplatedGridProps["row_sizes"];
  getActualSizes: () => number[];
  areas: TemplatedGridProps["areas"];
  onUpdate: (a: TractUpdateAction) => void;
};

export function TractInfoDisplays({
  dir,
  sizes,
  getActualSizes,
  areas,
  onUpdate,
}: TractInfoDisplaysProps) {
  const findDeleteConflicts = React.useCallback(
    ({ dir, index }: Omit<TractInfo, "size">) =>
      conflictsToRemoveTract(areas, {
        dir,
        index: index + 1,
      }),
    [areas]
  );

  const changeCount = (index: number) => (count: number) => {
    const { unit: currentUnit } = parseCSSMeasure(sizes[index]);

    onUpdate({
      type: "RESIZE",
      index,
      dir,
      size: `${count}${currentUnit as TractUnit}`,
    });
  };

  const changeUnit = (index: number) => (unit: TractUnit) => {
    const actualSizes = getActualSizes();
    const { count: currentUnitCount } = parseCSSMeasure(sizes[index]);

    let newCount: number = 1;

    if (unit === "px") {
      newCount = roundPixel(actualSizes[index]);
    }

    const frRatio = getFrUnitSizeInPx(actualSizes, sizes);
    if (unit === "fr" && frRatio !== "NO_FR_UNITS") {
      newCount = cleanNumber(
        roundFr(currentUnitCount ? currentUnitCount * frRatio : 1)
      );
    }

    onUpdate({ type: "RESIZE", index, dir, size: `${newCount}${unit}` });
  };

  const addTract = (i: number) => (where: "before" | "after") =>
    onUpdate({
      type: "ADD",
      dir,
      index: where === "before" ? i : i + 1,
    });

  const deleteTract = (i: number) => () => {
    onUpdate({ type: "DELETE", dir, index: i + 1 });
  };
  return (
    <>
      {sizes.map((size, index) => (
        <TractInfoDisplay
          key={dir + index}
          index={index}
          dir={dir}
          addTract={addTract(index)}
          deleteTract={deleteTract(index)}
          changeUnit={changeUnit(index)}
          changeCount={changeCount(index)}
          size={size}
          deletionConflicts={findDeleteConflicts({ dir, index })}
        />
      ))}
    </>
  );
}

function stopPropagation(e: React.MouseEvent<HTMLElement, MouseEvent>) {
  e.stopPropagation();
}

/**
 * Remotely hide or show the tract info sizers. This is used when dragging to
 * make sure we don't cover up the smaller size widgets with a (stale) info
 * widget.
 * @param container Main grid container that the tract info panels will be in
 * @param showOrHide Should the panels be hidden or re-shown?
 */
export function hideOrShowTractInfo(
  container: HTMLElement,
  showOrHide: "show" | "hide"
) {
  container.querySelectorAll(`.${classes.tractInfoDisplay}`).forEach((el) => {
    (el as HTMLElement).style.display =
      showOrHide === "hide" ? "none" : "block";
  });
}

/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import * as React from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilTransaction_UNSTABLE, useRecoilValue } from "recoil";
import { CSSMeasure } from "../GridTypes";
import { gridItemNames } from "../state-logic/gridItems";
import {
  colsState,
  rowsState,
  TractDirection,
  TractPosition,
} from "../state-logic/gridLayout/atoms";
import { updateItemBoundsForNewTract } from "../state-logic/gridLayout/hooks";
import { seqArray } from "./general-helpers";
import { TractGutter } from "./TractGutter";

const adderButtonStyles = css`
  --size: var(--gap);
  --offset: calc(-1 * var(--size));
  width: var(--size);
  height: var(--size);
  font-size: 15px;
  display: grid;
  place-content: center;

  & > button {
    background-color: rgba(255, 255, 255, 0);
    color: var(--dark-gray, gray);
    transition: color 0.2s, background-color 0.2s;
    padding: 5px;
    border-radius: 50%;
  }

  &:hover > button {
    background-color: var(--dark-gray, gray);
    color: white;
  }

  &.colsAdder {
    justify-self: end;
    margin-right: var(--offset);
    margin-top: var(--offset);
  }

  &.colsAdder.first {
    justify-self: start;
    margin-left: var(--offset);
  }
  &.rowsAdder {
    align-self: end;
    margin-left: var(--offset);
    margin-bottom: var(--offset);
  }
  &.rowsAdder.first {
    align-self: start;
    margin-top: var(--offset);
  }
`;

function insertNewTract(
  oldTracts: CSSMeasure[],
  newValue: CSSMeasure,
  indexToInsertAt: number
): CSSMeasure[] {
  const numTracts = oldTracts.length;
  const preInsertion = oldTracts.slice(0, indexToInsertAt);
  const postInsertion = oldTracts.slice(indexToInsertAt, numTracts);

  return [...preInsertion, newValue, ...postInsertion];
}

export function TractAddButtons({ dir }: { dir: TractDirection }) {
  const tracts = useRecoilValue(dir === "rows" ? rowsState : colsState);
  const newTractSize = "1fr";
  const addTract = useRecoilTransaction_UNSTABLE(
    ({ set, get }) => (indexToInsertAt: number) => {
      const tractAtom = dir === "rows" ? rowsState : colsState;
      const existingTracts = get(tractAtom);

      set(
        tractAtom,
        insertNewTract(existingTracts, newTractSize, indexToInsertAt)
      );

      const itemNames = get(gridItemNames);
      itemNames.forEach((name) => {
        updateItemBoundsForNewTract(name, get, set, {
          index: indexToInsertAt,
          dir,
        });
      });
    }
  );

  const numTracts = tracts.length;
  return (
    <>
      {seqArray(numTracts + 1).map((i) => (
        <TractAddButton
          key={dir + "Adder" + i}
          dir={dir}
          index={i}
          onAdd={(i) => addTract(i)}
        />
      ))}
    </>
  );
}

function TractAddButton({
  dir,
  index,
  onAdd,
}: TractPosition & { onAdd: (indexOfNewTract: number) => void }) {
  // We place the adder button for index 0 and 1 in the same tract
  // and then just alter where they sit in the tract using the .first class
  const placementIndex = Math.max(index - 1, 0);
  const isFirstTract = index === 0;

  const description = `Add ${
    dir === "rows" ? "row" : "column"
  } at index ${index}`;
  return (
    <TractGutter dir={dir} index={placementIndex}>
      <div
        className={`${dir}Adder${isFirstTract ? " first" : ""}`}
        css={adderButtonStyles}
      >
        <button
          aria-label={description}
          title={description}
          onClick={(e) => {
            onAdd(index);
          }}
        >
          <FaPlus />
        </button>
      </div>
    </TractGutter>
  );
}

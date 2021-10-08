import { HStack, VStack } from "@chakra-ui/layout";
import { Button, Tag, TagLeftIcon } from "@chakra-ui/react";
import { GridPos } from "GridTypes";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { ImStack } from "react-icons/im";
import { useRecoilTransaction_UNSTABLE } from "recoil";
import { removeAtIndex } from "utils/array-helpers";
import { modalStateAtom, useCloseModal } from "views/InfoModal";
import { deleteAnItem, gridItemAtoms, gridItemNames } from "./gridItems";
import { colsState, rowsState, TractDirection } from "./gridLayout/atoms";

export default function useRemoveTract() {
  const closeModal = useCloseModal();

  const removeTract = useRecoilTransaction_UNSTABLE(
    ({ get, set, reset }) => (
      dir: TractDirection,
      index: number,
      deleteConflictingItems: boolean = false
    ) => {
      // First check for trouble elements before proceeding so we can error out
      // and tell the user why

      // The grid positions are indexed by 1 instead of 0 so we need to add
      // one to compare with the grid position
      const oneBasedIndex = index + 1;
      const startPos: keyof GridPos = dir === "rows" ? "startRow" : "startCol";
      const endPos: keyof GridPos = dir === "rows" ? "endRow" : "endCol";
      const itemNames = get(gridItemNames);

      let troubleElementsNames: string[] = [];
      let itemsStartingAfterTract: string[] = [];
      let itemsEndingAfterTract: string[] = [];
      itemNames.forEach((name) => {
        const el = get(gridItemAtoms(name));
        const elStart = el[startPos];
        // Since GridPos allows the end position to be left blank we need to
        // guarentee it exists
        const elEnd = el[endPos] ?? elStart;

        if (elStart === elEnd && elStart === oneBasedIndex) {
          if (deleteConflictingItems) deleteAnItem(name, get, set, reset);
          else troubleElementsNames.push(name);
        }

        if (elStart > oneBasedIndex) itemsStartingAfterTract.push(name);
        if (elEnd >= oneBasedIndex) itemsEndingAfterTract.push(name);
      });

      if (troubleElementsNames.length > 0) {
        set(modalStateAtom, {
          title: `Can't remove ${dir === "rows" ? "row" : "column"}!`,
          content: (
            <InTheWayItemsWarning
              names={troubleElementsNames}
              dir={dir}
              index={index}
              onClose={closeModal}
            />
          ),
        });
        return;
      }

      // Go through and update items that have the removed tract in their span
      itemsStartingAfterTract.forEach((name) => {
        set(gridItemAtoms(name), (el) => {
          const newEl = { ...el };
          newEl[startPos]--;
          return newEl;
        });
      });

      itemsEndingAfterTract.forEach((name) => {
        set(gridItemAtoms(name), (el) => {
          const newEl = { ...el };
          newEl[endPos] = (newEl[endPos] ?? newEl[startPos]) - 1;
          return newEl;
        });
      });

      set(dir === "rows" ? rowsState : colsState, (existingTracts) => {
        return removeAtIndex(existingTracts, index);
      });
    }
  );
  return removeTract;
}

function InTheWayItemsWarning({
  names,
  dir,
  index,
  onClose,
}: {
  names: string[];
  dir: TractDirection;
  index: number;
  onClose: () => void;
}) {
  const removeTract = useRemoveTract();
  const dirSingular = dir === "rows" ? "row" : "column";
  const onRemove = React.useCallback(() => {
    removeTract(dir, index, true);
    onClose();
  }, [dir, index, onClose, removeTract]);

  return (
    <>
      <p>
        The following items are entirely contained within the {dirSingular} and
        would be removed.
      </p>

      <VStack spacing={3} alignItems="start" padding="1rem">
        {names.map((name) => (
          <Tag key={name}>
            <TagLeftIcon as={ImStack} color="green.500" />
            {name}
          </Tag>
        ))}
      </VStack>
      <p>To remove this {dirSingular}, either move or remove these elements.</p>
      <HStack paddingTop="1rem" justify="space-between">
        <Button leftIcon={<FaTrash />} onClick={onRemove}>
          Remove items & continue
        </Button>
        <Button leftIcon={<AiOutlineClose />} onClick={onClose}>
          Cancel
        </Button>
      </HStack>
    </>
  );
}

import {
  Button,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tag,
  TagLeftIcon,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import { ImStack } from "react-icons/im";
import { selectorFamily, useRecoilValue } from "recoil";
import { combinedItemsState } from "state-logic/gridItems";
import { TractDirection } from "state-logic/gridLayout/atoms";
import useRemoveTract from "state-logic/tractDeletion";

type TractsToConflictsMap = Map<number, string[]>;

export const currentTractDeletionConflicts = selectorFamily<
  TractsToConflictsMap,
  TractDirection
>({
  key: "currentTractDeletionConflicts",
  get: (dir) => ({ get }) => {
    const items = get(combinedItemsState);

    const tractsWithIssues: TractsToConflictsMap = new Map();

    items.forEach((el) => {
      const isConflicting =
        dir === "rows" ? el.startRow === el.endRow : el.startCol === el.endCol;
      if (isConflicting) {
        const zeroBasedIndex = (dir === "rows" ? el.startRow : el.startCol) - 1;
        const existing = tractsWithIssues.get(zeroBasedIndex);
        tractsWithIssues.set(zeroBasedIndex, [...(existing ?? []), el.name]);
      }
    });

    return tractsWithIssues;
  },
});

export function TractDeleteButton({
  index,
  dir,
}: {
  index: number;
  dir: TractDirection;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  const removeTract = useRemoveTract();

  const tractConflicts = useRecoilValue(currentTractDeletionConflicts(dir));

  const isRows = dir === "rows";
  const singularDir = isRows ? "row" : "column";

  const deleteButtonProps = {
    variant: "ghost",
    "aria-label": `Delete ${singularDir} ${index}`,
    icon: <FaTrash />,
    ...(isRows
      ? {
          w: "100%",
          minW: "100%",
          h: "auto",
          minH: "auto",
        }
      : {
          w: "auto",
          minW: "auto",
          h: "100%",
          minH: "100%",
        }),
  };

  const names = tractConflicts.get(index);
  if (names) {
    return (
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton {...deleteButtonProps} color="grey" />
        </PopoverTrigger>
        <PopoverContent aria-label="Deletion conflict message">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Conflicting items in {singularDir}!</PopoverHeader>
          <PopoverBody>
            <p>
              The following items are entirely contained within the{" "}
              {singularDir} and would be removed.
            </p>

            <Wrap padding="0.5rem" justify="space-around">
              {names.map((name) => (
                <WrapItem key={name}>
                  <Tag>
                    <TagLeftIcon as={ImStack} color="green.500" />
                    {name}
                  </Tag>
                </WrapItem>
              ))}
            </Wrap>

            <p>
              To remove this {singularDir}, either delete these items or move
              them.
            </p>
          </PopoverBody>
          <PopoverFooter>
            <HStack justify="space-between">
              <Button
                leftIcon={<FaTrash />}
                onClick={() => {
                  closePopover();
                  removeTract(dir, index);
                }}
              >
                Delete items
              </Button>
              <Button leftIcon={<AiOutlineClose />} onClick={closePopover}>
                Cancel
              </Button>
            </HStack>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <IconButton
        {...deleteButtonProps}
        onClick={() => removeTract(dir, index)}
      />
    );
  }
}

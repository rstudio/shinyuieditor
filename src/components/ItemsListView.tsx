import { Spacer, Text, VStack } from "@chakra-ui/layout";
import { Flex, IconButton } from "@chakra-ui/react";
import * as CSS from "csstype";
import { FaTrash } from "react-icons/fa";
import { useRecoilValue } from "recoil";
import {
  gridItemNames,
  selectedItemNameState,
  useDeleteItem,
  useToggleSelectedItem,
} from "../state-logic/gridItems";

const commonStyles: CSS.Properties = {
  width: "100%",
  alignItems: "center",
  padding: "4px 10px",
};

const itemStyles = {
  ...commonStyles,
  borderRadius: "var(--corner-radius)",
  background: "var(--rstudio-blue)",
  color: "white",
  width: "100%",
  alignItems: "center",
  padding: "4px 10px",
  boxShadow: "var(--shadow)",
  "&.selected": {
    boxShadow: "var(--selected-shadow)",
  },
};

const noItemsMessageStyles = {
  ...commonStyles,
  fontStyle: "italic",
};

export const ItemsListView = () => {
  const selectedItemName = useRecoilValue(selectedItemNameState);

  const toggleSelectedItem = useToggleSelectedItem();
  const deleteItem = useDeleteItem();

  const itemNames = useRecoilValue(gridItemNames);

  if (itemNames.length === 0) {
    return (
      <VStack aria-label="item-list">
        <Flex aria-label="no-items-message" css={noItemsMessageStyles}>
          No items present. Add an item by dragging in the app window.
        </Flex>
        ))
      </VStack>
    );
  }
  return (
    <VStack aria-label="item-list" role="listbox">
      {itemNames.map((name) => {
        const isSelected = name === selectedItemName;
        return (
          <Flex
            key={name}
            role="option"
            aria-selected={isSelected ? "true" : "false"}
            aria-label={`${name}-item`}
            className={isSelected ? "selected" : "normal"}
            css={itemStyles}
            onClick={() => toggleSelectedItem(name)}
          >
            <Text aria-label="item-name">{name}</Text>
            <Spacer />
            <IconButton
              aria-label={"Delete " + name}
              variant="outline"
              icon={<FaTrash />}
              onClick={(e) => {
                e.stopPropagation();
                deleteItem(name);
              }}
            />
          </Flex>
        );
      })}
    </VStack>
  );
};

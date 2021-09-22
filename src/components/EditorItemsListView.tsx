import { Spacer, Text, VStack } from "@chakra-ui/layout";
import { Flex, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  GridItemNamesAtom,
  selectedItemNameState,
} from "../state-logic/gridItems";
import * as CSS from "csstype";

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
export const EditorItemsListView = ({
  itemNamesAtom,
  deleteItem,
}: {
  itemNamesAtom: GridItemNamesAtom;
  deleteItem: (name: string) => void;
}) => {
  const [selectedItemName, setSelectedItemName] = useRecoilState(
    selectedItemNameState
  );

  const toggleSelected = (name: string) => {
    setSelectedItemName((previousSelection) =>
      previousSelection === name ? null : name
    );
  };
  const itemNames = useRecoilValue(itemNamesAtom);

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
    <VStack aria-label="item-list">
      {itemNames.map((name) => (
        <Flex
          key={name}
          aria-label={`${name}-item`}
          className={name === selectedItemName ? "selected" : "normal"}
          css={itemStyles}
          onClick={() => toggleSelected(name)}
        >
          <Text aria-label="item-name">{name}</Text>
          <Spacer />
          <IconButton
            aria-label="Delete item"
            variant="outline"
            icon={<FaTrash />}
            onClick={(e) => {
              e.stopPropagation();
              deleteItem(name);
            }}
          />
        </Flex>
      ))}
    </VStack>
  );
};

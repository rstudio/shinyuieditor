import { Spacer, VStack } from "@chakra-ui/layout";
import { Flex, IconButton } from "@chakra-ui/react";
import { FaTrash } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  GridItemNamesAtom,
  selectedItemNameState,
} from "../state-logic/gridItems";

const itemStyles = {
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

  return (
    <VStack>
      {itemNames.map((name) => (
        <Flex
          key={name}
          className={name === selectedItemName ? "selected" : "normal"}
          css={itemStyles}
          onClick={() => toggleSelected(name)}
        >
          {name}
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

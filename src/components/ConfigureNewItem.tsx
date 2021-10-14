import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { GridPos } from "GridTypes";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { atom, useRecoilValue, useResetRecoilState } from "recoil";
import { gridItemNames, useAddNewItem } from "state-logic/gridItems";

export const newItemInfoAtom = atom<GridPos | null>({
  key: "newItemInfo",
  default: null,
});

export function ConfigureNewItemModal() {
  const newItemInfo = useRecoilValue(newItemInfoAtom);
  const closeModal = useResetRecoilState(newItemInfoAtom);

  if (newItemInfo === null) return null;

  return (
    <Modal isOpen={true} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <ConfigureNewItemForm itemPos={newItemInfo} onClose={closeModal} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export function ConfigureNewItemForm({
  itemPos,
  onClose,
}: {
  itemPos: GridPos;
  onClose: () => void;
}) {
  const addNewItem = useAddNewItem();

  const nameInputRef = React.useRef<HTMLInputElement>(null);

  const [currentName, setCurrentName] = React.useState("");
  const [warningMsg, setWarningMsg] = React.useState<string | null>(null);
  const updateName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentName(e.target.value);
    validateName(e.target.value);
  };
  const existingElementNames = useRecoilValue(gridItemNames);
  // Make sure when the modal pops up focus is on the input so the user can
  // start typing immediately without having to select then input with mouse.
  React.useLayoutEffect(() => {
    nameInputRef.current?.focus();
  }, []);
  const validateName = (name: string) => {
    const elementExists = existingElementNames.includes(name);
    if (elementExists) {
      setWarningMsg(
        `You already have an item with the name "${name}", all names need to be unique.`
      );
      return;
    }

    const invalidCharacters = name.match(/^[^a-zA-Z]/g);
    if (invalidCharacters) {
      setWarningMsg("Valid item names need to start with a character.");
      return;
    }

    setWarningMsg(null);
  };

  const submitName = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentName === "") return;
    addNewItem({ name: currentName, ...itemPos });
    onClose();
  };

  const hasWarning = Boolean(warningMsg);

  return (
    <form onSubmit={submitName}>
      <FormControl id="item-name" isRequired>
        <FormLabel>Item Name</FormLabel>
        <Input
          ref={nameInputRef}
          placeholder="Item Name"
          value={currentName}
          onChange={updateName}
          isInvalid={hasWarning}
        />

        <FormHelperText
          color={hasWarning ? "orangered" : "GrayText"}
          aria-label={hasWarning ? "input-warning" : "input-description"}
        >
          {hasWarning
            ? warningMsg
            : "Name of the new item. Used to map to placement on grid."}
        </FormHelperText>
      </FormControl>
      <HStack spacing="6" marginTop="1rem" justify="space-evenly">
        <Button
          variant="main"
          leftIcon={<BiCheck />}
          type="submit"
          disabled={currentName === "" || warningMsg !== null}
        >
          Add Item
        </Button>
        <Button
          colorScheme="red"
          leftIcon={<AiOutlineClose />}
          onClick={onClose}
        >
          Cancel
        </Button>
      </HStack>
    </form>
  );
}

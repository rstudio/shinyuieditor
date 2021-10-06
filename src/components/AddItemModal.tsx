/** @jsxImportSource @emotion/react */
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
} from "@chakra-ui/react";
import { css } from "@emotion/react";
import { GridPos } from "GridTypes";
import * as React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { atom, useRecoilCallback, useRecoilValue } from "recoil";
import { gridItemNames, useAddNewItem } from "state-logic/gridItems";

// Hook that is used in conjection with AddItemModal component to control its
// external state

export const addItemModalState = atom<GridPos | null>({
  key: "addItemModalState",
  default: null,
});

export function useAddItemModalCloser() {
  const closeAddItemModal = useRecoilCallback(
    ({ reset }) => () => reset(addItemModalState),
    []
  );

  return closeAddItemModal;
}

export function AddItemModal() {
  const modalState = useRecoilValue(addItemModalState);
  const addNewItem = useAddNewItem();
  const closeAddItemModal = useAddItemModalCloser();

  if (modalState === null) return null;

  return (
    <div
      css={{
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        position: "absolute",
        inset: "0",
        display: "grid",
        placeContent: "center",
      }}
    >
      <div css={addItemModalStyles}>
        <Heading>New Item</Heading>
        <div
          css={{
            gridArea: "input",
            alignSelf: "center",
            width: "100%",
            maxWidth: "400px",
            position: "relative",
          }}
        >
          <ItemNamingForm
            onFinish={(name) => {
              addNewItem({ name, ...modalState });
            }}
            onClose={closeAddItemModal}
          />
        </div>
        {/* <div className={classes.uiChooser}>
          <UiChooser />
        </div> */}
      </div>
    </div>
  );
}

function ItemNamingForm({
  onFinish,
  onClose,
}: {
  onFinish: (name: string) => void;
  onClose: () => void;
}) {
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

    onFinish(currentName);
    onClose();
  };

  return (
    <form onSubmit={submitName}>
      <FormControl id="item-name" isRequired>
        <FormLabel>Item Name</FormLabel>
        <Input
          ref={nameInputRef}
          placeholder="Item Name"
          value={currentName}
          onChange={updateName}
        />
        <FormHelperText color={warningMsg ? "orangered" : "GrayText"}>
          {warningMsg ??
            "Name of the new item. Used to map to placement on grid."}
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
          onClick={() => {
            setWarningMsg(null);
            onClose();
          }}
        >
          Cancel
        </Button>
      </HStack>
    </form>
  );
}

const addItemModalStyles = css`
  box-shadow: var(--shadow);
  background-color: var(--rstudio-white);
  border-radius: var(--corner-radius);
  padding: 4rem 5rem;
  display: grid;
  justify-items: center;
  gap: 0.5rem;
  width: 750px;
  max-width: 95vw;
  grid-template-rows: 70px 1fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title   title"
    "input   input";
`;

import { useCallback, useLayoutEffect, useRef, useState } from "preact/hooks";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { useAddNewItem } from "../../state-logic/gridItems";
import { itemNamesState } from "../../state-logic/recoilAtoms";
import { GridPos } from "../../types";
import classes from "./style.module.css";

// Hook that is used in conjection with AddItemModal component to control its
// external state

export const addItemModalState = atom<GridPos | null>({
  key: "addItemModalState",
  default: null,
});

export function useAddItemModal() {
  const [modalState, setModalState] = useRecoilState(addItemModalState);

  const openAddItemModal = useCallback(
    (pos: GridPos) => setModalState(pos),
    [setModalState]
  );

  const closeAddItemModal = useCallback(
    () => setModalState(null),
    [setModalState]
  );

  return {
    modalState,
    openAddItemModal,
    closeAddItemModal,
  };
}

export function AddItemModal() {
  const { modalState, closeAddItemModal } = useAddItemModal();

  if (modalState === null) return null;

  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const addNewItem = useAddNewItem();

  const existingElementNames = useRecoilValue(itemNamesState);

  const turnOffWarningMsg = () => setWarningMsg(null);

  // Make sure when the modal pops up focus is on the input so the user can
  // start typing immediately without having to select then input with mouse.
  useLayoutEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const cancelModal = () => {
    closeAddItemModal();
    turnOffWarningMsg();
  };

  const submitName = (e: Event) => {
    e.preventDefault();
    const currentName = nameInputRef.current?.value;
    if (!currentName) return;

    const elementExists = existingElementNames.includes(currentName);
    if (elementExists) {
      setWarningMsg(
        `You already have an item with the name "${currentName}", all names need to be unique.`
      );
      return;
    }

    const invalidCharacters = currentName.match(/^[^a-zA-Z]/g);
    if (invalidCharacters) {
      setWarningMsg("Valid item names need to start with a character.");
      return;
    }

    addNewItem({ name: currentName, ...modalState });
    closeAddItemModal();
  };

  return (
    <div className={classes.modalHolder}>
      <div className={classes.addItemModal}>
        <h1>New item name:</h1>
        <form
          className={classes.inputForm}
          onSubmit={submitName}
          onInput={() => turnOffWarningMsg()}
        >
          <input ref={nameInputRef} type="text"></input>
          <input type="submit">Go</input>
        </form>
        {warningMsg ? <p className={classes.warningMsg}>{warningMsg}</p> : null}
        <button className={classes.cancel} onClick={() => cancelModal()}>
          Cancel
        </button>
      </div>
    </div>
  );
}

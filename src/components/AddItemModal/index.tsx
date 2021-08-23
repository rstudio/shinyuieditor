import { useCallback, useLayoutEffect, useRef, useState } from "preact/hooks";
import { SetterOrUpdater, useRecoilValue, useSetRecoilState } from "recoil";
import {
  gridItemsState,
  itemNamesState,
  LayoutDispatch,
} from "../../state-logic/layout-updating-logic";
import { GridItemDef, GridPos } from "../../types";
import classes from "./style.module.css";

// Hook that is used in conjection with AddItemModal component to control its
// external state
export function useAddItemModal() {
  const [addItemState, setAddItemState] = useState<GridPos | null>(null);

  const openAddItemModal = useCallback(
    (pos: GridPos) => setAddItemState(pos),
    [setAddItemState]
  );

  const closeAddItemModal = useCallback(
    () => setAddItemState(null),
    [setAddItemState]
  );

  return {
    addItemState,
    openAddItemModal,
    closeAddItemModal,
  };
}

function addItem(
  setItems: SetterOrUpdater<GridItemDef[]>,
  itemDef: GridItemDef
) {
  setItems((existingItems) => [...existingItems, itemDef]);
}

export function AddItemModal({
  state,
  closeModal,
}: {
  state: GridPos | null;
  closeModal: () => void;
}) {
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const existingElementNames = useRecoilValue(itemNamesState);
  const setItems = useSetRecoilState(gridItemsState);

  const turnOffWarningMsg = () => setWarningMsg(null);

  // Make sure when the modal pops up focus is on the input so the user can
  // start typing immediately without having to select then input with mouse.
  useLayoutEffect(() => {
    if (state) nameInputRef.current?.focus();
  }, [state]);

  const cancelModal = () => {
    closeModal();
    turnOffWarningMsg();
  };

  const submitName = (e: Event) => {
    e.preventDefault();
    const currentName = nameInputRef.current?.value;
    if (!(currentName && state)) return;

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

    addItem(setItems, { name: currentName, ...state });
    closeModal();
  };

  return state ? (
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
  ) : (
    <div style={{ display: "none" }} />
  );
}

import { useRef, useState } from "preact/hooks";
import { useGridLayoutState } from "../../state-logic/layout-updating-logic";
import { GridPos } from "../../types";
import classes from "./style.module.css";

export function useAddItemModal() {
  const [addItemState, setAddItemState] = useState<GridPos | null>(null);
  const openAddItemModal = (pos: GridPos) => {
    console.log("Activating naming state");
    setAddItemState(pos);
  };
  const closeAddItemModal = () => setAddItemState(null);

  return {
    addItemState,
    openAddItemModal,
    closeAddItemModal,
  };
}

export function AddItemModal({
  state,
  existingElementNames,
  onFinish,
  closeModal,
}: {
  state: GridPos | null;
  existingElementNames: string[];
  onFinish: ReturnType<typeof useGridLayoutState>["addItem"];
  closeModal: () => void;
}) {
  const [warningMsg, setWarningMsg] = useState<string | null>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const turnOffWarning = () => setWarningMsg(null);
  function finishedNaming(e: Event) {
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

    onFinish({ name: currentName, ...state });
    closeModal();
  }

  function cancel() {
    closeModal();
    turnOffWarning();
  }
  return state ? (
    <div className={classes.addItemModal}>
      <h1>Add your item, please!</h1>
      <form
        className={classes.inputForm}
        onSubmit={finishedNaming}
        onInput={() => turnOffWarning()}
      >
        <input ref={nameInputRef} type="text"></input>
        <input type="submit">Go</input>
      </form>
      {warningMsg ? <p className={classes.warningMsg}>{warningMsg}</p> : null}
      <button className={classes.cancel} onClick={() => cancel()}>
        Cancel
      </button>
    </div>
  ) : (
    <div style={{ display: "none" }} />
  );
}

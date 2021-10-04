import { IconButton } from "@chakra-ui/button";
import { FaRedo, FaUndo } from "react-icons/fa";
import { useUndoRedo } from "../state-logic/useUndoRedo";

export function HistoryNav() {
  const { goBackward, goForward, canGoBackward, canGoForward } = useUndoRedo();
  return (
    <>
      <IconButton
        icon={<FaUndo />}
        disabled={!canGoBackward}
        aria-label="undo"
        onClick={goBackward}
      />
      <IconButton
        icon={<FaRedo />}
        disabled={!canGoForward}
        aria-label="redo"
        onClick={goForward}
      />
    </>
  );
}

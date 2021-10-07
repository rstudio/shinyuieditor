import { IconButton } from "@chakra-ui/button";
import { HStack } from "@chakra-ui/layout";
import { FaRedo, FaUndo } from "react-icons/fa";
import { useUndoRedo } from "../state-logic/useUndoRedo";

export default function HistoryNav() {
  const { goBackward, goForward, canGoBackward, canGoForward } = useUndoRedo();
  return (
    <HStack>
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
    </HStack>
  );
}

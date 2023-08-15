import { FaCode } from "react-icons/fa";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { PopoverButton } from "../components/Inputs/PopoverButton";

export function OpenSideBySideWindowButton() {
  const { sendMsg, mode } = useBackendConnection();

  // We only want to show the code button when we're in VSCode and it will
  // actually do something
  if (mode !== "VSCODE") return null;

  return (
    <>
      <PopoverButton
        popoverContent="Open app code next to editor"
        placement="bottom"
        onClick={() => {
          sendMsg({
            path: "OPEN-COMPANION-EDITOR",
            payload: "BESIDE",
          });
        }}
        className="OpenSideBySideWindowButton"
      >
        <FaCode />
      </PopoverButton>
      <div className="divider" />
    </>
  );
}

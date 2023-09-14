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
        className="OpenSideBySideWindowButton mr-2"
        popoverContent="Open app code next to editor"
        placement="bottom"
        variant={["icon", "transparent"]}
        onClick={() => {
          sendMsg({
            path: "OPEN-COMPANION-EDITOR",
            payload: "BESIDE",
          });
        }}
      >
        <FaCode />
      </PopoverButton>
      <div className="divider" />
    </>
  );
}

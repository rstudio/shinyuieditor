import { FaCode } from "react-icons/fa";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";

export function OpenSideBySideWindowButton() {
  const { sendMsg, mode } = useBackendConnection();

  // We only want to show the code button when we're in VSCode and it will
  // actually do something
  if (mode !== "VSCODE") return null;

  return (
    <TooltipButton
      text="Open app code next to editor"
      onClick={() => {
        sendMsg({
          path: "OPEN-COMPANION-EDITOR",
          payload: "BESIDE",
        });
      }}
      className="OpenSideBySideWindowButton"
    >
      <FaCode />
    </TooltipButton>
  );
}

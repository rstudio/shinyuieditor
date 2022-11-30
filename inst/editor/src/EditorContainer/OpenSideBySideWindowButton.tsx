import { FaCode } from "react-icons/fa";

import { useBackendCallbacks } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";

export function OpenSideBySideWindowButton() {
  const { sendMsg } = useBackendCallbacks();

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

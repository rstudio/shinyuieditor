import { FaCode } from "react-icons/fa";

import { useBackendCallbacks } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";
import { useRuntimeType } from "../state/runtimeInfo";

export function OpenSideBySideWindowButton() {
  const { sendMsg } = useBackendCallbacks();
  const runtimeType = useRuntimeType();

  // We only want to show the code button when we're in VSCode and it will
  // actually do something
  if (runtimeType !== "VSCODE") return null;

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

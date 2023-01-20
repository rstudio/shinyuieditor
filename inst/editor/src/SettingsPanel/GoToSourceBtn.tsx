import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";
import type { ShinyUiNode } from "../main";
import { shinyUiNodeInfo } from "../Shiny-Ui-Elements/uiNodeTypes";
import type { PickKeyFn } from "../TypescriptUtils";

export function GoToSourceBtn({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg, mode } = useBackendConnection();

  // if (mode !== "VSCODE") return null;
  if (!node) return null;

  const { uiName, uiArguments } = node;
  const serverOutputInfo = shinyUiNodeInfo[uiName].outputBindings;

  if (typeof serverOutputInfo === "undefined") return null;

  const { outputIdKey, renderScaffold } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof uiArguments>)(uiArguments);

  const outputId = uiArguments[keyForOutput];

  if (typeof outputId !== "string") return null;

  return (
    <div>
      <TooltipButton
        text="Find output declaration in app script"
        position="left"
        variant="regular"
        onClick={() => {
          sendMsg({
            path: "GO-TO-SERVER",
            payload: {
              type: "Output",
              outputId,
              renderScaffold,
            },
          });
        }}
      >
        Find in server
      </TooltipButton>
    </div>
  );
}

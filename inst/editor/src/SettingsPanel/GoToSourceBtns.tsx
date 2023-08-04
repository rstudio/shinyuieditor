import type { LanguageMode } from "communication-types/src/AppInfo";
import type { MessageToBackend } from "communication-types/src/MessageToBackend";
import type {
  InputBindings,
  OutputBindings,
} from "ui-node-definitions/src/nodeInfoFactory";
import type { ShinyUiNode } from "ui-node-definitions/src/ShinyUiNode";
import { getUiNodeInfo } from "ui-node-definitions/src/uiNodeTypes";
import type { PickKeyFn } from "util-functions/src/TypescriptUtils";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { TooltipButton } from "../components/PopoverEl/Tooltip";
import { useCurrentAppInfo } from "../state/app_info";
import { useLanguageMode } from "../state/languageMode";

import { buildOutputScaffold } from "./buildOutputScaffold";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg, mode } = useBackendConnection();

  const language = useLanguageMode();
  if (mode !== "VSCODE" || !node) return null;

  const node_info = getUiNodeInfo(node.id)[
    language === "PYTHON" ? "py_info" : "r_info"
  ];

  const output_bindings = (
    "output_bindings" in node_info ? node_info.output_bindings : null
  ) as OutputBindings | null;

  const input_bindings =
    "input_bindings" in node_info ? node_info.input_bindings : null;

  return (
    <div>
      {output_bindings ? (
        <GoToOutputsBtn
          language={language}
          serverOutputInfo={output_bindings}
          node={node}
          sendMsg={sendMsg}
        />
      ) : null}
      {input_bindings ? (
        <GoToInputsBtn
          serverInputInfo={input_bindings}
          node={node}
          sendMsg={sendMsg}
        />
      ) : null}
    </div>
  );
}

function GoToOutputsBtn({
  language,
  serverOutputInfo,
  node: { namedArgs },
  sendMsg,
}: {
  language: LanguageMode;
  node: ShinyUiNode;
  serverOutputInfo: OutputBindings;
  sendMsg: (msg: MessageToBackend) => void;
}) {
  const current_app_info = useCurrentAppInfo();

  if (
    !(current_app_info.mode === "MAIN" && "known_outputs" in current_app_info)
  )
    return null;

  const known_outputs = current_app_info.known_outputs;

  const { outputIdKey = "outputId" } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof namedArgs>)(namedArgs);

  const outputId = namedArgs[keyForOutput as keyof typeof namedArgs];
  if (typeof outputId !== "string") return null;

  const existing_output_locations = known_outputs.includes(outputId);

  return (
    <TooltipButton
      text={
        existing_output_locations
          ? "Show output declaration in app script"
          : "Create output binding in app server"
      }
      position="left"
      variant="regular"
      onClick={() => {
        if (existing_output_locations) {
          sendMsg({
            path: "FIND-SERVER-USES",
            payload: {
              type: "Output",
              outputId: outputId,
            },
          });
        } else {
          sendMsg({
            path: "INSERT-SNIPPET",
            payload: buildOutputScaffold({
              language,
              output_id: outputId,
              output_info: serverOutputInfo,
            }),
          });
        }
      }}
    >
      {existing_output_locations ? "Show in server" : "Generate server code"}
    </TooltipButton>
  );
}

function GoToInputsBtn({
  serverInputInfo,
  node: { namedArgs },
  sendMsg,
}: {
  node: ShinyUiNode;
  serverInputInfo: InputBindings;
  sendMsg: (msg: MessageToBackend) => void;
}) {
  const inputIdKey =
    typeof serverInputInfo === "boolean" ? "inputId" : serverInputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForInputId =
    typeof inputIdKey === "string"
      ? inputIdKey
      : (inputIdKey as PickKeyFn<typeof namedArgs>)(namedArgs);

  const inputId = namedArgs[keyForInputId as keyof typeof namedArgs];

  if (typeof inputId !== "string") return null;

  return (
    <TooltipButton
      text={`Find uses of bound input (input$${inputId}) in app script`}
      position="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "FIND-SERVER-USES",
          payload: { type: "Input", inputId },
        });
      }}
    >
      Find in server
    </TooltipButton>
  );
}

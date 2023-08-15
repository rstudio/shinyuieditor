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
import { PopoverButton } from "../components/Inputs/PopoverButton";
import { useCurrentAppInfo } from "../state/app_info";
import { useLanguageMode } from "../state/languageMode";
import { useMetaData } from "../state/metaData";

import { buildOutputScaffold } from "./buildOutputScaffold";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg } = useBackendConnection();

  const language = useLanguageMode();

  const { server_aware } = useMetaData();

  if (!server_aware || !node) return null;

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

  if (!(current_app_info.mode === "MAIN" && current_app_info.server_locations))
    return null;

  const { server_locations } = current_app_info;

  const { outputIdKey = "outputId" } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof namedArgs>)(namedArgs);

  const outputId = namedArgs[keyForOutput as keyof typeof namedArgs];
  if (typeof outputId !== "string") return null;

  const existing_output_locations = server_locations.output_positions[outputId];

  return (
    <PopoverButton
      popoverContent={
        existing_output_locations
          ? "Show output declaration in app script"
          : "Create output binding in app server"
      }
      placement="left"
      variant="regular"
      onClick={() => {
        if (existing_output_locations) {
          sendMsg({
            path: "FIND-SERVER-USES",
            payload: {
              type: "Output",
              outputId,
            },
          });
          sendMsg({
            path: "SELECT-SERVER-CODE",
            payload: { positions: existing_output_locations },
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
    </PopoverButton>
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
  const current_app_info = useCurrentAppInfo();

  if (!(current_app_info.mode === "MAIN" && current_app_info.server_locations))
    return null;

  const { server_locations } = current_app_info;

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

  const inputLocations = server_locations.input_positions[inputId];

  if (!inputLocations) return null;

  return (
    <PopoverButton
      popoverContent={`Find uses of bound input (\`input$${inputId}\`) in app script`}
      use_markdown
      placement="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "FIND-SERVER-USES",
          payload: { type: "Input", inputId },
        });

        sendMsg({
          path: "SELECT-SERVER-CODE",
          payload: { positions: inputLocations },
        });
      }}
    >
      Find in server
    </PopoverButton>
  );
}

import type { MessageToBackend } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { toast } from "react-toastify";
import type { PickKeyFn } from "util-functions/src/TypescriptUtils";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { PopoverButton } from "../components/Inputs/PopoverButton";
import { generate_python_output_binding } from "../python-parsing";
import { generate_r_output_binding } from "../r-parsing";
import { useCurrentAppInfo } from "../state/app_info";
import { useMetaData } from "../state/metaData";
import type {
  OutputBindings,
  InputBindings,
} from "../ui-node-definitions/nodeInfoFactory";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import { getUiNodeInfo } from "../ui-node-definitions/uiNodeTypes";
import { buildServerInsertion } from "../utils/code_position_utils";

import { useUpToDateServerLocations } from "./useUpToDateServerLocations";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg } = useBackendConnection();

  const metaData = useMetaData();

  if (!(node && metaData && metaData.server_aware)) return null;

  const { language } = metaData;

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
  const serverLocations = useUpToDateServerLocations();

  if (!(current_app_info.mode === "MAIN" && serverLocations)) return null;

  const { outputIdKey = "outputId" } = serverOutputInfo;

  // I have no idea why I have to do this coercsian but for some reason this
  // keeps getting narrowed to never type for args unless I do it.
  const keyForOutput =
    typeof outputIdKey === "string"
      ? outputIdKey
      : (outputIdKey as PickKeyFn<typeof namedArgs>)(namedArgs);

  const outputId = namedArgs[keyForOutput as keyof typeof namedArgs];
  if (typeof outputId !== "string") return null;

  const existing_output_locations = serverLocations.output_positions[outputId];

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
            path: "SELECT-SERVER-CODE",
            payload: { positions: existing_output_locations },
          });

          toast("Highlighted output declaration in server");
        } else {
          const snippet_insertion_point = buildServerInsertion({
            server_position: serverLocations.server_fn,
            snippet: buildSnippetText({
              language,
              output_id: outputId,
              output_info: serverOutputInfo,
            }),
            language,
          });

          sendMsg({
            path: "INSERT-SNIPPET",
            payload: snippet_insertion_point,
          });
          toast("Inserted output binding in server");
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
  const serverLocations = useUpToDateServerLocations();

  if (!(current_app_info.mode === "MAIN" && serverLocations)) return null;

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

  const inputLocations = serverLocations.input_positions[inputId];

  if (!inputLocations) return null;

  return (
    <PopoverButton
      popoverContent={`Find uses of bound input (\`input$${inputId}\`) in app script`}
      use_markdown
      placement="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "SELECT-SERVER-CODE",
          payload: { positions: inputLocations },
        });

        toast("Highlighted uses of input variable in server");
      }}
    >
      Find in server
    </PopoverButton>
  );
}

function buildSnippetText({
  language,
  output_id,
  output_info: { renderScaffold },
}: {
  language: LanguageMode;
  output_id: string;
  output_info: OutputBindings;
}): string {
  return language === "PYTHON"
    ? generate_python_output_binding(output_id, renderScaffold)
    : generate_r_output_binding(output_id, renderScaffold);
}

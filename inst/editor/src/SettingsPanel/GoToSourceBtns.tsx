import type { MessageToBackend } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { toast } from "react-toastify";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { PopoverButton } from "../components/Inputs/PopoverButton";
import { generate_python_output_binding } from "../python-parsing";
import { generate_r_output_binding } from "../r-parsing";
import { useCurrentAppInfo } from "../state/app_info";
import { useMetaData } from "../state/metaData";
import type { OutputBindings } from "../ui-node-definitions/nodeInfoFactory";
import type { ShinyUiNode } from "../ui-node-definitions/ShinyUiNode";
import { getUiNodeInfo } from "../ui-node-definitions/uiNodeTypes";
import { buildServerInsertion } from "../utils/code_position_utils";

import { useUpToDateServerLocations } from "./useUpToDateServerLocations";

export function GoToSourceBtns({ node }: { node: ShinyUiNode | null }) {
  const { sendMsg } = useBackendConnection();

  const metaData = useMetaData();

  if (!(node && metaData && metaData.server_aware)) return null;

  const { language } = metaData;

  const nodeInfo = getUiNodeInfo(node.id);
  const boundIdInfo = nodeInfo.serverBindingInfo;

  const node_info = getUiNodeInfo(node.id)[
    language === "PYTHON" ? "py_info" : "r_info"
  ];

  if (boundIdInfo === null) return null;

  const output_bindings = (
    "output_bindings" in node_info ? node_info.output_bindings : null
  ) as OutputBindings | null;

  return (
    <div>
      {boundIdInfo.argType === "output" && output_bindings ? (
        <GoToOutputsBtn
          language={language}
          output_info={output_bindings}
          keyForOutput={boundIdInfo.argName}
          node={node}
          sendMsg={sendMsg}
        />
      ) : null}
      {boundIdInfo.argType === "input" ? (
        <GoToInputsBtn
          keyForInputId={boundIdInfo.argName}
          node={node}
          sendMsg={sendMsg}
        />
      ) : null}
    </div>
  );
}

function GoToOutputsBtn({
  language,
  keyForOutput,
  output_info,
  node: { namedArgs },
  sendMsg,
}: {
  language: LanguageMode;
  node: ShinyUiNode;
  keyForOutput: string;
  output_info: OutputBindings;
  sendMsg: (msg: MessageToBackend) => void;
}) {
  const serverLocations = useUpToDateServerLocations();
  const current_app_info = useCurrentAppInfo();

  if (!(current_app_info.mode === "MAIN" && serverLocations)) return null;

  const outputId = namedArgs[keyForOutput as keyof typeof namedArgs] as string;

  const existing_output_locations = serverLocations.output_positions[outputId];

  if (!existing_output_locations) return null;

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
              output_info,
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
  keyForInputId,
  node: { namedArgs },
  sendMsg,
}: {
  node: ShinyUiNode;
  keyForInputId: string;
  sendMsg: (msg: MessageToBackend) => void;
}) {
  const current_app_info = useCurrentAppInfo();
  const serverLocations = useUpToDateServerLocations();
  const inputId = namedArgs[keyForInputId];

  if (
    !(current_app_info.mode === "MAIN" && serverLocations) ||
    typeof inputId !== "string"
  )
    return null;

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

import type { MessageToBackend } from "communication-types";
import type { LanguageMode } from "communication-types/src/AppInfo";
import { toast } from "react-toastify";
import { getNodePositionAndIndent } from "treesitter-parsers";

import { useBackendConnection } from "../backendCommunication/useBackendMessageCallbacks";
import { PopoverButton } from "../components/Inputs/PopoverButton";
import { nodesToLocations } from "../parsing/nodesToLocations";
import { generatePythonOutputBinding } from "../python-parsing/generate_output_binding";
import { generate_r_output_binding } from "../r-parsing/generate_output_binding";
import { useMetaData } from "../state/metaData";
import type { OutputBindings } from "../ui-node-definitions/nodeInfoFactory";
import { buildServerInsertion } from "../utils/code_position_utils";

import type {
  ServerBindingInfo,
  ServerInputBindingInfo,
  ServerOutputBindingInfo,
} from "./useGetNodeServerBindingInfo";
import { useCurrentServerNodes } from "./useUpToDateServerLocations";

export function GoToSourceBtns({
  bindingInfo,
}: {
  bindingInfo: ServerBindingInfo;
}) {
  const metaData = useMetaData();
  const currentServerNodes = useCurrentServerNodes();
  const { sendMsg } = useBackendConnection();

  if (!currentServerNodes) return null;

  if (!(metaData && metaData.server_aware)) return null;

  return (
    <div>
      {bindingInfo.inputOrOutput === "output" ? (
        <GoToOutputsBtn
          info={bindingInfo}
          sendMsg={sendMsg}
          language={metaData.language}
        />
      ) : null}
      {bindingInfo.inputOrOutput === "input" ? (
        <GoToInputsBtn info={bindingInfo} sendMsg={sendMsg} />
      ) : null}
    </div>
  );
}

function GoToOutputsBtn({
  info: { currentId, nodes, renderScaffold, serverNode },
  sendMsg,
  language,
}: {
  info: ServerOutputBindingInfo;
  sendMsg: (msg: MessageToBackend) => void;
  language: LanguageMode;
}) {
  const existsInServer = Boolean(nodes);

  return (
    <PopoverButton
      popoverContent={
        existsInServer
          ? "Show output declaration in app script"
          : "Create output binding in app server"
      }
      placement="left"
      variant="regular"
      onClick={() => {
        if (nodes) {
          sendMsg({
            path: "SELECT-SERVER-CODE",
            payload: { positions: nodesToLocations(nodes) },
          });

          toast("Highlighted output declaration in server");
        } else {
          const snippet_insertion_point = buildServerInsertion({
            server_position: getNodePositionAndIndent(serverNode),
            snippet: buildSnippetText({
              language,
              output_id: currentId,
              renderScaffold,
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
      {existsInServer ? "Show in server" : "Generate server code"}
    </PopoverButton>
  );
}

function GoToInputsBtn({
  info: { nodes, currentId },
  sendMsg,
}: {
  info: ServerInputBindingInfo;
  sendMsg: (msg: MessageToBackend) => void;
}) {
  if (!nodes) return null;

  return (
    <PopoverButton
      popoverContent={`Find uses of bound input (\`input$${currentId}\`) in app script`}
      use_markdown
      placement="left"
      variant="regular"
      onClick={() => {
        sendMsg({
          path: "SELECT-SERVER-CODE",
          payload: { positions: nodesToLocations(nodes) },
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
  renderScaffold,
}: {
  language: LanguageMode;
  output_id: string;
  renderScaffold: OutputBindings["renderScaffold"];
}): string {
  return language === "PYTHON"
    ? generatePythonOutputBinding(output_id, renderScaffold)
    : generate_r_output_binding(output_id, renderScaffold);
}

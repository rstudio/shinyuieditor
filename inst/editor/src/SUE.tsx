import type { BackendConnection } from "communication-types";
import { makeMessageDispatcher } from "communication-types/src/BackendConnection";

import "./App.css";
import { setupStaticBackend } from "./backendCommunication/staticBackend";
import { BackendConnectionProvider } from "./backendCommunication/useBackendMessageCallbacks";
import { EditorContainer } from "./EditorContainer/EditorContainer";
import type { ShinyUiRootNode } from "./Shiny-Ui-Elements/uiNodeTypes";
import ReduxProvider from "./state/ReduxProvider";

export type SUE_Props = {
  backendDispatch?: BackendConnection;
  showMessages?: boolean;
  defaultTree?: ShinyUiRootNode;
};
export function SUE({
  showMessages = true,
  defaultTree,
  backendDispatch: { sendMsg, incomingMsgs, mode } = setupStaticBackend({
    messageDispatch: makeMessageDispatcher(),
    showMessages,
    defaultTree: defaultTree ?? "TEMPLATE_CHOOSER",
  }),
}: SUE_Props) {
  const dispatch: BackendConnection = showMessages
    ? {
        sendMsg,
        incomingMsgs: {
          subscribe: (on, callback) => {
            // eslint-disable-next-line no-console
            console.log(`backendMsgs.subscribe("${on}", ...)`);
            return incomingMsgs.subscribe(on, callback);
          },
        },
        mode,
      }
    : {
        sendMsg,
        incomingMsgs,
        mode,
      };

  return (
    <ReduxProvider>
      <BackendConnectionProvider {...dispatch}>
        <EditorContainer />
      </BackendConnectionProvider>
    </ReduxProvider>
  );
}

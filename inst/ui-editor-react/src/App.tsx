import "bootstrap/dist/css/bootstrap.css";

import "./App.css";

import type { BackendMessagePassers } from "backendCommunication/useBackendMessageCallbacks";
import { BackendCallbacksProvider } from "backendCommunication/useBackendMessageCallbacks";
import ReduxProvider from "state/ReduxProvider";
import { WebsocketProvider } from "websocket_hooks/useConnectToWebsocket";

import { EditorContainer } from "./EditorContainer/EditorContainer";

export function App(msgPassers: BackendMessagePassers) {
  return (
    <ReduxProvider>
      <BackendCallbacksProvider {...msgPassers}>
        <WebsocketProvider>
          <EditorContainer />
        </WebsocketProvider>
      </BackendCallbacksProvider>
    </ReduxProvider>
  );
}

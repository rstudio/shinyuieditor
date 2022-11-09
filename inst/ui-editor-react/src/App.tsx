import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import * as React from "react";

import { makeMessageDispatcher } from "backendCommunication/messageDispatcher";
import { BackendCallbacksProvider } from "backendCommunication/useBackendMessageCallbacks";
import ReduxProvider from "state/ReduxProvider";
import { WebsocketProvider } from "websocket_hooks/useConnectToWebsocket";

import { EditorContainer } from "./EditorContainer/EditorContainer";

export const App = () => {
  const backendMessageDispatch = makeMessageDispatcher();

  setTimeout(() => {
    backendMessageDispatch.dispatch({
      path: "APP-PREVIEW-READY",
      payload: "Address of app preview!",
    });
  }, 2000);
  return (
    <ReduxProvider>
      <BackendCallbacksProvider
        sendMsg={(x) =>
          console.log("App version, Sending message to backend", x)
        }
        backendMsgs={{
          subscribe: backendMessageDispatch.subscribe,
        }}
      >
        <WebsocketProvider>
          <EditorContainer />
        </WebsocketProvider>
      </BackendCallbacksProvider>
    </ReduxProvider>
  );
};

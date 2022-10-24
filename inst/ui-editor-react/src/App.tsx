import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import * as React from "react";

import ReduxProvider from "state/ReduxProvider";
import { WebsocketProvider } from "websocket_hooks/useConnectToWebsocket";

import { EditorContainer } from "./EditorContainer/EditorContainer";

export const App = () => {
  return (
    <ReduxProvider>
      <WebsocketProvider>
        <EditorContainer />
      </WebsocketProvider>
    </ReduxProvider>
  );
};

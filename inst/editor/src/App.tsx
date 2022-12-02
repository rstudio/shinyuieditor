import "bootstrap/dist/css/bootstrap.css";
import type { BackendConnection } from "communication-types";

import "./App.css";
import { BackendConnectionProvider } from "./backendCommunication/useBackendMessageCallbacks";
import { EditorContainer } from "./EditorContainer/EditorContainer";
import ReduxProvider from "./state/ReduxProvider";

export function App(msgPassers: BackendConnection) {
  return (
    <ReduxProvider>
      <BackendConnectionProvider {...msgPassers}>
        <EditorContainer />
      </BackendConnectionProvider>
    </ReduxProvider>
  );
}

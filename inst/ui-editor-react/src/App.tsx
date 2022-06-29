import "bootstrap/dist/css/bootstrap.css";

import "App.css";
import * as React from "react";

import ReduxProvider from "state/ReduxProvider";

import { EditorContainer } from "./EditorContainer";

export const App = () => {
  return (
    <ReduxProvider>
      <EditorContainer />
    </ReduxProvider>
  );
};

import "App.css";
import * as React from "react";

import { ReduxProvider } from "react-redux";

import { EditorContainer } from "./EditorContainer";
import { store } from "./state/store";

export const App = () => {
  return (
    <ReduxProvider store={store}>
      <EditorContainer />
    </ReduxProvider>
  );
};

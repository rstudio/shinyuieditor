import "App.css";
import * as React from "react";

import { Provider } from "react-redux";

import { EditorContainer } from "./EditorContainer";
import { store } from "./state/store";

export const App = () => {
  return (
    <Provider store={store}>
      <EditorContainer />
    </Provider>
  );
};

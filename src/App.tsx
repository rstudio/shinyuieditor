import "App.css";
import * as React from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";

import { EditorContainer } from "./EditorContainer";
import { store } from "./state/store";

// Create a client
const queryClient = new QueryClient();

export const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <EditorContainer />
      </QueryClientProvider>
    </Provider>
  );
};

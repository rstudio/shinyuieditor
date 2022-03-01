import "App.css";
import * as React from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { EditorContainer } from "./EditorContainer";

// Create a client
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EditorContainer />
    </QueryClientProvider>
  );
};

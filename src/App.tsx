/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { EditorContainer } from "./EditorContainer";
import { theme } from "./theme";

// Create a client
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <EditorContainer />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

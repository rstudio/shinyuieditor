/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { RecoilRoot } from "recoil";
import { LayoutEditor } from "./components/LayoutEditor";
import { TheHeader } from "./components/TheHeader";
import { theme } from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <div
          css={{
            height: "100vh",
            display: "grid",
            gridTemplateRows: "60px 1fr",
          }}
        >
          <TheHeader />
          <LayoutEditor />
        </div>
      </RecoilRoot>
    </ChakraProvider>
  );
};

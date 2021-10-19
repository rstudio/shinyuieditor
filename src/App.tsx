/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import * as React from "react";
import { RecoilRoot } from "recoil";
import { makeBoxShadow } from "utils/css-helpers";
import { LayoutEditor } from "views/LayoutEditor";
import { TheHeader } from "views/TheHeader";
import { theme } from "./theme";

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <div
          css={{
            "--shadow": makeBoxShadow({ height: 0.2 }),
            "--raised-shadow": makeBoxShadow({ height: 1 }),
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

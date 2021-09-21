/** @jsxImportSource @emotion/react */

import { ChakraProvider, theme } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import * as React from "react";
import { LayoutEditor } from "./components/LayoutEditor";
import { TheHeader } from "./components/TheHeader";

export const App = () => (
  <ChakraProvider theme={theme}>
    <Global
      styles={css`
        html,
        body {
          width: 100%;
          padding: 0;
          margin: 0;
          background: #edf2f7;
          font-weight: 400;
          color: #444;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
          --rstudio-blue: #75aadb;
          --rstudio-grey: #404040;
          --rstudio-white: #ffffff;
          --light-grey: #c4c4c4b2;
          --header-height: 60px;
          --shadow: 0.3px 1px 1.5px rgba(0, 0, 0, 0.11),
            0.9px 2.6px 3.4px rgba(0, 0, 0, 0.083),
            1.8px 5.3px 6.1px rgba(0, 0, 0, 0.075),
            3.7px 11px 11.2px rgba(0, 0, 0, 0.067),
            10px 30px 26px rgba(0, 0, 0, 0.051);
          --selected-shadow: inset 0px 0px 0px 3px var(--rstudio-grey);
          --selected-outline: 3px solid var(--rstudio-grey);
          --selection-color: tomato;
          --corner-radius: 5px;
          --unit-input-width: 135px;
          --card-header-height: 35px;
        }

        h1,
        h2,
        h3 {
          color: var(--rstudio-grey);
          font-weight: 300;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
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
  </ChakraProvider>
);

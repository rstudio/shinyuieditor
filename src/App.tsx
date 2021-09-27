/** @jsxImportSource @emotion/react */
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { css, Global } from "@emotion/react";
import * as React from "react";
import { RecoilRoot } from "recoil";
import { LayoutEditor } from "./components/LayoutEditor";
import { TheHeader } from "./components/TheHeader";

const theme = extendTheme({
  styles: {
    colors: {
      "rstudio-blue": "green",
    },
    global: {
      // styles for the `body`
      body: {
        width: "100%",
        bg: "#edf2f7",
        fontWeight: "400",
        fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`,
        color: "black",
      },
    },
  },
});

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Global styles={globalStyles} />
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

const globalStyles = css`
  html,
  body {
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
    --unit-input-width: 145px;
    --card-header-height: 35px;
  }

  .disable-text-selection * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently
                          supported by Chrome, Edge, Opera and Firefox */
  }
  * {
    box-sizing: border-box;
  }
`;

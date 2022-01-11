/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { makeBoxShadow } from "utils/css-helpers";
import { EditorContainer } from "./EditorContainer";
import { theme } from "./theme";

// Create a client
const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Container>
          <HeaderBar>
            <div className="left-side">
              <h1>Shiny Visual Editor</h1>
              <img src={rstudioLogo} alt="RStudio Logo" />
              <img
                src={shinyLogo}
                css={{ backgroundColor: "var(--rstudio-blue, pink)" }}
                alt="Shiny Logo"
              />
            </div>
            {/* <HistoryNav /> */}
          </HeaderBar>
          <EditorContainer />
        </Container>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

const Container = styled.div({
  "--shadow": makeBoxShadow({ height: 0.2 }),
  "--raised-shadow": makeBoxShadow({ height: 1 }),
  height: "100vh",
  width: "100%",
  backgroundColor: "var(--bg-color, #edf2f7)",
  display: "grid",
  gridTemplateRows: "60px 1fr",
});

const HeaderBar = styled.header({
  padding: "0.25rem 1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  boxShadow: "var(--shadow)",
  background: "var(--rstudio-white, white)",
  "& h1": {
    fontSize: "1.75rem",
  },
  "& > div.left-side": {
    display: "flex",
    alignItems: "center",
    height: "100%",
    "& > img": {
      display: "inline-block",
      margin: "0 1rem",
      height: "100%",
      borderRadius: "1rem",
      padding: "0.5rem",
    },
  },
});

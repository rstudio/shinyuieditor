/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import rstudioLogo from "assets/RStudio-Logo.svg";
import shinyLogo from "assets/Shiny-Logo.png";
import GridApp, { Panels } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import { theme } from "./theme";

const startingLayout = {
  // prettier-ignore
  areas: [
    ["title", "title"],
    ["settings", "plot"],
    ["footer", "footer"],
  ],
  rowSizes: ["100px", "1fr", "80px"],
  colSizes: ["250px", "1fr"],
};

const startingPanels = {
  title: {
    name: "titlePanel",
    settings: { title: "My App" },
  },
  settings: {
    name: "sliderInput",
    settings: { name: "My slider!" },
  },
  plot: {
    name: "plotOutput",
    settings: { name: "My Plot!" },
  },
} as Panels;

export const App = () => {
  return (
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
        <EditorHolder>
          <GridApp layout={startingLayout} panels={startingPanels} />
        </EditorHolder>
      </Container>
    </ChakraProvider>
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

const EditorHolder = styled.div({
  padding: "2rem",
  height: "100%",
  width: "100%",
  position: "relative",
});

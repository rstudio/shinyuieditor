/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import styled from "@emotion/styled";
import GridApp, { Panels } from "components/shiny-ui/GridApp";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import { TheHeader } from "views/TheHeader";
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
    componentName: "titlePanel",
    componentProps: { title: "My App" },
  },
  settings: {
    componentName: "sliderInput",
    componentProps: { name: "My slider!" },
  },
  plot: {
    componentName: "plotOutput",
    componentProps: { name: "My Plot!" },
  },
} as Panels;

export const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <div
        css={{
          "--shadow": makeBoxShadow({ height: 0.2 }),
          "--raised-shadow": makeBoxShadow({ height: 1 }),
          height: "100vh",
          width: "100%",
          backgroundColor: "var(--bg-color, #edf2f7)",
          display: "grid",
          gridTemplateRows: "60px 1fr",
        }}
      >
        <TheHeader />
        <AppHolder >
          <GridApp
            layout={startingLayout}
            panels={startingPanels}
          />
        </AppHolder>
      </div>
    </ChakraProvider>
  );
};

const AppHolder = styled.div({
  padding: "2rem",
  height: "100%",
  width: "100%",
  position: "relative",
})
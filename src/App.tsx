/** @jsxImportSource @emotion/react */
import { ChakraProvider } from "@chakra-ui/react";
import GridApp from "components/shiny-ui/GridApp";
import * as React from "react";
import { RecoilRoot } from "recoil";
import { makeBoxShadow } from "utils/css-helpers";
import { LayoutEditor } from "views/LayoutEditor";
import { TheHeader } from "views/TheHeader";
import { theme } from "./theme";

export const App = () => {
  const App_Content =
    process.env.REACT_APP_VERSION === "GRIDAPP" ? (
      <GridApp
        layout={{
          // prettier-ignore
          areas: [
            ["title",    "title" ],
            ["settings", "plot"  ],
            ["footer",   "footer"],
          ],
          rowSizes: ["100px", "1fr", "30px"],
          colSizes: ["250px", "1fr"],
        }}
        panels={{
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
        }}
      />
    ) : (
      <LayoutEditor />
    );

  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
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
          {App_Content}
        </div>
      </RecoilRoot>
    </ChakraProvider>
  );
};

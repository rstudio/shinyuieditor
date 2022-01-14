import styled from "@emotion/styled";
import GridApp, { Panels } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import * as React from "react";
import { useQuery } from "react-query";
import { makeBoxShadow } from "utils/css-helpers";
import { TemplatedGridProps } from "utils/gridTemplates/types";
import { Header } from "./Header";

type InitialState = {
  elements: Panels;
  layout: { type: "gridlayout"; options: TemplatedGridProps };
};

async function getInitialState(): Promise<InitialState> {
  const response = await fetch("app-please", { method: "GET" });

  if (!response.ok) {
    console.error(`HTTP error! status: ${response.status}`);
    return backupState;
  }

  return await response.json();
}

export function EditorContainer() {
  const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error || !data) {
    return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  }
  const initialLayout: TemplatedGridProps = data.layout.options;
  const initialPanels: Panels = data.elements;
  console.log(data);

  return (
    <Container>
      <Header />
      <EditorHolderContainer>
        <GridApp layout={initialLayout} panels={initialPanels} />
      </EditorHolderContainer>
    </Container>
  );
}

const backupState: InitialState = {
  layout: {
    type: "gridlayout",
    options: {
      rowSizes: ["120px", "1fr", "100px"],
      colSizes: ["250px", "1fr"],
      gapSize: "2rem",
      areas: [
        ["header", "header"],
        ["sidebar", "plot"],
        ["footer", "footer"],
      ],
    },
  },
  elements: {
    header: {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        title: "Header from backup state",
      },
    },
    plot: {
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "distPlot",
      },
    },
    sidebar: {
      uiName: "shiny::sliderInput",
      uiArguments: {
        inputId: "numBins",
        min: "5",
        max: "10",
        value: "7",
      },
    },
    footer: {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        title: "My app's footer",
      },
    },
  },
};

const EditorHolderContainer = styled.div({
  padding: "2rem",
  height: "100%",
  width: "100%",
  position: "relative",
});

const Container = styled.div({
  "--shadow": makeBoxShadow({ height: 0.2 }),
  "--raised-shadow": makeBoxShadow({ height: 1 }),
  height: "100vh",
  width: "100%",
  backgroundColor: "var(--bg-color, #edf2f7)",
  display: "grid",
  gridTemplateRows: "60px 1fr",
});

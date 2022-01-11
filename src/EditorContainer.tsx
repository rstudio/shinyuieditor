import styled from "@emotion/styled";
import GridApp, { Panels } from "components/Shiny-Ui-Elements/Layouts/GridApp";
import * as React from "react";
import { useQuery } from "react-query";
import { TemplatedGridProps } from "utils/gridTemplates/types";

async function getInitialState() {
  const response = await fetch("app-please", { method: "GET" });

  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

  return await response.json();
}

export function EditorContainer() {
  const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error) {
    return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  }

  const initialLayout = data.layout.options as TemplatedGridProps;
  const initialPanels = data.elements as Panels;

  return (
    <EditorHolderContainer>
      <GridApp layout={initialLayout} panels={initialPanels} />
    </EditorHolderContainer>
  );
}

const EditorHolderContainer = styled.div({
  padding: "2rem",
  height: "100%",
  width: "100%",
  position: "relative",
});

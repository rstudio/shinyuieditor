import styled from "@emotion/styled";
import GridApp from "components/Shiny-Ui-Elements/Layouts/GridApp";
import * as React from "react";
import { useQuery } from "react-query";
import { makeBoxShadow } from "utils/css-helpers";
import { getInitialState } from "./getInitialState";
import { Header } from "./Header";

export function EditorContainer() {
  const { isLoading, error, data } = useQuery("initial-state", getInitialState);

  if (isLoading) {
    return <h3>Loading initial state from server</h3>;
  }

  if (error || !data) {
    return <h3 style={{ color: "orangered" }}>Error with server request</h3>;
  }

  return (
    <Container>
      <Header />
      <EditorHolderContainer>
        <GridApp layout={data.layout.options} panels={data.elements} />
      </EditorHolderContainer>
    </Container>
  );
}

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

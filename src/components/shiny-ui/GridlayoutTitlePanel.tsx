import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";

export interface GridlayoutTitlePanelProps {
  title: string;
  area?: string;
}

function GridlayoutTitlePanel({ title, area }: GridlayoutTitlePanelProps) {
  return (
    <TitlePanel style={{ gridArea: area }}>
      <h2>{title}</h2>
    </TitlePanel>
  );
}

const TitlePanel = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  alignItems: "center",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default GridlayoutTitlePanel;

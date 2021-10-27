/** @jsxImportSource @emotion/react */
import css from "@emotion/css";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";

interface GridlayoutTitlePanelProps {
  title: string;
  area: string;
}

function GridlayoutTitlePanel({ title, area }: GridlayoutTitlePanelProps) {
  return (
    <div style={{ gridArea: area }} css={titlePanelStyles}>
      <h2>{title}</h2>
    </div>
  );
}

const titlePanelStyles = css({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default GridlayoutTitlePanel;

import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import { UiNodeComponent } from "../uiComponentAndSettings";

export interface GridlayoutTitlePanelProps {
  title: string;
  area?: string;
}

const GridlayoutTitlePanel: UiNodeComponent<GridlayoutTitlePanelProps> = ({
  title = "Default app title",
  children,
  ...passthroughProps
}) => {
  return (
    <TitlePanel
      className={"gridlayout-titlePanel"}
      aria-label={"gridlayout-titlePanel"}
      {...passthroughProps}
    >
      <h1>{title}</h1>
      {children}
    </TitlePanel>
  );
};

const TitlePanel = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "1rem",
  boxShadow: makeBoxShadow({ height: 0.2 }),
  h1: {
    fontSize: "2rem",
  },
});

export default GridlayoutTitlePanel;

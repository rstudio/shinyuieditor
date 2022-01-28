import styled from "@emotion/styled";
import * as React from "react";
import { UiNodeComponent } from "../uiComponentAndSettings";

export interface GridlayoutTitlePanelProps {
  title: string;
  area?: string;
}

const GridlayoutTitlePanel: UiNodeComponent<GridlayoutTitlePanelProps> = ({
  uiArguments: { title, area },
  children,
  ...passthroughProps
}) => {
  return (
    <TitlePanel
      style={{ gridArea: area }}
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
  backgroundColor: "var(--rstudio-white)",
  display: "grid",
  alignItems: "center",
  width: "100%",
  height: "100%",
  padding: "1rem",
  h1: {
    fontSize: "2rem",
  },
});

export default GridlayoutTitlePanel;

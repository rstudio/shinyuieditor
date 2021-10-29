import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import ShinyUiComponent, { UiComponentNames } from "./ShinyUiComponent";

interface UiPanelProps {
  area: string;
  componentName?: UiComponentNames;
  componentProps?: Object;
}

function UiPanel({ area, componentName, componentProps = {} }: UiPanelProps) {
  return (
    <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
      {componentName ? (
        <ShinyUiComponent name={componentName} props={componentProps} />
      ) : (
        ChooseElementMessage
      )}
    </UiPanelHolder>
  );
}

const UiPanelHolder = styled.div({
  outline: "1px solid var(--rstudio-grey)",
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  width: "100%",
  height: "100%",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

const ChooseElementMessage = (
  <div style={{ padding: "1rem" }}>
    <h2>Choose Shiny UI element</h2>
  </div>
);

export default UiPanel;

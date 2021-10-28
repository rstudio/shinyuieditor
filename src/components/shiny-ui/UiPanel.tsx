import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import allUiOutputs, { UiComponentNames } from "./allUiOutputs";

interface UiPanelProps {
  area: string;
  element?: UiComponentNames;
  // elementProps?:
}

function UiPanel({ area, element }: UiPanelProps) {
  let uiElement;
  let UiComponent;
  let defaultProps;
  if (element) {
    switch (element) {
      case "plotOutput":
        UiComponent = allUiOutputs.plotOutput.component;
        defaultProps = allUiOutputs.plotOutput.defaultProps;
        uiElement = <UiComponent {...defaultProps} />;
        break;
      case "sliderInput":
        UiComponent = allUiOutputs.sliderInput.component;
        defaultProps = allUiOutputs.sliderInput.defaultProps;
        uiElement = <UiComponent {...defaultProps} />;
        break;
      case "titlePanel":
        UiComponent = allUiOutputs.titlePanel.component;
        defaultProps = allUiOutputs.titlePanel.defaultProps;
        uiElement = <UiComponent {...defaultProps} />;
        break;
      default:
        throw new Error("That's an unimplemented UI component");
    }
  }
  const content = uiElement ? uiElement : <h2>Choose Ui element</h2>;
  return (
    <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
      {content}
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

export default UiPanel;

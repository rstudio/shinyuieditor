import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import CreateUiElement, { UiComponentNames } from "./CreateUiElement";

interface UiPanelProps {
  area: string;
  element?: UiComponentNames;
  extraProps?: Object;
}

function UiPanel({ area, element, extraProps = {} }: UiPanelProps) {
  return (
    <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
      {element ? (
        CreateUiElement(element, extraProps)
      ) : (
        <h2>Choose Ui element</h2>
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

export default UiPanel;

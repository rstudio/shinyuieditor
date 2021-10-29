import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import ShinyUiComponent, { UiComponentDefinition } from "./ShinyUiComponent";

function UiPanel({
  area,
  componentDefinition,
}: {
  area: string;
  componentDefinition: UiComponentDefinition;
}) {
  return (
    <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
      {componentDefinition ? (
        <ShinyUiComponent {...componentDefinition} />
      ) : (
        <div style={{ padding: "1rem" }}>
          <h2>Choose Shiny UI element</h2>
        </div>
      )}
    </UiPanelHolder>
  );
}

const UiPanelHolder = styled.div({
  display: "grid",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  width: "100%",
  height: "100%",
  placeItems: "center",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

export default UiPanel;

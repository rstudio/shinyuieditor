import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import GridlayoutTitlePanel, {
  GridlayoutTitlePanelProps,
} from "./GridlayoutTitlePanel";
import ShinyPlotOutput, { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import ShinySliderInput, { ShinySliderInputProps } from "./ShinySliderInput";

export type UiComponentDefinition =
  | {
      componentName: "plotOutput";
      componentProps: ShinyPlotOutputProps;
    }
  | {
      componentName: "sliderInput";
      componentProps: ShinySliderInputProps;
    }
  | {
      componentName: "titlePanel";
      componentProps: GridlayoutTitlePanelProps;
    }
  | null;

const uiComponents = {
  plotOutput: ShinyPlotOutput,
  sliderInput: ShinySliderInput,
  titlePanel: GridlayoutTitlePanel,
};

function UiPanel({
  area,
  componentDefinition,
}: {
  area: string;
  componentDefinition: UiComponentDefinition;
}) {
  let content;

  if (componentDefinition) {
    const { componentName, componentProps } = componentDefinition;
    const UiComponent = uiComponents[componentName];
    content = <UiComponent {...componentProps} />;
  } else {
    content = (
      <div style={{ padding: "1rem" }}>
        <h2>Choose Shiny UI element</h2>
      </div>
    );
  }

  return (
    <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
      {content}
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

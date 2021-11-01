import styled from "@emotion/styled";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import GridlayoutTitlePanel, {
  GridlayoutTitlePanelProps,
} from "./GridlayoutTitlePanel";
import ShinyPlotOutput, { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import ShinySliderInput, { ShinySliderInputProps } from "./ShinySliderInput";
import { FiSettings } from "react-icons/fi";
import { IconButton } from "@chakra-ui/button";

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
      <SettingsButtonHolder>
        <button aria-label="Open settings for element">
          <FiSettings />
        </button>
      </SettingsButtonHolder>
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
  position: "relative",
  boxShadow: makeBoxShadow({ height: 0.2 }),
});

const SettingsButtonHolder = styled.button({
  position: "absolute",
  right: "5px",
  top: "5px",
  opacity: 0.5,
  display: "grid",
  placeContent: "center",
});

export default UiPanel;

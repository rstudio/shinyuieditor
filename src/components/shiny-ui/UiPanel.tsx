import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import styled from "@emotion/styled";
import * as React from "react";
import { FiSettings } from "react-icons/fi";
import { makeBoxShadow } from "utils/css-helpers";
import GridlayoutTitlePanel, {
  GridlayoutTitlePanelProps,
} from "./GridlayoutTitlePanel";
import ShinyPlotOutput, { ShinyPlotOutputProps } from "./ShinyPlotOutput";
import ShinySliderInput, { ShinySliderInputProps } from "./ShinySliderInput";
import ShinySliderInputSettings from "./ShinySliderInput/SettingsPanel";

import { EmptySettings } from "./UiPanelSettingsProps";

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

const uiComponentSettings = {
  plotOutput: EmptySettings,
  sliderInput: ShinySliderInputSettings,
  titlePanel: EmptySettings,
};

function UiPanel({
  area,
  componentDefinition,
}: {
  area: string;
  componentDefinition: UiComponentDefinition;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  if (!componentDefinition) {
    return (
      <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
        <div style={{ padding: "1rem" }}>
          <h2>Choose Shiny UI element</h2>
        </div>
      </UiPanelHolder>
    );
  }

  const { componentName, componentProps } = componentDefinition;
  const UiComponent = uiComponents[componentName];
  const ComponentSettings = uiComponentSettings[componentName];

  return (
    <UiPanelHolder className="ui-panel-holder" style={{ gridArea: area }}>
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <SettingsButtonHolder aria-label="Open settings for element">
            <FiSettings />
          </SettingsButtonHolder>
        </PopoverTrigger>
        <PopoverContent aria-label="Deletion conflict message">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>Settings panel</PopoverHeader>
          <PopoverBody>
            <ComponentSettings
              startingSettings={componentProps}
              onUpdate={(newSettings) => console.log(newSettings)}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <UiComponent {...componentProps} />
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

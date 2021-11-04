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
import {
  ShinyUiComponent,
  ShinyUiElementNames,
  ShinyUiElementProps,
  ShinyUiSettingsComponent,
} from "components/shiny-ui/componentTypes";
import GridlayoutTitlePanel from "components/shiny-ui/GridlayoutTitlePanel";
import GridlayoutTitlePanelSettings from "components/shiny-ui/GridlayoutTitlePanel/SettingsPanel";
import ShinyPlotOutput from "components/shiny-ui/ShinyPlotOutput";
import ShinyPlotOutputSettings from "components/shiny-ui/ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "components/shiny-ui/ShinySliderInput";
import ShinySliderInputSettings from "components/shiny-ui/ShinySliderInput/SettingsPanel";

const uiComponentAndSettings = {
  plotOutput: {
    UiComponent: ShinyPlotOutput,
    SettingsComponent: ShinyPlotOutputSettings,
  },
  sliderInput: {
    UiComponent: ShinySliderInput,
    SettingsComponent: ShinySliderInputSettings,
  },
  titlePanel: {
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
  },
};

function UiPanel<ElName extends ShinyUiElementNames>({
  area,
  componentDefinition,
  onUpdate,
}: {
  area: string;
  componentDefinition: {
    componentName: ElName;
    componentProps: ShinyUiElementProps[ElName];
  };
  onUpdate?: (newProps: ShinyUiElementProps[ElName]) => void;
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

  // Make sure TS knows these are compatible types
  const components = uiComponentAndSettings[componentName];
  const UiComponent = components.UiComponent as ShinyUiComponent<
    typeof componentProps
  >;
  const SettingsComponent = components.SettingsComponent as ShinyUiSettingsComponent<
    typeof componentProps
  >;

  return (
    <UiPanelHolder
      aria-label={`${area} panel`}
      className="ui-panel-holder"
      style={{ gridArea: area }}
    >
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <SettingsButtonHolder aria-label="Open settings dialog">
            <FiSettings />
          </SettingsButtonHolder>
        </PopoverTrigger>
        <PopoverContent aria-label={`Settings for ${componentName}`}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <code>{componentName}</code> settings
          </PopoverHeader>
          <PopoverBody>
            <SettingsComponent
              startingSettings={componentProps}
              onUpdate={(newSettings) => {
                onUpdate?.(newSettings);
                closePopover();
              }}
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

import { IconButton } from "@chakra-ui/button";
import {
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/popover";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
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
import * as React from "react";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import { makeBoxShadow } from "utils/css-helpers";

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
      <ActionButton action="Delete" />
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <ActionButton action="Settings" />
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

function ActionButton({ action }: { action: "Settings" | "Delete" }) {
  const inset = "2px";
  const settingsStyle = css({
    position: "absolute",
    top: inset,
    opacity: 0.5,
  });

  const Icon = action === "Settings" ? <SettingsIcon /> : <TrashIcon />;
  const label = action === "Settings" ? "Open settings dialog" : "Delete panel";
  const horizontalAlign = { [action === "Settings" ? "right" : "left"]: inset };
  return (
    <IconButton
      size="sm"
      icon={Icon}
      style={horizontalAlign}
      aria-label={label}
      css={settingsStyle}
    />
  );
}

export default UiPanel;

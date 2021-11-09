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
import type {
  ShinyUiComponent,
  ShinyUiComponentAndSettings,
  ShinyUiNames,
  ShinyUiPropsByName,
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
import { UiPanelHolder } from "../UiPanelHolder";

const uiComponentAndSettings: ShinyUiComponentAndSettings = {
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

function UiPanel<ElName extends ShinyUiNames>({
  area,
  componentDefinition,
  onUpdate,
  onDelete,
}: {
  area: string;
  componentDefinition: {
    componentName: ElName;
    componentProps: ShinyUiPropsByName[ElName];
  };
  onUpdate?: (newProps: ShinyUiPropsByName[ElName]) => void;
  onDelete?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  if (!componentDefinition) {
    return (
      <UiPanelHolder className="ui-panel-holder" area={area}>
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
      area={area}
    >
      <ActionButton action="Delete" onClick={onDelete} />
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

function ActionButton({
  action,
  onClick,
}: {
  action: "Settings" | "Delete";
  onClick?: () => void;
}) {
  const settingsStyle = css({
    position: "absolute",
    top: 0,
    opacity: 0.5,
  });

  const iconSettings =
    action === "Settings"
      ? {
          "aria-label": "Open settings dialog",
          icon: <SettingsIcon />,
          style: { right: 0 },
        }
      : {
          "aria-label": "Delete panel",
          icon: <TrashIcon />,
          style: { left: 0 },
        };

  return (
    <IconButton
      size="sm"
      variant="ghost"
      {...iconSettings}
      css={settingsStyle}
      onClick={onClick ? () => onClick() : undefined}
    />
  );
}

export default UiPanel;

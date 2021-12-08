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
  ShinyUiSettingsFields,
} from "components/shiny-ui/componentTypes";
import GridlayoutTitlePanel from "components/shiny-ui/GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettingsOptions } from "components/shiny-ui/GridlayoutTitlePanel/SettingsPanel";
import ShinyPlotOutput from "components/shiny-ui/ShinyPlotOutput";
import { ShinyPlotOutputSettingsOptions } from "components/shiny-ui/ShinyPlotOutput/SettingsPanel";
import ShinySliderInput from "components/shiny-ui/ShinySliderInput";
import { ShinySliderInputSettingsOptions } from "components/shiny-ui/ShinySliderInput/SettingsPanel";
import * as React from "react";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import UiSettingsComponent from "../GridApp/SettingsPanelPopover";
import { UiPanelHolder } from "../UiPanelHolder";

export const uiComponentAndSettings: ShinyUiComponentAndSettings = {
  plotOutput: {
    UiComponent: ShinyPlotOutput,
    SettingsComponent: ShinyPlotOutputSettingsOptions,
  },
  sliderInput: {
    UiComponent: ShinySliderInput,
    SettingsComponent: ShinySliderInputSettingsOptions,
  },
  titlePanel: {
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettingsOptions,
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

  const { componentName, componentProps } = componentDefinition;

  // Make sure TS knows these are compatible types
  const components = uiComponentAndSettings[componentName];
  const UiComponent = components.UiComponent as ShinyUiComponent<
    typeof componentProps
  >;

  return (
    <UiPanelHolder
      aria-label={`${area} panel`}
      className="ui-panel-holder"
      area={area}
    >
      <IconButton
        aria-label="Delete panel"
        size="sm"
        variant="ghost"
        icon={<TrashIcon />}
        style={{ left: 0 }}
        css={actionButtonStyles}
        onClick={onDelete}
      />
      <Popover
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
        closeOnBlur={true}
      >
        <PopoverTrigger>
          <IconButton
            size="sm"
            variant="ghost"
            aria-label="Open settings dialog"
            icon={<SettingsIcon />}
            style={{ right: 0 }}
            css={actionButtonStyles}
          />
        </PopoverTrigger>
        <PopoverContent aria-label={`Settings for ${componentName}`}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <code>{componentName}</code> settings
          </PopoverHeader>
          <PopoverBody>
            <UiSettingsComponent
              SettingsInputs={
                components.SettingsComponent as ShinyUiSettingsFields<
                  typeof componentProps
                >
              }
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

const actionButtonStyles = css({
  position: "absolute",
  top: 0,
  opacity: 0.5,
});

export default UiPanel;

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
import type {
  ShinyUiArgumentsByName,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import {
  FiSettings as SettingsIcon,
  FiTrash as TrashIcon,
} from "react-icons/fi";
import { makeBoxShadow } from "utils/css-helpers";
import { UiComponent } from "./UiComponent";
import { UiSettingsComponent } from "./UiSettingsComponent";

export function UiPanel<ElName extends ShinyUiNames>({
  area,
  componentDefinition,
  onUpdate,
  onDelete,
}: {
  area: string;
  componentDefinition: {
    uiName: ElName;
    uiArguments: ShinyUiArgumentsByName[ElName];
  };
  onUpdate?: (newProps: ShinyUiArgumentsByName[ElName]) => void;
  onDelete?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const openPopover = () => setIsOpen(!isOpen);
  const closePopover = () => setIsOpen(false);

  const [elementHTML, setElementHTML] = React.useState<string | null>(null);
  const { uiName: name, uiArguments: settings } = componentDefinition;

  return (
    <UiPanelHolder
      aria-label={`${area} panel with ${name}`}
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
        <PopoverContent aria-label={`Settings for ${name}`}>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>
            <code>{name}</code> settings
          </PopoverHeader>
          <PopoverBody>
            <UiSettingsComponent
              uiName={name}
              settings={settings}
              onChange={(newSettings) => {
                onUpdate?.(newSettings);
                closePopover();
              }}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      {elementHTML ? (
        <div>Here's the actually generated element from R</div>
      ) : (
        <UiComponent uiName={name} settings={settings} />
      )}
    </UiPanelHolder>
  );
}

export const UiPanelHolder = styled.div(({ area }: { area?: string }) => ({
  display: "grid",
  gridArea: area,
  gridTemplateRows: "1fr",
  gridTemplateColumns: "1fr",
  width: "100%",
  height: "100%",
  placeItems: "center",
  position: "relative",
  backgroundColor: "var(--rstudio-white, forestgreen)",
  boxShadow: makeBoxShadow({ height: 0.2 }),
}));

export const actionButtonStyles = css({
  position: "absolute",
  top: 0,
  opacity: 0.5,
});

export default UiPanel;

import { IconButton } from "@chakra-ui/button";
import styled from "@emotion/styled";
import type {
  ShinyUiArgumentsByName,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { FiTrash as TrashIcon } from "react-icons/fi";
import { makeBoxShadow } from "utils/css-helpers";
import { SettingsPopover } from "../../SettingsPopover";
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
        style={{ left: 0, position: "absolute", top: 0, opacity: 0.5 }}
        onClick={onDelete}
      />
      <SettingsPopover
        name={name}
        isOpen={isOpen}
        onClose={closePopover}
        onOpen={openPopover}
      >
        <UiSettingsComponent
          uiName={name}
          settings={settings}
          onChange={(newSettings) => {
            onUpdate?.(newSettings);
            closePopover();
          }}
        />
      </SettingsPopover>

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

export default UiPanel;

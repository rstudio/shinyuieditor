import styled from "@emotion/styled";
import type {
  ShinyUiArgumentsByName,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
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
  const [elementHTML, setElementHTML] = React.useState<string | null>(null);
  const { uiName: name, uiArguments: settings } = componentDefinition;

  return (
    <UiPanelHolder
      aria-label={`${area} panel with ${name}`}
      className="ui-panel-holder"
      area={area}
    >
      <SettingsPopover
        name={name}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={onDelete}
      >
        <UiSettingsComponent
          uiName={name}
          settings={settings}
          onChange={(newSettings) => {
            onUpdate?.(newSettings);
            setIsOpen(false);
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

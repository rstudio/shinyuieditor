import styled from "@emotion/styled";
import type {
  ShinyUiArgumentsByName,
  ShinyUiNameAndArguments,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import { SettingsPopover } from "../../SettingsPopover";
import { UiComponent } from "./UiComponent";
import { UiSettingsComponent } from "./UiSettingsComponent";

export function UiPanel({
  area,
  uiDef,
  onUpdate,
  onDelete,
}: {
  area: string;
  uiDef: ShinyUiNameAndArguments;
  onUpdate?: (newProps: object) => void;
  onDelete?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <UiPanelHolder
      aria-label={`${area} panel with ${uiDef.uiName}`}
      className="ui-panel-holder"
      area={area}
    >
      <SettingsPopover
        name={uiDef.uiName}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onDelete={onDelete}
      >
        <UiSettingsComponent
          {...uiDef}
          onChange={(newSettings) => {
            onUpdate?.(newSettings);
            setIsOpen(false);
          }}
        />
      </SettingsPopover>

      <UiComponent {...uiDef} />
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

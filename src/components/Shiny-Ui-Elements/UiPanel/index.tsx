import styled from "@emotion/styled";
import type { ShinyUiNameAndArguments } from "components/Shiny-Ui-Elements/componentTypes";
import * as React from "react";
import { makeBoxShadow } from "utils/css-helpers";
import { UiElement } from "../UiElement";

export function UiPanel(props: {
  area: string;
  uiDef: ShinyUiNameAndArguments;
  onUpdate?: (newProps: object) => void;
  onDelete?: () => void;
}) {
  const { area, uiDef } = props;

  return (
    <UiPanelHolder
      aria-label={`${area} panel with ${uiDef.uiName}`}
      className="ui-panel-holder"
      area={area}
    >
      <UiElement {...props} />
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

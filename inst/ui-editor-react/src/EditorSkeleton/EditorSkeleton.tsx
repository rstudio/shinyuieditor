import * as React from "react";

import SvgShinyLogo from "components/Icons/ShinyLogo";
import { UndoRedoButtons } from "components/UndoRedoButtons/UndoRedoButtons";

import { AppTour } from "../AppTour";

import "./styles.scss";
import { LostConnectionPopup } from "./LostConnectionPopup";

export const PROPERTIES_PANEL_WIDTH_PX = 236;

const sizes_inline_styles = {
  "--properties-panel-width": `${PROPERTIES_PANEL_WIDTH_PX}px`,
} as React.CSSProperties;

export function EditorSkeleton({
  main,
  properties,
  preview,
  left,
}: {
  main: React.ReactNode;
  properties?: React.ReactNode;
  preview?: React.ReactNode;
  left?: React.ReactNode;
}) {
  return (
    <>
      <div className="EditorSkeleton" style={sizes_inline_styles}>
        <header>
          <SvgShinyLogo className="shiny-logo" />
          <h1 className="app-title">Shiny UI Editor</h1>
          <div className="right">
            <AppTour />
            <div className="divider" />
            <UndoRedoButtons />
          </div>
        </header>
        <div className="elements-panel panel">{left}</div>
        <div className="app-view">{main}</div>
        <div className="properties-panel panel">{properties}</div>
        <div className="app-preview panel">{preview}</div>
      </div>
      <LostConnectionPopup />
    </>
  );
}

export function PanelHeader({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <h3 className={className + " panel-title"}>{children}</h3>;
}

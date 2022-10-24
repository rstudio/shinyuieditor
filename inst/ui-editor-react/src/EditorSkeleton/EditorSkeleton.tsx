import * as React from "react";

import "./styles.scss";

export const PROPERTIES_PANEL_WIDTH_PX = 236;

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
      <div className="EditorSkeleton">
        <div className="elements-panel panel">{left}</div>
        <div className="app-view">{main}</div>
        <div className="properties-panel panel">{properties}</div>
        <div className="app-preview panel">{preview}</div>
      </div>
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

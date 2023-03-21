import * as React from "react";

import { mergeClasses } from "../utils/mergeClasses";

import styles from "./EditorSkeleton.module.css";

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
      <div className={styles.EditorSkeleton}>
        <div className={mergeClasses(styles.elements_panel, styles.panel)}>
          {left}
        </div>
        <div className={styles.app_view}>{main}</div>
        <div className={mergeClasses(styles.properties_panel, styles.panel)}>
          {properties}
        </div>
        <div className={mergeClasses(styles.app_preview, styles.panel)}>
          {preview}
        </div>
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
  return (
    <h3 className={mergeClasses(className, styles.panel_title)}>{children}</h3>
  );
}

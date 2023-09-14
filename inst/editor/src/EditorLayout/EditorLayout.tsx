import * as React from "react";

import { mergeClasses } from "../utils/mergeClasses";

import styles from "./EditorLayout.module.css";

export function EditorLayout({
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
        <div
          className={mergeClasses(styles.elements_panel, styles.panel)}
          aria-label="Elements Panel"
        >
          {left}
        </div>
        <div
          className="app-view bg-rstudio-white p-8 h-full relative row-span-2 overflow-auto"
          aria-label="App Skeleton"
        >
          {main}
        </div>
        <div
          className={mergeClasses(styles.properties_panel, styles.panel)}
          aria-label="Properties panel"
        >
          {properties}
        </div>
        <div
          className={mergeClasses(styles.app_preview, styles.panel)}
          aria-label="App Preview"
        >
          {preview}
        </div>
      </div>
    </>
  );
}

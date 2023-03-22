import * as React from "react";

import { mergeClasses } from "../utils/mergeClasses";

import styles from "./EditorLayout.module.css";

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

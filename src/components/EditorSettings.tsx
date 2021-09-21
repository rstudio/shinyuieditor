/** @jsxImportSource @emotion/react */

import * as React from "react";
import { GridCard } from "./GridCard";
import { TwoColumnGrid } from "./GridContainer";

export const EditorSettings: React.FC = ({ children }) => {
  return (
    <GridCard title="Settings" icon="settings" gridArea="settings">
      <TwoColumnGrid>{children}</TwoColumnGrid>
    </GridCard>
  );
};

export const SettingPane: React.FC<{ label: string }> = ({
  label,
  children,
}) => (
  <>
    <span style={{ backgroundColor: "var(--specialCustomColor)" }}>
      {label}:
    </span>
    {children}
  </>
);

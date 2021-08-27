import { FunctionalComponent } from "preact";
import { GridCard } from "../GridCard";
import { TwoColumnGrid } from "../GridContainer";

export const EditorSettings: FunctionalComponent = ({ children }) => {
  return (
    <GridCard title="Settings" icon="settings" gridArea="settings">
      <TwoColumnGrid>{children}</TwoColumnGrid>
    </GridCard>
  );
};

export const SettingPane: FunctionalComponent<{ label: string }> = ({
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

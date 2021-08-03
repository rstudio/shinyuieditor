import { FunctionalComponent } from "preact";
import { GridCard } from "../GridCard";
import { TwoColumnGrid } from "../GridContainer";
import { SettingsIcon } from "../Icons";

export const TheSettingsPanel: FunctionalComponent<{}> = ({ children }) => {
  return (
    <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
      <TwoColumnGrid>{children}</TwoColumnGrid>
    </GridCard>
  );
};

export const SettingPane: FunctionalComponent<{ label: string }> = ({
  label,
  children,
}) => (
  <>
    <span>{label}:</span>
    {children}
  </>
);

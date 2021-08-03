import { FunctionComponent, JSX } from "preact";
import { GridCard } from "../GridCard";
import { TwoColumnGrid } from "../GridContainer";
import { SettingsIcon } from "../Icons";

export const TheSettingsPanel: FunctionComponent<{}> = ({ children }) => {
  return (
    <GridCard title="Settings" icon={<SettingsIcon />} gridArea="settings">
      <TwoColumnGrid>{children}</TwoColumnGrid>
    </GridCard>
  );
};

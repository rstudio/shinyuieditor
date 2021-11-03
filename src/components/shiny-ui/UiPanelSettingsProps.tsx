import styled from "@emotion/styled";

export type UiPanelSettingsProps<UiPanelProps> = {
  startingSettings: UiPanelProps;
  onUpdate: (newSettings: UiPanelProps) => void;
};

export function EmptySettings<T>(opts: UiPanelSettingsProps<T>) {
  return <p>To Be Filled</p>;
}

export const SettingsPanelHolder = styled.div({
  padding: "1rem",
});

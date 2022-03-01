import textIcon from "assets/icons/shinyText.png";
import { UiComponentInfo } from "../UiComponentInfo";
import GridlayoutTitlePanel from "./GridlayoutTitlePanel";
import { GridlayoutTitlePanelSettings } from "./SettingsPanel";

export interface GridlayoutTitlePanelProps {
  title: string;
  area?: string;
}

export const gridlayoutTitlePanelInfo: UiComponentInfo<GridlayoutTitlePanelProps> =
  {
    title: "Title Panel",
    UiComponent: GridlayoutTitlePanel,
    SettingsComponent: GridlayoutTitlePanelSettings,
    acceptsChildren: false,
    defaultSettings: { title: "Title from Chooser" },
    iconSrc: textIcon,
  };

export default GridlayoutTitlePanel;

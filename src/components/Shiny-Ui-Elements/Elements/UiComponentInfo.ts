import { SettingsUpdaterComponent } from "../uiNodeTypes";
import { UiNodeComponent } from "./uiComponentAndSettings";

/**
 * Defines everything needed to add a new Shiny UI component to the app
 */
export type UiComponentInfo<NodeSettings extends object> = {
  /**
   * The name of the component in plain language. E.g. Plot Output
   */
  title: string;
  /**
   * The component that is used to actually draw the main interface for ui
   * element
   */
  UiComponent: UiNodeComponent<NodeSettings>;
  /**
   * Component for rendering the settings/ arguments form
   */
  SettingsComponent: SettingsUpdaterComponent<NodeSettings>;
  /**
   * Does this component accept children? This is used to enable or disable the
   * drag-to-drop callbacks.
   */
  acceptsChildren: boolean;
  /**
   * The settings that a freshly initialized node will take. These will also be
   * used to fill in any missing arguments if they are provided.
   */
  defaultSettings: NodeSettings;
  /**
   * The source of the icon. This comes from the importing of a png.
   */
  iconSrc: string;
};

import {
  ShinyUiArgumentsByName,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function UiComponent<UiName extends ShinyUiNames>({
  uiName,
  settings,
}: {
  uiName: UiName;
  settings: ShinyUiArgumentsByName[UiName];
}) {
  const Comp = uiComponentAndSettings[uiName].UiComponent;
  return <Comp {...settings} />;
}

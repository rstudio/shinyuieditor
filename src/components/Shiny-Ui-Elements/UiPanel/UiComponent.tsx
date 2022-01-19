import {
  ShinyUiArgumentsByName,
  ShinyUiNameAndArguments,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function UiComponent({ uiName, uiArguments }: ShinyUiNameAndArguments) {
  const Comp = uiComponentAndSettings[uiName].UiComponent as (
    p: ShinyUiArgumentsByName[typeof uiName]
  ) => JSX.Element;
  return <Comp {...uiArguments} />;
}

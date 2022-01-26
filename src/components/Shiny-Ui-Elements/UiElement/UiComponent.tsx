import {
  ShinyUiArguments,
  ShinyUiNameAndArguments,
} from "components/Shiny-Ui-Elements/componentTypes";
import * as React from "react";
import { uiComponentAndSettings } from "../Elements/uiComponentAndSettings";

export function UiComponent({ uiName, uiArguments }: ShinyUiNameAndArguments) {
  const Comp = uiComponentAndSettings[uiName].UiComponent as (
    p: ShinyUiArguments[typeof uiName]
  ) => JSX.Element;
  return <Comp {...uiArguments} />;
}

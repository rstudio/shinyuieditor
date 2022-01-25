import {
  ShinyUiNameAndArguments,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { BiSliderAlt, BiText } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";
import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = defaultSettingsForElements,
}: {
  availableUi?: ShinyUiNameAndArguments[];
}) {
  return (
    <div className={classes.OptionsList}>
      {availableUi.map((ui) => {
        const { uiName: name } = ui;
        return (
          <div
            className={classes.OptionItem}
            key={name}
            draggable
            onDragStart={(e) => {
              // Tag the drag event with the element type being dragged
              e.dataTransfer.setData("element-type", name);
            }}
          >
            <code>{name.replace(/[\w]+::/, "")}</code>
            {previewIcons[name]}
          </div>
        );
      })}
    </div>
  );
}

const previewIcons: Record<ShinyUiNames, JSX.Element> = {
  "shiny::plotOutput": <GoGraph size="40px" />,
  "shiny::sliderInput": <BiSliderAlt size="40px" />,
  "gridlayout::title_panel": <BiText size="40px" />,
};

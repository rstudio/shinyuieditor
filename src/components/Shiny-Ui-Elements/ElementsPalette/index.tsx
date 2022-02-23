import {
  ShinyUiNames,
  ShinyUiNode,
} from "components/Shiny-Ui-Elements/uiNodeTypes";
import * as React from "react";
import { BiSliderAlt, BiText } from "react-icons/bi";
import { BsBoundingBoxCircles } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { assignElementDragData } from "../DragAndDropHelpers/useDragAndDropElements";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";
import classes from "./styles.module.css";

export default function ElementsPalette({
  availableUi = defaultSettingsForElements,
}: {
  availableUi?: ShinyUiNode[];
}) {
  return (
    <div className={classes.OptionsList}>
      {availableUi.map((node) => {
        return <ElementIcon key={node.uiName} {...node} />;
      })}
    </div>
  );
}

function ElementIcon(node: ShinyUiNode) {
  return (
    <div
      className={classes.OptionItem}
      draggable
      onDragStart={(e) => {
        // Tag the drag event with the element type being dragged
        assignElementDragData(e, { node });
      }}
    >
      <code>{node.uiName.replace(/[\w]+::/, "")}</code>
      {previewIcons[node.uiName]}
    </div>
  );
}

const previewIcons: Record<ShinyUiNames, JSX.Element> = {
  "shiny::plotOutput": <GoGraph size="40px" />,
  "shiny::sliderInput": <BiSliderAlt size="40px" />,
  "gridlayout::title_panel": <BiText size="40px" />,
  "gridlayout::grid_panel": <BsBoundingBoxCircles size="40px" />,
  "gridlayout::grid_page": <BsBoundingBoxCircles size="40px" />,
};

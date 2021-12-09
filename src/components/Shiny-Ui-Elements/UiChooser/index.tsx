import { ShinyUiNameAndProps } from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { UiPanelHolder } from "../UiPanelHolder";
import { OptionsList, OptionItem, previewIcons } from "../UiOptionsList";

export const allPossibleUi: ShinyUiNameAndProps[] = [
  {
    componentName: "plotOutput",
    componentProps: { name: "My Chosen Plot" },
  },
  {
    componentName: "sliderInput",
    componentProps: { min: 0, val: 5, max: 10 },
  },
  {
    componentName: "titlePanel",
    componentProps: { title: "Title from Chooser" },
  },
];

function UiChooser({
  area,
  availableUi = allPossibleUi,
  onChoose,
}: {
  area?: string;
  availableUi?: ShinyUiNameAndProps[];
  onChoose: (newPanel: ShinyUiNameAndProps) => void;
}) {
  return (
    <UiPanelHolder area={area} aria-label={`Ui-Chooser for ${area}`}>
      <OptionsList>
        {availableUi.map((ui) => {
          const { componentName: name } = ui;
          return (
            <OptionItem
              key={name}
              onClick={() => onChoose(ui)}
              aria-label={`Add ${name} to app`}
            >
              {previewIcons[name]}
              <code>{name}</code>
            </OptionItem>
          );
        })}
      </OptionsList>
    </UiPanelHolder>
  );
}

export default UiChooser;

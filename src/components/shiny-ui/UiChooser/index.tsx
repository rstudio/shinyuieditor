import styled from "@emotion/styled";
import {
  ShinyUiNames,
  ShinyUiNameAndProps,
} from "components/shiny-ui/componentTypes";
import * as React from "react";
import { BiSliderAlt, BiText } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { makeBoxShadow } from "utils/css-helpers";
import { UiPanelHolder } from "../UiPanelHolder";

const allPossibleUi: ShinyUiNameAndProps[] = [
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
  area: string;
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

const previewIcons: Record<ShinyUiNames, JSX.Element> = {
  plotOutput: <GoGraph />,
  sliderInput: <BiSliderAlt />,
  titlePanel: <BiText />,
};

const OptionsList = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  padding: "5px",
  gap: "5px",
});

const OptionItem = styled.button({
  border: "1px solid var(--light-grey)",
  boxShadow: makeBoxShadow({ height: 0.2 }),
  borderRadius: "var(--corner-radius, 10px)",
  width: "120px",
  display: "grid",
  gridTemplateRows: "40px 25px",
  placeItems: "center",
});

export default UiChooser;

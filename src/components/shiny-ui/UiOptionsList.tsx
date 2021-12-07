import styled from "@emotion/styled";
import {
  ShinyUiNameAndProps,
  ShinyUiNames,
} from "components/shiny-ui/componentTypes";
import * as React from "react";
import { BiSliderAlt, BiText } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { allPossibleUi } from "./UiChooser/index";

export function UiOptionsList({
  availableUi = allPossibleUi,
  selected,
  onChoose,
}: {
  availableUi?: ShinyUiNameAndProps[];
  selected?: ShinyUiNames;
  onChoose: (newPanel: ShinyUiNameAndProps) => void;
}) {
  return (
    <OptionsList>
      {availableUi.map((ui) => {
        const { componentName: name } = ui;
        return (
          <OptionItem
            key={name}
            className={selected === name ? "selected" : ""}
            onClick={() => onChoose(ui)}
            aria-label={`Add ${name} to app`}
          >
            {previewIcons[name]}
            <code>{name}</code>
          </OptionItem>
        );
      })}
    </OptionsList>
  );
}
export const previewIcons: Record<ShinyUiNames, JSX.Element> = {
  plotOutput: <GoGraph />,
  sliderInput: <BiSliderAlt />,
  titlePanel: <BiText />,
};
export const OptionsList = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  padding: "5px",
  gap: "5px",
});
export const OptionItem = styled.button({
  border: "1px solid var(--light-grey)",
  borderRadius: "var(--corner-radius, 10px)",
  width: "120px",
  display: "grid",
  gridTemplateRows: "40px 25px",
  placeItems: "center",
  "&.selected": {
    backgroundColor: "var(--rstudio-blue)",
    color: "var(--rstudio-white)",
  },
});

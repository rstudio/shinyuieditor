import styled from "@emotion/styled";
import {
  ShinyUiNameAndArguments,
  ShinyUiNames,
} from "components/Shiny-Ui-Elements/Elements/componentTypes";
import * as React from "react";
import { BiSliderAlt, BiText } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { defaultSettingsForElements } from "../Elements/uiComponentAndSettings";

export function UiOptionsList({
  availableUi = defaultSettingsForElements,
  selected,
  onChoose,
}: {
  availableUi?: ShinyUiNameAndArguments[];
  selected?: ShinyUiNames;
  onChoose: (newPanel: ShinyUiNameAndArguments) => void;
}) {
  return (
    <OptionsList>
      {availableUi.map((ui) => {
        const { uiName: name } = ui;
        const isSelected = selected === name;
        return (
          <OptionItem key={name} className={isSelected ? "selected" : ""}>
            <input
              type="radio"
              name="Ui-Options"
              id={name}
              value={name}
              onChange={() => onChoose(ui)}
              checked={isSelected}
            />
            <code>{name.replace(/[\w]+::/, "")}</code> {previewIcons[name]}
          </OptionItem>
        );
      })}
    </OptionsList>
  );
}

export const previewIcons: Record<ShinyUiNames, JSX.Element> = {
  "shiny::plotOutput": <GoGraph />,
  "shiny::sliderInput": <BiSliderAlt />,
  "gridlayout::title_panel": <BiText />,
};

export const OptionsList = styled.div({
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
  padding: "5px",
  gap: "5px",
});

export const OptionItem = styled.label({
  border: "1px solid var(--light-grey)",
  borderRadius: "var(--corner-radius, 10px)",
  width: "150px",
  display: "grid",
  gridTemplateRows: "auto 40px 25px",
  placeItems: "center",
  position: "relative",
  // Hide the radio button itself
  "& > input[type='radio']": {
    appearance: "none",
    backgroundColor: "#fff",
    margin: 0,
  },
  // Give focus visibility via a before psuedoelement
  "& > input[type='radio']:focus::before": {
    content: `""`,
    position: "absolute",
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: "var(--corner-radius, 10px)",
    outline: "2px solid var(--rstudio-grey)",
  },
  "&.selected": {
    backgroundColor: "var(--rstudio-blue)",
    color: "var(--rstudio-white)",
  },
});

import { Wrap } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { ShinyUiElementNames } from "components/shiny-ui/componentTypes";
import { GridlayoutTitlePanelProps } from "components/shiny-ui/GridlayoutTitlePanel";
import { ShinyPlotOutputProps } from "components/shiny-ui/ShinyPlotOutput";
import { ShinySliderInputProps } from "components/shiny-ui/ShinySliderInput";
import * as React from "react";
import { BiSliderAlt, BiText } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { makeBoxShadow } from "utils/css-helpers";
import { UiPanelHolder } from "../UiPanelHolder";

type NewElementMessage =
  | {
      componentName: "plotOutput";
      componentProps: ShinyPlotOutputProps;
    }
  | {
      componentName: "sliderInput";
      componentProps: ShinySliderInputProps;
    }
  | {
      componentName: "titlePanel";
      componentProps: GridlayoutTitlePanelProps;
    };

const uiOptions: NewElementMessage[] = [
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
  onChoose,
}: {
  area: string;
  onChoose: (newPanel: NewElementMessage) => void;
}) {
  return (
    <UiPanelHolder area={area}>
      <Wrap>
        {uiOptions.map((ui) => {
          const { componentName: name } = ui;
          return (
            <OptionBlock key={name} onClick={() => onChoose(ui)}>
              {previewIcons[name]}
              <code>{name}</code>
            </OptionBlock>
          );
        })}
      </Wrap>
    </UiPanelHolder>
  );
}

const previewIcons: Record<ShinyUiElementNames, JSX.Element> = {
  plotOutput: <GoGraph />,
  sliderInput: <BiSliderAlt />,
  titlePanel: <BiText />,
};

const OptionBlock = styled.button({
  border: "1px solid var(--light-grey)",
  boxShadow: makeBoxShadow({ height: 0.2 }),
  borderRadius: "var(--corner-radius, 10px)",
  width: "120px",
  display: "grid",
  gridTemplateRows: "40px 25px",
  placeItems: "center",
});

export default UiChooser;

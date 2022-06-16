import React from "react";

import type { Story } from "@ladle/react";
import UiNode from "components/UiNode";

import type { ShinyUiNode } from "../uiNodeTypes";

const cardTree: ShinyUiNode = {
  uiName: "gridlayout::grid_card",
  uiArguments: {
    area: "A",
    item_alignment: "top",
    item_gap: "12px",
  },
  uiChildren: [
    {
      uiName: "shiny::sliderInput",
      uiArguments: {
        inputId: "bins",
        label: "Number Bins",
        min: 10,
        max: 100,
        value: 30,
      },
    },
    {
      uiName: "shiny::textOutput",
      uiArguments: {
        outputId: "myBins",
      },
    },
  ],
};

export const GridCardRepresentation: Story<{ cardTree: ShinyUiNode }> = ({
  cardTree,
}) => {
  return (
    <div
      style={{
        backgroundColor: "peru",
        display: "grid",
        gridTemplateAreas: `"A"`,
        width: "500px",
        height: "600px",
      }}
    >
      <UiNode {...cardTree} />
    </div>
  );
};
GridCardRepresentation.args = {
  cardTree,
};

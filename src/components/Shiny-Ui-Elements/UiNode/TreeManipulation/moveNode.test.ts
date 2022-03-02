import { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import moveNode from "./moveNode";
import { getNode } from "./treeManipulation";

// Two Panels, one with a slider and a plot and the other with just a plot
const baseNode: ShinyUiNode = {
  uiName: "gridlayout::grid_panel",
  uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      // path = [0]
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        area: "left",
        horizontalAlign: "right",
        verticalAlign: "center",
      },
      uiChildren: [
        // path = [0, 0]
        {
          uiName: "gridlayout::grid_panel",
          uiArguments: { area: "controls-holder" },
          uiChildren: [
            {
              // path = [0, 0, 0]
              uiName: "shiny::sliderInput",
              uiArguments: {
                inputId: "bins",
                label: "Number of Bins",
              },
            },
            {
              // path = [0, 0, 1]
              uiName: "gridlayout::vertical_stack_panel",
              uiArguments: { area: "controls-sub" },
              uiChildren: [],
            },
          ],
        },
        // path = [0, 1]
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "plotA",
          },
        },
      ],
    },
    {
      // path = [1]
      uiName: "gridlayout::grid_panel",
      uiArguments: { area: "right" },
      uiChildren: [
        // path = [1, 0]
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "plotB",
          },
        },
      ],
    },
  ],
};

describe("Move nodes", () => {
  test("Move latterally", () => {
    const plotToRight = moveNode({
      tree: baseNode,
      fromPath: [0, 1],
      toPath: [1],
    });

    expect(getNode(baseNode, [0, 1])).toEqual({
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "plotA",
      },
    });

    // Should be gone from that position in the new tree
    expect(getNode(plotToRight, [0, 1])).toEqual(undefined);

    // And should be placed as the last child of the toPath
    expect(getNode(plotToRight, [1, 1])).toEqual({
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "plotA",
      },
    });
  });

  test("Can't move up current branch", () => {
    expect(() =>
      moveNode({
        tree: baseNode,
        fromPath: [0, 0],
        toPath: [0, 0, 1],
      })
    ).toThrowError();
  });
});

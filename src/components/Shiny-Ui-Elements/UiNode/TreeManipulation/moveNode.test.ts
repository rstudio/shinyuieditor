import { ShinyUiNode } from "components/Shiny-Ui-Elements/Elements/uiNodeTypes";

import { getNode } from "./getNode";
import {
  placeNode,
  nodesAreDirectAncestors,
  nodesAreSiblings,
} from "./placeNode";

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

describe("Move Validation", () => {
  test("A is child of B", () => {
    expect(nodesAreDirectAncestors([0, 1, 2, 3], [0, 1, 2])).toEqual(true);
  });
  test("B is child of A", () => {
    expect(nodesAreDirectAncestors([2, 1, 3], [2, 1, 3, 4])).toEqual(true);
  });
  test("A and B are the same", () => {
    expect(nodesAreDirectAncestors([2, 1], [2, 1])).toEqual(true);
  });
  test("Siblings are not direct", () => {
    expect(nodesAreDirectAncestors([0, 1, 2, 3], [0, 1, 2, 4])).toEqual(false);
    expect(nodesAreDirectAncestors([0, 1, 2, 3], [0, 1, 2, 4])).toEqual(false);
  });
});

describe("Can detect when siblings", () => {
  test("A is a sibling of B", () => {
    expect(nodesAreSiblings([0, 1, 2], [0, 1, 3])).toEqual(true);
  });
  test("A is not a sibling of B", () => {
    expect(nodesAreSiblings([0, 2, 2], [0, 1, 3])).toEqual(false);
    expect(nodesAreSiblings([0, 1], [0, 1, 3])).toEqual(false);
  });
});

describe("Move nodes within tree", () => {
  const plotANode: ShinyUiNode = {
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "plotA",
    },
  };
  test("Move latterally", () => {
    const plotToRight = placeNode(baseNode, {
      node: plotANode,
      currentPath: [0, 1],
      parentPath: [1],
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
      placeNode(baseNode, {
        currentPath: [0, 0],
        parentPath: [0, 0, 1],
        node: plotANode,
      })
    ).toThrowError();
  });
});

describe("Move node around within its current container", () => {
  const sliderA: ShinyUiNode = {
    uiName: "shiny::sliderInput",
    uiArguments: {
      inputId: "A",
      label: "A",
    },
  };

  const sliderB: ShinyUiNode = {
    uiName: "shiny::sliderInput",
    uiArguments: {
      inputId: "B",
      label: "B",
    },
  };
  const sliderC: ShinyUiNode = {
    uiName: "shiny::sliderInput",
    uiArguments: {
      inputId: "C",
      label: "C",
    },
  };
  const sliderPanel: ShinyUiNode = {
    uiName: "gridlayout::vertical_stack_panel",
    uiArguments: { area: "controls-holder", item_alignment: "center" },
    uiChildren: [
      sliderA, // [0]
      sliderB, // [1]
      sliderC, // [2]
    ],
  };

  // Sanity check that nodes are where they should be
  expect(getNode(sliderPanel, [0])).toEqual(sliderA);
  expect(getNode(sliderPanel, [1])).toEqual(sliderB);
  expect(getNode(sliderPanel, [2])).toEqual(sliderC);

  // Move slider B above slider A
  const updatedSliderPanel = placeNode(sliderPanel, {
    node: sliderB,
    currentPath: [1],
    parentPath: [],
    positionInChildren: 0,
  });

  expect(getNode(updatedSliderPanel, [0])).toEqual(sliderB);
  expect(getNode(updatedSliderPanel, [1])).toEqual(sliderA);
  expect(getNode(updatedSliderPanel, [2])).toEqual(sliderC);
});

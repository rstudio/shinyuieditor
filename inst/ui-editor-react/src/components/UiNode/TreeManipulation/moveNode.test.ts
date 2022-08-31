import type {
  ShinyUiNode,
  ShinyUiNodeByName,
} from "Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";
import { nodesAreDirectAncestors } from "./nodesAreDirectAncestors";
import { nodesAreSiblings } from "./nodesAreSiblings";
import { placeNode } from "./placeNode";

// Two Panels, one with a slider and a plot and the other with just a plot
const baseNode: ShinyUiNode = {
  uiName: "gridlayout::grid_card",
  uiArguments: {
    area: "panel",
  },
  uiChildren: [
    {
      // path = [0]
      uiName: "gridlayout::grid_card",
      uiArguments: {
        area: "left",
      },
      uiChildren: [
        // path = [0, 0]
        {
          uiName: "gridlayout::grid_card",
          uiArguments: { area: "controls-holder" },
          uiChildren: [
            {
              // path = [0, 0, 0]
              uiName: "shiny::actionButton",
              uiArguments: {
                inputId: "bins",
                label: "Number of Bins",
              },
            },
            {
              // path = [0, 0, 1]
              uiName: "gridlayout::grid_card",
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
      uiName: "gridlayout::grid_card",
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
  test("A node is not its own sibling", () => {
    expect(nodesAreSiblings([0, 1, 3], [0, 1, 3])).toEqual(false);
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
      path: [1, 1],
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
        path: [0, 0, 1, 0],
        node: plotANode,
      })
    ).toThrowError();
  });
});

test("Move node around within its current container", () => {
  const buttonA: ShinyUiNode = {
    uiName: "shiny::actionButton",
    uiArguments: {
      inputId: "A",
      label: "A",
    },
  };

  const buttonB: ShinyUiNode = {
    uiName: "shiny::actionButton",
    uiArguments: {
      inputId: "B",
      label: "B",
    },
  };
  const buttonC: ShinyUiNode = {
    uiName: "shiny::actionButton",
    uiArguments: {
      inputId: "C",
      label: "C",
    },
  };
  const sliderPanel: ShinyUiNode = {
    uiName: "gridlayout::grid_card",
    uiArguments: { area: "controls-holder" },
    uiChildren: [
      buttonA, // [0]
      buttonB, // [1]
      buttonC, // [2]
    ],
  };

  // Sanity check that nodes are where they should be
  expect(getNode(sliderPanel, [0])).toEqual(buttonA);
  expect(getNode(sliderPanel, [1])).toEqual(buttonB);
  expect(getNode(sliderPanel, [2])).toEqual(buttonC);

  // Move slider B above slider A
  const updatedSliderPanel = placeNode(sliderPanel, {
    node: buttonB,
    currentPath: [1],
    path: [0],
  });

  expect(getNode(updatedSliderPanel, [0])).toEqual(buttonB);
  expect(getNode(updatedSliderPanel, [1])).toEqual(buttonA);
  expect(getNode(updatedSliderPanel, [2])).toEqual(buttonC);
});

describe("Node can displace its parent", () => {
  type GridCard = ShinyUiNodeByName["gridlayout::grid_card"];
  test("parent to child", () => {
    const tree: ShinyUiNode = {
      uiName: "gridlayout::grid_card",
      uiArguments: { area: "root" },
      uiChildren: [
        {
          uiName: "gridlayout::grid_card",
          uiArguments: { area: "0" },
        },
        {
          uiName: "gridlayout::grid_card",
          uiArguments: { area: "1" },
          uiChildren: [
            {
              uiName: "gridlayout::grid_card",
              uiArguments: { area: "1-0" },
            },
            {
              uiName: "gridlayout::grid_card",
              uiArguments: { area: "1-1" },
            },
          ],
        },
      ],
    };

    expect((getNode(tree, [1]) as GridCard).uiArguments.area).toEqual("1");

    // const updatedTree = placeNode(tree, {
    //   node: buttonB,
    //   currentPath: [1],
    //   path: [0],
    // });

    // expect(getNode(updatedSliderPanel, [0])).toEqual(buttonB);
  });
});

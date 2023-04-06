import type { ShinyUiNode } from "../../../main";
import type { ShinyUiLeafNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";
import { placeNode } from "./placeNode";

// Two Panels, one with a slider and a plot and the other with just a plot
const baseNode: ShinyUiNode = {
  id: "gridlayout::grid_card",
  uiArguments: {
    area: "panel",
  },
  uiChildren: [
    {
      // path = [0]
      id: "gridlayout::grid_card",
      uiArguments: {
        area: "left",
      },
      uiChildren: [
        // path = [0, 0]
        {
          id: "gridlayout::grid_card",
          uiArguments: { area: "controls-holder" },
          uiChildren: [
            {
              // path = [0, 0, 0]
              id: "shiny::actionButton",
              uiArguments: {
                inputId: "bins",
                label: "Number of Bins",
              },
            },
            {
              // path = [0, 0, 1]
              id: "gridlayout::grid_card",
              uiArguments: { area: "controls-sub" },
              uiChildren: [],
            },
          ],
        },
        // path = [0, 1]
        {
          id: "shiny::plotOutput",
          uiArguments: {
            outputId: "plotA",
          },
        },
      ],
    },
    {
      // path = [1]
      id: "gridlayout::grid_card",
      uiArguments: { area: "right" },
      uiChildren: [
        // path = [1, 0]
        {
          id: "shiny::plotOutput",
          uiArguments: {
            outputId: "plotB",
          },
        },
      ],
    },
  ],
};

describe("Move nodes within tree", () => {
  const plotANode: ShinyUiNode = {
    id: "shiny::plotOutput",
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
      id: "shiny::plotOutput",
      uiArguments: {
        outputId: "plotA",
      },
    });

    // Should be gone from that position in the new tree
    expect(() => getNode(plotToRight, [0, 1])).toThrow();

    // And should be placed as the last child of the toPath
    expect(getNode(plotToRight, [1, 1])).toEqual({
      id: "shiny::plotOutput",
      uiArguments: {
        outputId: "plotA",
      },
    });
  });

  // test("Can't move up current branch", () => {
  //   expect(() =>
  //     placeNode(baseNode, {
  //       currentPath: [0, 0],
  //       path: [0, 0, 1, 0],
  //       node: plotANode,
  //     })
  //   ).toThrowError();
  // });
});

test("Move node around within its current container", () => {
  const buttonA: ShinyUiNode = {
    id: "shiny::actionButton",
    uiArguments: {
      inputId: "A",
      label: "A",
    },
  };

  const buttonB: ShinyUiNode = {
    id: "shiny::actionButton",
    uiArguments: {
      inputId: "B",
      label: "B",
    },
  };
  const buttonC: ShinyUiNode = {
    id: "shiny::actionButton",
    uiArguments: {
      inputId: "C",
      label: "C",
    },
  };
  const sliderPanel: ShinyUiNode = {
    id: "gridlayout::grid_card",
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
  test("parent to child", () => {
    const leafNode: ShinyUiLeafNode = {
      id: "gridlayout::grid_card",
      uiArguments: { area: "child" },
    };

    const tree: ShinyUiNode = {
      id: "gridlayout::grid_card",
      uiArguments: { area: "root" },
      uiChildren: [
        {
          id: "gridlayout::grid_card",
          uiArguments: { area: "leaf1" },
        },
        {
          id: "gridlayout::grid_card",
          uiArguments: { area: "parent" },
          uiChildren: [
            {
              id: "gridlayout::grid_card",
              uiArguments: { area: "leaf2" },
            },
            leafNode,
          ],
        },
      ],
    };

    // expect((getNode(tree, [1]) as GridCard).uiArguments.area).toEqual("parent");
    expect(getNode(tree, [1]).uiArguments).toEqual(
      expect.objectContaining({ area: "parent" })
    );

    const updatedTree = placeNode(tree, {
      node: leafNode,
      currentPath: [1, 1],
      path: [1],
    });

    // Child now exists where parent used to...
    expect(getNode(updatedTree, [1]).uiArguments).toEqual(
      expect.objectContaining({ area: "child" })
    );

    // Parent has been moved up one
    expect(getNode(updatedTree, [2]).uiArguments).toEqual(
      expect.objectContaining({ area: "parent" })
    );
  });
});

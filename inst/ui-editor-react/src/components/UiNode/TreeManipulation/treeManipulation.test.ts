import type { ShinyUiNode } from "Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";
import { placeNode } from "./placeNode";
import { removeNode } from "./removeNode";
import { updateNode } from "./updateNode";

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
        area: "panel2",
      },
      uiChildren: [
        // path = [0, 0]
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot",
          },
        },
        // path = [0, 1]
        {
          uiName: "shiny::plotOutput",
          uiArguments: {
            outputId: "myPlot2",
          },
        },
      ],
    },
  ],
};

test("Remove a node", () => {
  expect(getNode(baseNode, [0, 1])).toEqual({
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "myPlot2",
    },
  });
  const withoutNode = removeNode(baseNode as ShinyUiNode, {
    path: [0, 1],
  });
  expect(getNode(withoutNode, [0, 1])).toEqual(undefined);
  expect(getNode(baseNode, [0, 1])).not.toEqual(undefined);
});

test("Modify a node", () => {
  expect(getNode(baseNode, [0, 0])).toEqual({
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "myPlot",
    },
  });

  const nodeToReplaceWith: ShinyUiNode = {
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "replacedNode",
    },
  };
  const updatedNode = updateNode(baseNode as ShinyUiNode, {
    path: [0, 0],
    node: nodeToReplaceWith,
  });
  expect(getNode(updatedNode, [0, 0])).toEqual(nodeToReplaceWith);
  expect(getNode(baseNode, [0, 0])).not.toEqual(nodeToReplaceWith);
});

test("Modify a node at first level", () => {
  const baseNode: ShinyUiNode = {
    uiName: "gridlayout::grid_card",
    uiArguments: {
      area: "panel",
    },
    uiChildren: [
      // path = [0]
      {
        uiName: "shiny::plotOutput",
        uiArguments: {
          outputId: "myPlot",
        },
      },
    ],
  };
  expect(getNode(baseNode, [0])).toEqual({
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "myPlot",
    },
  });

  const nodeToReplaceWith: ShinyUiNode = {
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "replacedNode",
    },
  };
  const updatedNode = updateNode(baseNode as ShinyUiNode, {
    path: [0],
    node: nodeToReplaceWith,
  });
  expect(getNode(updatedNode, [0])).toEqual(nodeToReplaceWith);
  expect(getNode(baseNode, [0])).not.toEqual(nodeToReplaceWith);
});

// test("Update the settings of the root node", () => {
//   const grid_app = {
//     uiName: "gridlayout::grid_page",
//     uiArguments: {
//       areas: [["sidebar", "plot"]],
//       row_sizes: ["1fr"],
//       col_sizes: ["250px", "1fr"],
//     },
//     uiChildren: [
//       {
//         uiName: "gridlayout::grid_card",
//         uiArguments: {
//           area: "sidebar",
//           horizontalAlign: "right",
//           verticalAlign: "center",
//         },
//         uiChildren: [
//           {
//             uiName: "shiny::sliderInput",
//             uiArguments: {
//               inputId: "mySlider",
//               label: "slider",
//               min: 1,
//               max: 10,
//               value: 7,
//             },
//           },
//         ],
//       },
//       {
//         uiName: "gridlayout::grid_card",
//         uiArguments: {
//           area: "plot",
//           horizontalAlign: "right",
//           verticalAlign: "center",
//         },
//         uiChildren: [
//           {
//             uiName: "shiny::plotOutput",
//             uiArguments: {
//               outputId: "myPlot",
//             },
//           },
//         ],
//       },
//     ],
//   };

//   const updated_app = updateNode(grid_app, {
//     path: [],
//     node: {
//       uiName: "gridlayout::grid_page",
//       uiArguments: fillInPartialTemplate({
//         areas: [["new_sidebar_name", "plot"]],
//         row_sizes: ["1fr"],
//         col_sizes: ["250px", "1fr"],
//       }),
//     },
//   });

//   // expect((updated_app.uiArguments as any).areas[0][0]).toEqual(
//   //   "new_sidebar_name"
//   // );
// });

test("Add a node", () => {
  expect(getNode(baseNode, [0]).uiChildren).toHaveLength(2);

  const newUiNode: ShinyUiNode = {
    uiName: "shiny::actionButton",
    uiArguments: {
      inputId: "button",
      label: "My Button",
    },
  };

  const withNewNode = placeNode(baseNode, {
    parentPath: [0],
    node: newUiNode,
  });

  const newContainer = getNode(withNewNode, [0]);
  expect(newContainer.uiChildren).toHaveLength(3);
  expect(newContainer.uiChildren?.[2]).toEqual(newUiNode);
});

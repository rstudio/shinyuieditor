import type {
  ShinyUiNode,
  ShinyUiParentNode,
} from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";
import { placeNode } from "./placeNode";
import { removeNode } from "./removeNode";
import { updateNode } from "./updateNode";

const baseNode: ShinyUiNode = {
  id: "grid_card",
  namedArgs: {
    area: "panel",
  },
  children: [
    {
      // path = [0]
      id: "grid_card",
      namedArgs: {
        area: "panel2",
      },
      children: [
        // path = [0, 0]
        {
          id: "plotOutput",
          namedArgs: {
            outputId: "myPlot",
          },
        },
        // path = [0, 1]
        {
          id: "plotOutput",
          namedArgs: {
            outputId: "myPlot2",
          },
        },
      ],
    },
  ],
};

test("Remove a node", () => {
  expect(getNode(baseNode, [0, 1])).toEqual({
    id: "plotOutput",
    namedArgs: {
      outputId: "myPlot2",
    },
  });
  const withoutNode = removeNode(baseNode as ShinyUiNode, {
    path: [0, 1],
  });
  expect(() => getNode(withoutNode, [0, 1])).toThrow();
  expect(getNode(baseNode, [0, 1])).not.toEqual(undefined);
});

test("Modify a node", () => {
  expect(getNode(baseNode, [0, 0])).toEqual({
    id: "plotOutput",
    namedArgs: {
      outputId: "myPlot",
    },
  });

  const nodeToReplaceWith: ShinyUiNode = {
    id: "plotOutput",
    namedArgs: {
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
    id: "grid_card",
    namedArgs: {
      area: "panel",
    },
    children: [
      // path = [0]
      {
        id: "plotOutput",
        namedArgs: {
          outputId: "myPlot",
        },
      },
    ],
  };
  expect(getNode(baseNode, [0])).toEqual({
    id: "plotOutput",
    namedArgs: {
      outputId: "myPlot",
    },
  });

  const nodeToReplaceWith: ShinyUiNode = {
    id: "plotOutput",
    namedArgs: {
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
//     id: "grid_page",
//     namedArgs: {
//       areas: [["sidebar", "plot"]],
//       row_sizes: ["1fr"],
//       col_sizes: ["250px", "1fr"],
//     },
//     children: [
//       {
//         id: "grid_card",
//         namedArgs: {
//           area: "sidebar",
//           horizontalAlign: "right",
//           verticalAlign: "center",
//         },
//         children: [
//           {
//             id: "sliderInput",
//             namedArgs: {
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
//         id: "grid_card",
//         namedArgs: {
//           area: "plot",
//           horizontalAlign: "right",
//           verticalAlign: "center",
//         },
//         children: [
//           {
//             id: "plotOutput",
//             namedArgs: {
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
//       id: "grid_page",
//       namedArgs: fillInPartialTemplate({
//         areas: [["new_sidebar_name", "plot"]],
//         row_sizes: ["1fr"],
//         col_sizes: ["250px", "1fr"],
//       }),
//     },
//   });

//   // expect((updated_app.namedArgs as any).areas[0][0]).toEqual(
//   //   "new_sidebar_name"
//   // );
// });

test("Add a node", () => {
  expect((getNode(baseNode, [0]) as ShinyUiParentNode).children).toHaveLength(
    2
  );

  const newUiNode: ShinyUiNode = {
    id: "actionButton",
    namedArgs: {
      inputId: "button",
      label: "My Button",
    },
  };

  const withNewNode = placeNode(baseNode, {
    path: [0, 2],
    node: newUiNode,
  });

  const newContainer = getNode(withNewNode, [0]) as ShinyUiParentNode;
  expect(newContainer.children).toHaveLength(3);
  expect(newContainer.children?.[2]).toEqual(newUiNode);
});

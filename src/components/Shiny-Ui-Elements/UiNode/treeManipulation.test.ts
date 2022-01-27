import { UiContainerNode, UiNodeProps } from "../uiNodeTypes";
import { addNode, getNode, removeNode, replaceNode } from "./treeManipulation";

const baseNode: UiNodeProps = {
  uiName: "gridlayout::grid_panel",
  uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      // path = [0]
      uiName: "gridlayout::grid_panel",
      uiArguments: {
        horizontalAlign: "right",
        verticalAlign: "center",
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
  const withoutNode = removeNode({
    tree: baseNode as UiNodeProps,
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

  const nodeToReplaceWith: UiNodeProps = {
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "replacedNode",
    },
  };
  const updatedNode = replaceNode({
    tree: baseNode as UiNodeProps,
    path: [0, 0],
    newNode: nodeToReplaceWith,
  });
  expect(getNode(updatedNode, [0, 0])).toEqual(nodeToReplaceWith);
  expect(getNode(baseNode, [0, 0])).not.toEqual(nodeToReplaceWith);
});

test("Modify a node at first level", () => {
  const baseNode: UiNodeProps = {
    uiName: "gridlayout::grid_panel",
    uiArguments: { horizontalAlign: "center", verticalAlign: "center" },
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

  const nodeToReplaceWith: UiNodeProps = {
    uiName: "shiny::plotOutput",
    uiArguments: {
      outputId: "replacedNode",
    },
  };
  const updatedNode = replaceNode({
    tree: baseNode as UiNodeProps,
    path: [0],
    newNode: nodeToReplaceWith,
  });
  expect(getNode(updatedNode, [0])).toEqual(nodeToReplaceWith);
  expect(getNode(baseNode, [0])).not.toEqual(nodeToReplaceWith);
});

test("Add a node", () => {
  expect((getNode(baseNode, [0]) as UiContainerNode).uiChildren).toHaveLength(
    2
  );

  const newUiNode: UiNodeProps = {
    uiName: "gridlayout::title_panel",
    uiArguments: {
      title: "myNewNode",
    },
  };

  const withNewNode = addNode({
    tree: baseNode,
    path: [0],
    newNode: newUiNode,
  });

  const newContainer = getNode(withNewNode, [0]) as UiContainerNode;
  expect(newContainer.uiChildren).toHaveLength(3);
  expect(newContainer.uiChildren[2]).toEqual(newUiNode);
});

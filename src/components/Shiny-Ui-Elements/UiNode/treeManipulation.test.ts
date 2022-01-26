import { UiContainerNode, UiNodeProps } from "./nodeTypes";
import { addNode, getNode, removeNode, replaceNode } from "./treeManipulation";

const baseNode: UiNodeProps = {
  containerSettings: { horizontalAlign: "center", verticalAlign: "center" },
  uiChildren: [
    {
      // path = [0]
      containerSettings: {
        horizontalAlign: "right",
        verticalAlign: "center",
      },
      uiChildren: [
        {
          // path = [0, 0]
          uiInfo: {
            uiName: "shiny::plotOutput",
            uiArguments: {
              outputId: "myPlot",
            },
          },
        },
        {
          // path = [0, 1]
          uiInfo: {
            uiName: "shiny::plotOutput",
            uiArguments: {
              outputId: "myPlot2",
            },
          },
        },
      ],
    },
  ],
};

test("Remove a node", () => {
  expect(getNode(baseNode, [0, 1])).toEqual({
    uiInfo: {
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "myPlot2",
      },
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
    uiInfo: {
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "myPlot",
      },
    },
  });

  const nodeToReplaceWith: UiNodeProps = {
    uiInfo: {
      uiName: "shiny::plotOutput",
      uiArguments: {
        outputId: "replacedNode",
      },
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

test("Add a node", () => {
  expect((getNode(baseNode, [0]) as UiContainerNode).uiChildren).toHaveLength(
    2
  );

  const newUiNode: UiNodeProps = {
    uiInfo: {
      uiName: "gridlayout::title_panel",
      uiArguments: {
        title: "myNewNode",
      },
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

import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";

const tree: ShinyUiNode = {
  uiName: "root",
  uiArguments: {
    title: "my page",
    sidebar: {
      uiName: "panel",
      uiArguments: { position: "side" },
      uiChildren: [
        { uiName: "slider", uiArguments: { inputId: "argument_slider" } },
      ],
    },
  },
  uiChildren: [
    { uiName: "plot", uiArguments: { outputId: "plot" } },
    { uiName: "caption", uiArguments: { inputId: "caption" } },
    {
      uiName: "panel",
      uiArguments: { position: "bottom" },
      uiChildren: [
        { uiName: "slider", uiArguments: { inputId: "child_slider" } },
      ],
    },
  ],
};

describe("Can navigate into ui node and retrieve other nodes baesd on a path", () => {
  test("Can get the root node", () => {
    expect(getNode(tree, [])).toEqual(tree);
  });

  test("Can access children nodes by indexing with numbers", () => {
    const child_slider = getNode(tree, [2, 0]);

    // This should work and return `{ name: "slider", args: { inputId: "child_slider" } }`
    expect(child_slider).toStrictEqual({
      uiName: "slider",
      uiArguments: { inputId: "child_slider" },
    });
  });

  test("Can access nodes inside of named arguments by using string keys", () => {
    const sidebar_slider = getNode(tree, ["sidebar", 0]);

    // This should work and return `{ name: "slider", args: { inputId: "argument_slider" } }`
    expect(sidebar_slider).toStrictEqual({
      uiName: "slider",
      uiArguments: { inputId: "argument_slider" },
    });
  });
});

import type { ShinyUiNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { getNode } from "./getNode";

const tree: ShinyUiNode = {
  id: "root",
  namedArgs: {
    title: "my page",
    sidebar: {
      id: "panel",
      namedArgs: { position: "side" },
      children: [{ id: "slider", namedArgs: { inputId: "argument_slider" } }],
    },
  },
  children: [
    { id: "plot", namedArgs: { outputId: "plot" } },
    { id: "caption", namedArgs: { inputId: "caption" } },
    {
      id: "panel",
      namedArgs: { position: "bottom" },
      children: [{ id: "slider", namedArgs: { inputId: "child_slider" } }],
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
      id: "slider",
      namedArgs: { inputId: "child_slider" },
    });
  });

  test("Can access nodes inside of named arguments by using string keys", () => {
    const sidebar_slider = getNode(tree, ["sidebar", 0]);

    // This should work and return `{ name: "slider", args: { inputId: "argument_slider" } }`
    expect(sidebar_slider).toStrictEqual({
      id: "slider",
      namedArgs: { inputId: "argument_slider" },
    });
  });
});

import type { ShinyUiParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { removeChildNode } from "./removeChildNode";

describe("Can remove children nodes from a parent node", () => {
  const parent: ShinyUiParentNode = {
    id: "parent",
    namedArgs: {},
    uiChildren: [
      { id: "child1", namedArgs: {} },
      { id: "child2", namedArgs: {} },
      { id: "child3", namedArgs: {} },
    ],
  };

  test("Can remove the first child", () => {
    const newParent = removeChildNode(parent, 0);
    expect(newParent.uiChildren).toEqual([
      { id: "child2", namedArgs: {} },
      { id: "child3", namedArgs: {} },
    ]);
  });
  test("Can remove the second child", () => {
    const newParent = removeChildNode(parent, 1);
    expect(newParent.uiChildren).toEqual([
      { id: "child1", namedArgs: {} },
      { id: "child3", namedArgs: {} },
    ]);
  });

  test("Can remove the last child", () => {
    const newParent = removeChildNode(parent, 2);
    expect(newParent.uiChildren).toEqual([
      { id: "child1", namedArgs: {} },
      { id: "child2", namedArgs: {} },
    ]);
  });
});

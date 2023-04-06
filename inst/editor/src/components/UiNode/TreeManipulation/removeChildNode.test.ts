import type { ShinyUiParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { removeChildNode } from "./removeChildNode";

describe("Can remove children nodes from a parent node", () => {
  const parent: ShinyUiParentNode = {
    id: "parent",
    uiArguments: {},
    uiChildren: [
      { id: "child1", uiArguments: {} },
      { id: "child2", uiArguments: {} },
      { id: "child3", uiArguments: {} },
    ],
  };

  test("Can remove the first child", () => {
    const newParent = removeChildNode(parent, 0);
    expect(newParent.uiChildren).toEqual([
      { id: "child2", uiArguments: {} },
      { id: "child3", uiArguments: {} },
    ]);
  });
  test("Can remove the second child", () => {
    const newParent = removeChildNode(parent, 1);
    expect(newParent.uiChildren).toEqual([
      { id: "child1", uiArguments: {} },
      { id: "child3", uiArguments: {} },
    ]);
  });

  test("Can remove the last child", () => {
    const newParent = removeChildNode(parent, 2);
    expect(newParent.uiChildren).toEqual([
      { id: "child1", uiArguments: {} },
      { id: "child2", uiArguments: {} },
    ]);
  });
});

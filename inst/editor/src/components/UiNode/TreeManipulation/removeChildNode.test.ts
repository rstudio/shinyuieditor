import type { ShinyUiParentNode } from "../../../Shiny-Ui-Elements/uiNodeTypes";

import { removeChildNode } from "./removeChildNode";

describe("Can remove children nodes from a parent node", () => {
  const parent: ShinyUiParentNode = {
    uiName: "parent",
    uiArguments: {},
    uiChildren: [
      { uiName: "child1", uiArguments: {} },
      { uiName: "child2", uiArguments: {} },
      { uiName: "child3", uiArguments: {} },
    ],
  };

  test("Can remove the first child", () => {
    const newParent = removeChildNode(parent, 0);
    expect(newParent.uiChildren).toEqual([
      { uiName: "child2", uiArguments: {} },
      { uiName: "child3", uiArguments: {} },
    ]);
  });
  test("Can remove the second child", () => {
    const newParent = removeChildNode(parent, 1);
    expect(newParent.uiChildren).toEqual([
      { uiName: "child1", uiArguments: {} },
      { uiName: "child3", uiArguments: {} },
    ]);
  });

  test("Can remove the last child", () => {
    const newParent = removeChildNode(parent, 2);
    expect(newParent.uiChildren).toEqual([
      { uiName: "child1", uiArguments: {} },
      { uiName: "child2", uiArguments: {} },
    ]);
  });
});

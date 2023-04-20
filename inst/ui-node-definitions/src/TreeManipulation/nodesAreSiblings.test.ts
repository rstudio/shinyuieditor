import {
  nodesAreSiblings,
  nodesShareImmediateParent,
} from "./nodesAreSiblings";

describe("Can detect when siblings", () => {
  test("A is a sibling of B", () => {
    expect(nodesAreSiblings([0, 1, 2], [0, 1, 3])).toEqual(true);
  });

  test("A is not a sibling of B", () => {
    expect(nodesAreSiblings([0, 2, 2], [0, 1, 3])).toEqual(false);
    expect(nodesAreSiblings([0, 1], [0, 1, 3])).toEqual(false);
  });

  test("A node is not its own sibling", () => {
    expect(nodesAreSiblings([0, 1], [0, 1])).toEqual(false);
  });

  test("A node does share its own common parent", () => {
    expect(nodesShareImmediateParent([0, 1], [0, 1])).toEqual(true);
  });
});

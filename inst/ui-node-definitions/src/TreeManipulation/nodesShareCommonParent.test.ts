import { nodesShareCommonParent } from "./nodesShareCommonParent";

test("Works with common parent as root", () => {
  expect(nodesShareCommonParent([1, 2], [0])).toEqual(true);
  expect(nodesShareCommonParent([0], [0, 1])).toEqual(true);
  expect(nodesShareCommonParent([], [0, 1])).toEqual(true);
});

test("Works with deep nodes", () => {
  expect(nodesShareCommonParent([1, 2, 3, 4, 5], [1, 4])).toEqual(true);
  expect(nodesShareCommonParent([1, 4], [1, 2, 3, 4, 5])).toEqual(true);
  expect(nodesShareCommonParent([1, 2, 3, 4, 5], [2, 4])).toEqual(false);
});

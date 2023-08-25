import { getNewSelectionPathAfterDeletion } from "./getNewSelectionPathAfterDeletion";

describe("Provides a new valid selection path from a current one after a node in a given path is deleted", () => {
  it("Unrelated nodes don't change selection", () => {
    expect(
      getNewSelectionPathAfterDeletion({
        deletedPath: [2, 3],
        selectedPath: [1, 1],
      })
    ).toStrictEqual([1, 1]);
  });

  it("Deleting the selected node will back up to its parent", () => {
    expect(
      getNewSelectionPathAfterDeletion({
        selectedPath: [1, 1],
        deletedPath: [1, 1],
      })
    ).toStrictEqual([1]);
  });

  it("Deleting a node earlier in the tree from the selection will update relevant selection indices", () => {
    expect(
      getNewSelectionPathAfterDeletion({
        selectedPath: [1, 1, 1],
        deletedPath: [0],
      })
    ).toStrictEqual([0, 1, 1]);
  });

  it("Deleting direct sibling will shift if sibling was earlier, but not otherwise", () => {
    expect(
      getNewSelectionPathAfterDeletion({
        selectedPath: [0, 1],
        deletedPath: [0, 0],
      })
    ).toStrictEqual([0, 0]);
    expect(
      getNewSelectionPathAfterDeletion({
        selectedPath: [0, 1],
        deletedPath: [0, 3],
      })
    ).toStrictEqual([0, 1]);
  });

  it("Root selections don't throw anything off", () => {
    expect(
      getNewSelectionPathAfterDeletion({
        selectedPath: [],
        deletedPath: [0],
      })
    ).toStrictEqual([]);
  });
});

import { getIsValidMove } from "./getIsValidMove";

describe("Knows when moves are allowed", () => {
  it("Approves valid moves", () => {
    expect(getIsValidMove({ fromPath: [0, 0], toPath: [1, 1] })).toEqual(true);
  });

  it("Handles moving around within children of parent", () => {
    expect(getIsValidMove({ fromPath: [0, 2], toPath: [0, 1] })).toEqual(true);
    expect(getIsValidMove({ fromPath: [0, 2], toPath: [0, 4] })).toEqual(true);
  });

  it("Catches no-ops where node is moved to its immediate sibling position", () => {
    expect(getIsValidMove({ fromPath: [0, 2], toPath: [0, 2] })).toEqual(false);
    expect(getIsValidMove({ fromPath: [0, 2], toPath: [0, 3] })).toEqual(false);
  });

  it("Allows moving up ancestor tree", () => {
    expect(getIsValidMove({ fromPath: [1, 2, 3], toPath: [1, 2] })).toEqual(
      true
    );
  });

  it("Doesn't allow becoming its own parent (i.e. moving down the ancestor tree)", () => {
    expect(getIsValidMove({ fromPath: [1, 2], toPath: [1, 2, 3] })).toEqual(
      false
    );
  });
});

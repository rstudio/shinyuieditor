import { getPathAfterMove } from "./getPathAfterMove";

describe("Figure out new node path after move", () => {
  it("Handles direct sibling moves", () => {
    expect(getPathAfterMove({ fromPath: [0], toPath: [3] })).toEqual([2]);
  });
  it("Handles non-direct children moves", () => {
    expect(getPathAfterMove({ fromPath: [0], toPath: [1, 0, 0] })).toEqual([
      0, 0, 0,
    ]);
  });
  it("Doesn't move when it doesn't need to", () => {
    expect(getPathAfterMove({ fromPath: [4], toPath: [1, 0, 0] })).toEqual([
      1, 0, 0,
    ]);
  });
  it("Won't do anything if move is latteral", () => {
    expect(
      getPathAfterMove({ fromPath: [3, 0, 0], toPath: [2, 0, 0] })
    ).toEqual([2, 0, 0]);
  });
  it("Will shift if if move is latteral but to direct sibling position", () => {
    expect(
      getPathAfterMove({ fromPath: [3, 0, 0], toPath: [3, 0, 2] })
    ).toEqual([3, 0, 1]);
  });
});

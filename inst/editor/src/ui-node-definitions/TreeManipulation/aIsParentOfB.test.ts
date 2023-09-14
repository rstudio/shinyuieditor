import { aIsParentOfB } from "./aIsParentOfB";

describe("Can distinguish parent-child relationships properly", () => {
  it("Handles simple parent grandparent etc..", () => {
    expect(aIsParentOfB([1], [1, 2])).toEqual(true);
    expect(aIsParentOfB([1], [1, 2, 3])).toEqual(true);

    expect(aIsParentOfB([1], [0, 2, 3])).toEqual(false);
    expect(aIsParentOfB([1, 2], [1])).toEqual(false);
    expect(aIsParentOfB([1, 2, 3], [1, 2])).toEqual(false);
  });

  it("Knows siblings are not parents", () => {
    expect(aIsParentOfB([1], [1])).toEqual(false);
    expect(aIsParentOfB([1, 2], [1, 2])).toEqual(false);
  });
});

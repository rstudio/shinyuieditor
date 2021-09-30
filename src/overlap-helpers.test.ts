import { boxesOverlap, intervalsOverlap } from "./overlap-helpers";
describe("Interval overlap logic", () => {
  test("Standard partial overlap", () => {
    // B is hanging off end of A
    expect(intervalsOverlap([0, 2], [1, 3])).toStrictEqual({
      type: "end",
      amount: 1,
    });

    // B is hanging off start of A
    expect(intervalsOverlap([1, 3], [0, 2])).toStrictEqual({
      type: "start",
      amount: 1,
    });
  });

  test("Intervals fully contain eachother", () => {
    // A contains B
    expect(intervalsOverlap([0, 3], [1, 2]).type).toStrictEqual("full");

    // B fully contains A
    expect(intervalsOverlap([1, 2], [0, 3]).type).toStrictEqual("full");
  });

  test("Intervals are identical", () => {
    expect(intervalsOverlap([0, 1], [0, 1]).type).toStrictEqual("full");
  });

  test("Just touching at boundaries is a zero-length but existing overlap", () => {
    expect(intervalsOverlap([0, 1], [1, 2])).toStrictEqual({
      type: "end",
      amount: 0,
    });

    expect(intervalsOverlap([1, 2], [0, 1])).toStrictEqual({
      type: "start",
      amount: 0,
    });
  });

  test("Intervals that are simply points work as well", () => {
    // On the edge...
    expect(intervalsOverlap([0, 1], [1, 1]).type).toStrictEqual("full");
    expect(intervalsOverlap([1, 1], [0, 1]).type).toStrictEqual("full");

    // Within
    expect(intervalsOverlap([1, 1], [0, 2]).type).toStrictEqual("full");
    expect(intervalsOverlap([0, 2], [1, 1]).type).toStrictEqual("full");

    // Outside
    expect(intervalsOverlap([3, 3], [0, 2]).type).toStrictEqual("none");
    expect(intervalsOverlap([0, 2], [-1, -1]).type).toStrictEqual("none");
  });
});

// All tests are in reference to the smaller box overlapping the larger one
describe("Box overlapping logic", () => {
  // ┌────┐
  // │   ┌┼───┐
  // │   ││   │
  // │   └┼───┘
  // └────┘
  test("Overlap on right", () => {
    expect(
      boxesOverlap(
        { top: 0, bottom: 3, left: 0, right: 3 },
        { top: 1, bottom: 2, left: 2, right: 4 }
      )
    ).toBe("right");
  });

  //     ┌────┐
  // ┌───┼┐   │
  // │   ││   │
  // └───┼┘   │
  //     └────┘
  test("Overlap on left", () => {
    expect(
      boxesOverlap(
        { top: 0, bottom: 3, left: 2, right: 5 },
        { top: 1, bottom: 2, left: 0, right: 3 }
      )
    ).toBe("left");
  });
  //   ┌────┐
  // ┌─┼────┼─┐
  // │ └────┘ │
  // └────────┘
  test("Overlap on top", () => {
    expect(
      boxesOverlap(
        { top: 1, bottom: 4, left: 0, right: 4 },
        { top: 0, bottom: 2, left: 1, right: 3 }
      )
    ).toBe("top");
  });

  // ┌────────┐
  // │ ┌────┐ │
  // └─┼────┼─┘
  //   └────┘
  test("Overlap on bottom", () => {
    expect(
      boxesOverlap(
        { top: 0, bottom: 3, left: 0, right: 4 },
        { top: 1, bottom: 4, left: 1, right: 3 }
      )
    ).toBe("bottom");
  });

  // ┌──────────┐
  // │  ┌────┐  │
  // │  │    │  │
  // │  └────┘  │
  // └──────────┘
  test("Contained", () => {
    expect(
      boxesOverlap(
        { top: 0, bottom: 5, left: 0, right: 5 },
        { top: 1, bottom: 4, left: 1, right: 4 }
      )
    ).toBe("center");
  });

  //          ┌────────────┐
  //  ┌────┐  │            │
  //  │    │  │            │
  //  └────┘  │            │
  //          └────────────┘
  test("No overlap", () => {
    expect(
      boxesOverlap(
        { top: 0, bottom: 4, left: 3, right: 5 },
        { top: 1, bottom: 3, left: 0, right: 2 }
      )
    ).toBe(null);
  });
});

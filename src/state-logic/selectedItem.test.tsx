import { GridItemDef, GridLayoutTemplate } from "../GridTypes";

const LayoutToTest: GridLayoutTemplate = {
  name: "test",
  rows: ["2fr", "2fr", "2fr", "2fr"],
  cols: ["2fr", "2fr"],
  gap: "2rem",
  items: [] as GridItemDef[],
};

// The goal of these tests is to test that the tract updaters properly update
// the state of the app. We already test that the CSSUnitInput component works
// the way it should in it's separate tests. That's why we watch the recoil
// value instead of looking at the text of the input

describe("Tract updaters properly update the state of the app.", () => {
  test("Can update tract sizing through increase/decrease buttons", () => {});
});

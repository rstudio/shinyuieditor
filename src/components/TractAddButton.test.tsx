import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GridItemDef, GridLayoutTemplate } from "../GridTypes";
import { rowsState } from "../state-logic/gridLayout/atoms";
import { AppWLayout, RecoilObserver, renderWithRecoil } from "../test-helpers";
import { TractAddButtons } from "./TractAddButtons";

const LayoutToTest: GridLayoutTemplate = {
  name: "test",
  rows: ["2fr", "2fr", "2fr", "2fr"],
  cols: ["2fr", "2fr"],
  gap: "2rem",
  items: [] as GridItemDef[],
};

test("Shows the list of items", () => {
  const addIndex = 0;
  const defaultVal = "1fr";
  const onChange = jest.fn();
  // const onChange = (newVal: any) => console.log(newVal);

  renderWithRecoil(
    <AppWLayout layout={LayoutToTest}>
      <RecoilObserver node={rowsState} onChange={onChange} />
      <TractAddButtons dir="rows" />
    </AppWLayout>
  );

  const expectedRows = [...LayoutToTest.rows];
  expect(onChange).toHaveBeenCalledWith(expectedRows);

  const allAdderButtons = screen.getAllByRole("button");

  // Click the button to add a row of the default value in the index position
  userEvent.click(allAdderButtons[addIndex]);

  expectedRows.splice(addIndex, 0, defaultVal);
  expect(onChange).toHaveBeenCalledWith(expectedRows);

  // Add a new tract at the very end
  const lastTractAdder = screen.getAllByRole("button")[expectedRows.length];

  userEvent.click(lastTractAdder);
  expect(onChange).toHaveBeenCalledWith([...expectedRows, defaultVal]);
});

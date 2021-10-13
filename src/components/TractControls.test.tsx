import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TractControls } from "components/TractControls";
import { combinedItemsState } from "state-logic/gridItems";
import { colsState, rowsState } from "state-logic/gridLayout/atoms";
import { parseCSSMeasure } from "utils/css-helpers";
import InfoModal from "views/InfoModal";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../GridTypes";
import { AppWLayout, RecoilObserver, renderWithRecoil } from "../test-helpers";

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
  test("Can update tract sizing through increase/decrease buttons", () => {
    const initialValues: CSSMeasure[] = ["1fr", "1fr", "1fr"];
    const changedValues = [...initialValues];

    LayoutToTest.rows = initialValues;
    const onChange = jest.fn();

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={rowsState} onChange={onChange} />
        <TractControls dir="rows" />
      </AppWLayout>
    );

    // const initialValue = startingRows[0];
    const initialValue = parseCSSMeasure(initialValues[0]);
    if (!initialValue.count) return; // Make sure we're testing with non-auto units

    const firstRowSizer = screen.getByLabelText(/set size of row 0/i);

    const increaseButton = within(firstRowSizer).getByLabelText(/increase/i);
    const decreaseButton = within(firstRowSizer).getByLabelText(/decrease/i);

    expect(onChange).toHaveBeenLastCalledWith(initialValues);

    changedValues[0] = "2fr";
    userEvent.click(increaseButton);
    expect(onChange).toHaveBeenLastCalledWith(changedValues);

    changedValues[0] = "1fr";
    userEvent.click(decreaseButton);
    expect(onChange).toHaveBeenLastCalledWith(changedValues);
  });

  test("Units can be changed", () => {
    const initialValues: CSSMeasure[] = ["1fr", "1fr", "1fr"];
    const changedValues = [...initialValues];
    LayoutToTest.rows = initialValues;

    const onChange = jest.fn();

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={rowsState} onChange={onChange} />
        <TractControls dir="rows" />
      </AppWLayout>
    );

    // const initialValue = startingRows[0];
    const initialValue = parseCSSMeasure(initialValues[0]);
    if (!initialValue.count) return; // Make sure we're testing with non-auto units

    const unitInput = within(
      screen.getByLabelText(/set size of row 0/i)
    ).getByLabelText(/value-unit/i);

    expect(onChange).toHaveBeenLastCalledWith(initialValues);

    userEvent.selectOptions(unitInput, "px");

    changedValues[0] = "1px";
    expect(onChange).toHaveBeenLastCalledWith(changedValues);
  });

  test("Can update tract sizing by typing in text input and using arrow keys", () => {
    const initialValues: CSSMeasure[] = ["1fr", "1fr", "1fr"];
    const changedValues = [...initialValues];
    const onChange = jest.fn();
    // const onChange = (newVal: any) => console.log(newVal);

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={rowsState} onChange={onChange} />
        <TractControls dir="rows" />
      </AppWLayout>
    );

    const initialValue = parseCSSMeasure(LayoutToTest.rows[0]);
    if (!initialValue.count) return; // Make sure we're testing with non-auto units

    const textInput = within(
      screen.getByLabelText(/set size of row 0/i)
    ).getByLabelText(/value-count/i) as HTMLInputElement;

    // Clear the input and type 4
    textInput.setSelectionRange(0, textInput.value.length);
    userEvent.type(textInput, "{backspace}4");
    changedValues[0] = "4fr";
    expect(onChange).toHaveBeenLastCalledWith(changedValues);

    userEvent.type(textInput, "{arrowup}");
    changedValues[0] = "5fr";
    expect(onChange).toHaveBeenLastCalledWith(changedValues);

    userEvent.type(textInput, "{arrowdown}{arrowdown}");
    changedValues[0] = "3fr";
    expect(onChange).toHaveBeenLastCalledWith(changedValues);
  });
});

describe("Deleting tracts", () => {
  test("Deleting a tract with no items", () => {
    LayoutToTest.rows = ["1fr", "2fr", "3fr"];
    const onChange = jest.fn();

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={rowsState} onChange={onChange} />
        <TractControls dir="rows" />
      </AppWLayout>
    );

    userEvent.click(screen.getByLabelText(/delete row 0/i));
    expect(onChange).toHaveBeenLastCalledWith(["2fr", "3fr"]);

    // There's a new "row 0" now
    userEvent.click(screen.getByLabelText(/delete row 0/i));
    expect(onChange).toHaveBeenLastCalledWith(["3fr"]);
  });

  test("Items not fully contained in deleted tract get adjusted to new layout", () => {
    const LayoutToTest: GridLayoutTemplate = {
      name: "test",
      rows: ["1fr", "2fr"],
      cols: ["1fr", "1fr"],
      gap: "2rem",
      items: [
        { name: "a", startRow: 1, endRow: 2, startCol: 1, endCol: 1 },
        { name: "b", startRow: 1, endRow: 2, startCol: 2, endCol: 2 },
      ] as GridItemDef[],
    };

    const onItemsChange = jest.fn();
    const onRowsChange = jest.fn();

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={combinedItemsState} onChange={onItemsChange} />
        <RecoilObserver node={rowsState} onChange={onRowsChange} />
        <TractControls dir="rows" />
      </AppWLayout>
    );

    userEvent.click(screen.getByLabelText(/delete row 0/i));
    expect(onRowsChange).toHaveBeenLastCalledWith(["2fr"]);
    expect(onItemsChange).toHaveBeenLastCalledWith([
      { name: "a", startRow: 1, endRow: 1, startCol: 1, endCol: 1 },
      { name: "b", startRow: 1, endRow: 1, startCol: 2, endCol: 2 },
    ]);
  });

  test("Items fully contained in deleted tract will stop tract from being deleted", () => {
    const LayoutToTest: GridLayoutTemplate = {
      name: "test",
      rows: ["1fr", "1fr"],
      cols: ["1fr", "2fr"],
      gap: "2rem",
      items: [
        { name: "a", startRow: 1, endRow: 2, startCol: 1, endCol: 1 },
        { name: "b", startRow: 1, endRow: 2, startCol: 2, endCol: 2 },
      ] as GridItemDef[],
    };

    const onColsChange = jest.fn();

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={colsState} onChange={onColsChange} />
        <TractControls dir="cols" />
        <InfoModal />
      </AppWLayout>
    );

    userEvent.click(screen.getByLabelText(/delete column 0/i));
    expect(onColsChange).toHaveBeenLastCalledWith(["1fr", "2fr"]);
    expect(screen.getByRole("alertdialog")).toBeInTheDocument();
  });
});

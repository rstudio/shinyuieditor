import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { parseCSSMeasure } from "../css-helpers";
import { CSSMeasure, GridItemDef, GridLayoutTemplate } from "../GridTypes";
import { rowsState } from "../state-logic/gridLayout/atoms";
import { AppWLayout, RecoilObserver, renderWithRecoil } from "../test-helpers";
import { TractSizers } from "./TractSizers";

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

test("Can update tract sizing through increase/decrease buttons", () => {
  const initialValues: CSSMeasure[] = ["1fr", "1fr", "1fr"];
  const changedValues = [...initialValues];

  LayoutToTest.rows = initialValues;
  const onChange = jest.fn();

  renderWithRecoil(
    <AppWLayout layout={LayoutToTest}>
      <RecoilObserver node={rowsState} onChange={onChange} />
      <TractSizers dir="rows" />
    </AppWLayout>
  );

  // const initialValue = startingRows[0];
  const initialValue = parseCSSMeasure(initialValues[0]);
  if (!initialValue.count) return; // Make sure we're testing with non-auto units

  const firstRowSizer = screen.getByLabelText(/row 0/i);

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
      <TractSizers dir="rows" />
    </AppWLayout>
  );

  // const initialValue = startingRows[0];
  const initialValue = parseCSSMeasure(initialValues[0]);
  if (!initialValue.count) return; // Make sure we're testing with non-auto units

  const unitInput = within(screen.getByLabelText(/row 0/i)).getByLabelText(
    /value-unit/i
  );

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
      <TractSizers dir="rows" />
    </AppWLayout>
  );

  const initialValue = parseCSSMeasure(LayoutToTest.rows[0]);
  if (!initialValue.count) return; // Make sure we're testing with non-auto units

  const textInput = within(screen.getByLabelText(/row 0/i)).getByLabelText(
    /value-count/i
  ) as HTMLInputElement;

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

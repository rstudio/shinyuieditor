import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TractControls } from "components/TractControls";
import { combinedItemsState } from "state-logic/gridItems";
import { colsState, rowsState } from "state-logic/gridLayout/atoms";
import InfoModal from "views/InfoModal";
import { GridItemDef, GridLayoutTemplate } from "../GridTypes";
import { AppWLayout, RecoilObserver, renderWithRecoil } from "../test-helpers";
import { TractDeleteButton } from "./TractDeleteButton";

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

describe("Deleting tracts", () => {
  test("Deleting a tract with no items", () => {
    LayoutToTest.rows = ["1fr", "2fr", "3fr"];
    const onChange = jest.fn();

    renderWithRecoil(
      <AppWLayout layout={LayoutToTest}>
        <RecoilObserver node={rowsState} onChange={onChange} />
        <TractDeleteButton dir="rows" index={0} />
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
        <TractDeleteButton dir="rows" index={0} />
      </AppWLayout>
    );

    userEvent.click(screen.getByLabelText(/delete row 0/i));
    expect(onRowsChange).toHaveBeenLastCalledWith(["2fr"]);
    expect(onItemsChange).toHaveBeenLastCalledWith([
      { name: "a", startRow: 1, endRow: 1, startCol: 1, endCol: 1 },
      { name: "b", startRow: 1, endRow: 1, startCol: 2, endCol: 2 },
    ]);
  });

  test("Items fully contained in deleted tract will stop tract from being deleted immediately", () => {
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
        <TractDeleteButton dir="cols" index={0} />
      </AppWLayout>
    );

    const conflictPopup = screen.getByLabelText(/deletion conflict message/i)
      .parentElement;

    // Make sure the popup alerting of conflicts isnt prematurely visible
    expect(conflictPopup).not.toBeVisible();
    userEvent.click(screen.getByLabelText(/delete column 0/i));

    // Deletion did not immediately happen
    expect(onColsChange).toHaveBeenLastCalledWith(["1fr", "2fr"]);

    // Conflict popup should now be shown to the user
    expect(conflictPopup).toBeVisible();

    // Confirming and going forward will delete both the tract and the conflicting items
    userEvent.click(
      within(
        screen.getByLabelText(/deletion conflict message/i)
      ).getByText(/delete/i, { selector: "button" })
    );
    expect(onColsChange).toHaveBeenLastCalledWith(["2fr"]);

    // Now do the same deletion but this time exit without forcing deletion
    expect(conflictPopup).not.toBeVisible();
    userEvent.click(screen.getByLabelText(/delete column 0/i));
    expect(conflictPopup).toBeVisible();
    userEvent.click(
      within(
        screen.getByLabelText(/deletion conflict message/i)
      ).getByText(/cancel/i, { selector: "button" })
    );

    // After pressing the cancel button nothing should have happened other
    // than the popup dissapearing
    expect(onColsChange).toHaveBeenLastCalledWith(["2fr"]);
    expect(conflictPopup).not.toBeVisible();
  });
});

import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemsListView } from "../components/ItemsListView";
import { GridItemDef, GridLayoutTemplate } from "../GridTypes";
import { AppWLayout, RecoilObserver, renderWithRecoil } from "../test-helpers";
import { selectedItemState } from "./gridItems";

const layoutToTest: GridLayoutTemplate = {
  name: "Four Square",
  rows: ["1fr", "1fr"],
  cols: ["1fr", "1fr"],
  gap: "2rem",
  items: [
    { name: "itemA", startRow: 1, endRow: 1, startCol: 1, endCol: 1 },
    { name: "itemB", startRow: 2, endRow: 2, startCol: 1, endCol: 1 },
    { name: "itemC", startRow: 1, endRow: 1, startCol: 2, endCol: 2 },
  ] as GridItemDef[],
};

// The goal of these tests is to test that the tract updaters properly update
// the state of the app. We already test that the CSSUnitInput component works
// the way it should in it's separate tests. That's why we watch the recoil
// value instead of looking at the text of the input

describe("Items can be selected by clicking on either list or grid representation", () => {
  test("List representation", () => {
    const onChange = jest.fn();
    // const onChange = (newVal: any) => console.log(newVal);

    renderWithRecoil(
      <AppWLayout layout={layoutToTest}>
        <RecoilObserver node={selectedItemState} onChange={onChange} />
        <ItemsListView />
      </AppWLayout>
    );

    // Select an item by clicking on it
    const firstSelection = layoutToTest.items[0];
    const firstItemContainer = screen.getByLabelText(
      firstSelection.name + "-item"
    );
    expect(firstItemContainer).toHaveAttribute("aria-selected", "false");
    userEvent.click(firstItemContainer);
    expect(onChange).toHaveBeenLastCalledWith(firstSelection);
    expect(firstItemContainer).toHaveAttribute("aria-selected", "true");

    // Selecting another item should switch the selected to that item
    const secondSelection = layoutToTest.items[1];
    const secondItemContainer = screen.getByLabelText(
      secondSelection.name + "-item"
    );
    expect(secondItemContainer).toHaveAttribute("aria-selected", "false");
    userEvent.click(secondItemContainer);
    expect(onChange).toHaveBeenLastCalledWith(secondSelection);
    expect(secondItemContainer).toHaveAttribute("aria-selected", "true");

    // Clicking the item while it's already selected should reset selection
    userEvent.click(secondItemContainer);
    expect(secondItemContainer).toHaveAttribute("aria-selected", "false");
    expect(onChange).toHaveBeenLastCalledWith(null);

    // Selecting an item and then deleting it will reset selection
    userEvent.click(firstItemContainer);
    userEvent.click(screen.getByLabelText("Delete " + firstSelection.name));
    expect(onChange).toHaveBeenLastCalledWith(null);
  });

  test("List representation", () => {
    const onChange = jest.fn();
    // const onChange = (newVal: any) => console.log(newVal);

    renderWithRecoil(
      <AppWLayout layout={layoutToTest}>
        <RecoilObserver node={selectedItemState} onChange={onChange} />
        <ItemsListView />
      </AppWLayout>
    );

    // Select an item by clicking on it
    const firstSelection = layoutToTest.items[0];
    const firstItemContainer = screen.getByLabelText(
      firstSelection.name + "-item"
    );
  });
});

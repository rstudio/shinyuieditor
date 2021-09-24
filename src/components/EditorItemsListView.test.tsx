import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { gridItemNames, useDeleteItem } from "../state-logic/gridItems";
import {
  renderWithRecoil,
  useInitializeToDefaultLayout,
} from "../test-helpers";
import { EditorItemsListView } from "./EditorItemsListView";

function ListViewRunner({ addLayout = true }: { addLayout?: boolean }) {
  useInitializeToDefaultLayout(addLayout === true ? "default" : "none");

  const deleteItem = useDeleteItem();
  return (
    <EditorItemsListView
      itemNamesAtom={gridItemNames}
      deleteItem={deleteItem}
    />
  );
}

test("Shows the list of items", () => {
  renderWithRecoil(<ListViewRunner />);
  expect(screen.getAllByLabelText(/item-name/i).length).toBeGreaterThan(0);
});

test("No items = no elements", () => {
  renderWithRecoil(<ListViewRunner addLayout={false} />);
  expect(screen.getByLabelText(/no-items-message/i)).toBeInTheDocument();
});

test("Clicking on an item selects it", () => {
  renderWithRecoil(<ListViewRunner />);

  const listItems = screen.getAllByLabelText(/-item/);
  const [firstItem, secondItem] = listItems;

  // Clicking selects the first item
  userEvent.click(firstItem);
  expect(firstItem).toHaveClass("selected");

  // Clicking second item unselects first and selects second
  userEvent.click(secondItem);
  expect(secondItem).toHaveClass("selected");
  expect(firstItem).not.toHaveClass("selected");

  // Clicking second again unselects all
  userEvent.click(secondItem);
  expect(secondItem).not.toHaveClass("selected");
  expect(firstItem).not.toHaveClass("selected");
});

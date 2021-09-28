import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppWLayout, renderWithRecoil } from "../test-helpers";
import { ItemsListView } from "./ItemsListView";

test("Shows the list of items", () => {
  renderWithRecoil(
    <AppWLayout layout="default">
      <ItemsListView />
    </AppWLayout>
  );
  expect(screen.getAllByLabelText(/item-name/i).length).toBeGreaterThan(0);
});

test("No items = no elements", () => {
  renderWithRecoil(
    <AppWLayout layout="none">
      <ItemsListView />
    </AppWLayout>
  );
  expect(screen.getByLabelText(/no-items-message/i)).toBeInTheDocument();
});

test("Clicking on an item selects it", () => {
  renderWithRecoil(
    <AppWLayout layout="default">
      <ItemsListView />
    </AppWLayout>
  );

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

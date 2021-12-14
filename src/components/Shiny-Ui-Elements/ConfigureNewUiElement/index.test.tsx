import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfigureNewUiElement from ".";

test("Basic usage of new item adding", () => {
  const onFinishMock = jest.fn();
  const onCancelMock = jest.fn();

  render(
    <ConfigureNewUiElement
      onFinish={onFinishMock}
      onCancel={onCancelMock}
      existingElementNames={[]}
    />
  );

  userEvent.type(screen.getByLabelText(/grid area name/i), "my-new-item");
  userEvent.click(screen.getByText(/plotOutput/i));
  userEvent.click(screen.getByText(/add item/i));

  // Avoid hardcoding the default props
  expect(onFinishMock).toHaveBeenLastCalledWith({
    name: "my-new-item",
    ui: {
      componentName: "plotOutput",
      componentProps: expect.any(Object),
    },
  });
});

test("Gives warning message when a non-conforming names are typed", () => {
  const onFinishMock = jest.fn();
  const onCancelMock = jest.fn();

  render(
    <ConfigureNewUiElement
      onFinish={onFinishMock}
      onCancel={onCancelMock}
      existingElementNames={["existing-item"]}
    />
  );

  const nameInput = screen.getByLabelText(/grid area name/i);

  // Invalid names are caught in real-time
  userEvent.type(nameInput, "1a");
  expect(nameInput).toBeInvalid();

  // Goes away when fixed
  userEvent.type(nameInput, "{backspace}{backspace}a");
  expect(nameInput).not.toBeInvalid();

  // Invalidation also occurs if the current name typed is the same as an
  // existing item
  userEvent.type(nameInput, "{backspace}existing-item");
  expect(nameInput).toBeInvalid();

  userEvent.type(nameInput, "2");
  userEvent.click(screen.getByText(/plotOutput/i));
  expect(nameInput).not.toBeInvalid();
  userEvent.click(screen.getByText(/add item/i));

  // Avoid hardcoding the default props
  expect(onFinishMock).toHaveBeenLastCalledWith({
    name: "existing-item2",
    ui: {
      componentName: "plotOutput",
      componentProps: expect.any(Object),
    },
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GridLayoutTemplate, GridItemDef } from "GridTypes";
import ConfigureNewUiElement from ".";

const LayoutToTest: GridLayoutTemplate = {
  name: "test",
  rows: ["1fr", "1fr"],
  cols: ["1fr", "1fr"],
  gap: "2rem",
  items: [] as GridItemDef[],
};

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
  expect(onFinishMock).toHaveBeenLastCalledWith(
    expect.objectContaining({
      name: "my-new-item",
      ui: {
        componentName: "plotOutput",
        componentProps: expect.any(Object),
      },
    })
  );
});

// test("Gives warning message when a non-conforming name is typed", () => {
//   const onChangeMock = jest.fn();
//   const onCloseMock = jest.fn();

//   // const onChange = (newVal: any) => console.log(newVal);

//   renderWithRecoil(
//     <AppWLayout
//       layout={{
//         ...LayoutToTest,
//         items: [
//           {
//             name: "existing-item",
//             startRow: 1,
//             endRow: 1,
//             startCol: 1,
//             endCol: 1,
//           },
//         ],
//       }}
//     >
//       <RecoilObserver node={combinedItemsState} onChange={onChangeMock} />
//       <ConfigureNewItemForm
//         itemPos={{ startRow: 2, endRow: 2, startCol: 1, endCol: 1 }}
//         onFinish={onCloseMock}
//       />
//     </AppWLayout>
//   );

//   const nameInput = screen.getByLabelText(/item name/i);

//   // Invalid names are caught in real-time
//   userEvent.type(nameInput, "1a");
//   expect(nameInput).toBeInvalid();

//   // Goes away when fixed
//   userEvent.type(nameInput, "{backspace}{backspace}a");
//   expect(nameInput).not.toBeInvalid();

//   // Invalidation also occurs if the current name typed is the same as an
//   // existing item
//   userEvent.type(nameInput, "{backspace}existing-item");
//   expect(nameInput).toBeInvalid();

//   userEvent.type(nameInput, "2");
//   expect(nameInput).not.toBeInvalid();
//   userEvent.click(screen.getByText(/add item/i));

//   expect(onChangeMock).toHaveBeenLastCalledWith([
//     {
//       name: "existing-item",
//       startRow: 1,
//       endRow: 1,
//       startCol: 1,
//       endCol: 1,
//     },
//     {
//       name: "existing-item2",
//       startRow: 2,
//       endRow: 2,
//       startCol: 1,
//       endCol: 1,
//     },
//   ]);
//   expect(onCloseMock).toBeCalled();
// });

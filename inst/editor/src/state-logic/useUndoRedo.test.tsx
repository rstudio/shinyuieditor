// Old test logic from when using recoil left for postarity's sake

// import { screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import HistoryNav from "components/HistoryNav";
// import { TractAddButtons } from "components/TractAddButtons";
// import { rowsState } from "state-logic/gridLayout/atoms";
// import { GridItemDef, GridLayoutTemplate } from "../GridTypes";
// import { AppWLayout, RecoilObserver, renderWithRecoil } from "../test-helpers";

// const LayoutToTest: GridLayoutTemplate = {
//   name: "test",
//   rows: ["2fr", "2fr", "2fr", "2fr"],
//   cols: ["2fr", "2fr"],
//   gap: "2rem",
//   items: [] as GridItemDef[],
// };

test("Placeholder until implemented", () => {
  expect(true).toBe(true);
});

// describe("Undo and redo buttons do what they should", () => {
//   const addIndex = 0;
//   const defaultVal = "1fr";
//   const onChange = jest.fn();
//   // const onChange = (newVal: any) => console.log(newVal);

//   renderWithRecoil(
//     <AppWLayout layout={LayoutToTest}>
//       <RecoilObserver node={rowsState} onChange={onChange} />
//       <HistoryNav />
//       <TractAddButtons dir="rows" />
//     </AppWLayout>
//   );

//   const allAdderButtons = screen.getAllByLabelText(/add row/i);
//   const redoButton = screen.getByLabelText(/redo/i);
//   const undoButton = screen.getByLabelText(/undo/i);

//   const expectedRows = [...LayoutToTest.rows];
//   expectedRows.splice(addIndex, 0, defaultVal);

//   const numAdderButtons = () => screen.getAllByLabelText(/add row/i).length;
//   const initialNumButtons = numAdderButtons();
//   test("Undo and redo buttons should start in proper states", () => {
//     // On first load neither of the navigation buttons should be working
//     expect(redoButton).toBeDisabled();
//     expect(undoButton).toBeDisabled();

//     // After we add a row the state has updated and we have a history that can
//     // be navigated back into, but not forward into
//     userEvent.click(allAdderButtons[addIndex]);
//     userEvent.click(allAdderButtons[addIndex]);
//     expect(undoButton).not.toBeDisabled();
//     expect(redoButton).toBeDisabled();

//     // Make sure we actually changed the state
//     expect(numAdderButtons()).toBe(initialNumButtons + 2);

//     // Navigate back into the history
//     userEvent.click(undoButton);
//     expect(numAdderButtons()).toBe(initialNumButtons + 1);

//     userEvent.click(undoButton);
//     expect(numAdderButtons()).toBe(initialNumButtons);
//     // First make sure that the state is back to the initial point

//     // Now that we're in the history stack the redo button should be available...
//     expect(redoButton).not.toBeDisabled();
//     // ... but the undo button should not be as we're at the base of the stack
//     expect(undoButton).toBeDisabled();

//     // Now we can redo our change
//     userEvent.click(redoButton);
//     // This should give us the same state as before
//     expect(numAdderButtons()).toBe(initialNumButtons + 1);

//     // Now if we go backwards into the stack and then change something
//     // we should clear the top of the stack, and thus not be able to go forward

//     // Go backwards
//     userEvent.click(undoButton);
//     // Make sure redo button is not disabled
//     expect(redoButton).not.toBeDisabled();

//     // Make some change to the state
//     userEvent.click(allAdderButtons[addIndex + 1]);
//     // Now the redo button should be disabled again because we've thrown away the
//     // top of the history stack
//     expect(redoButton).toBeDisabled();
//   });
// });
export {};

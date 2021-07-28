import { PlusIcon, TrashcanIcon } from "./icons";

export const TheInstructions = () => (
  <>
    <strong>Add or remove a row/column:</strong>
    <ul>
      <li>
        Click the <PlusIcon /> in gaps between rows and columns to add a row or
        column at that location
      </li>
      <li>
        Click the <TrashcanIcon /> next to the row/column sizing controls to
        remove it
      </li>
    </ul>
    <strong>Add an element:</strong>
    <ul>
      <li>Click and drag over the grid to define a region</li>
      <li>Enter id of element in popup</li>
    </ul>
    <strong>Edit an element:</strong>
    <ul>
      <li>
        Drag the upper left, middle, or bottom right corners of the element to
        reposition
      </li>
    </ul>
    <strong>Remove an element:</strong>
    <ul>
      <li>
        Find element entry in "Added elements" panel and click the{" "}
        <TrashcanIcon />
        icon
      </li>
      <li>You can't remove elements are part of a running app</li>
    </ul>
  </>
);

/** @jsxImportSource @emotion/react */

import * as React from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GridCard } from "./GridCard";

export function EditorInstructions() {
  return (
    <GridCard title="Instructions" icon="instructions" gridArea="instructions">
      <div
        css={{
          "& strong": {
            fontWeight: 500,
          },
          "& svg": {
            display: "inline",
            maxHeight: "1.3rem",
            marginBottom: "3px",
          },
          "> ul": {
            marginTop: "0.5rem",
            marginBottom: "1rem",
            marginLeft: "1rem",
            marginRight: "0.75rem",
          },
        }}
      >
        <strong>Add or remove a row/column:</strong>
        <ul>
          <li>
            Click the <FaPlus /> in gaps between rows and columns to add a row
            or column at that location
          </li>
          <li>
            Click the <FaTrash /> next to the row/column sizing controls to
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
            Drag the upper left, middle, or bottom right corners of the element
            to reposition
          </li>
        </ul>
        <strong>Remove an element:</strong>
        <ul>
          <li>
            Find element entry in &quot;Added elements&quot; panel and click the
            <FaTrash />
            icon
          </li>
          <li>You can&apos;t remove elements are part of a running app</li>
        </ul>
      </div>
    </GridCard>
  );
}

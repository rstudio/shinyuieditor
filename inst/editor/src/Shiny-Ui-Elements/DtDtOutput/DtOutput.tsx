import React from "react";

import { seqArray } from "util-functions/src/arrays";

import { InputOutputTitle } from "../InputOutputTitle";
import type { UiNodeComponent } from "../uiNodeTypes";

import type { DTOutputSettings } from "./index";

import "./styles.scss";

const NUM_COLS = 4;
const NUM_ROWS = 25;

const table_cells = seqArray(NUM_ROWS).map((i) => (
  <div className="faux-row" key={i}>
    {seqArray(NUM_COLS).map((i) => (
      <div className="faux-cell" key={i}>
        i
      </div>
    ))}
  </div>
));
const DtDTOutput: UiNodeComponent<
  DTOutputSettings,
  { TakesChildren: false }
> = ({ namedArgs, path, wrapperProps }) => {
  return (
    <div className="dtDTOutput" {...wrapperProps}>
      <div
        className="faux-table"
        style={
          {
            "--table-w": namedArgs.width,
            "--table-h": namedArgs.height,
          } as React.CSSProperties
        }
      >
        <div className="faux-header">
          Table: <InputOutputTitle type="output" name={namedArgs.outputId} />
        </div>
        <div className="faux-table-body">{table_cells}</div>
      </div>
    </div>
  );
};

export default DtDTOutput;

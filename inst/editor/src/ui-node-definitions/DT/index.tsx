import { seqArray } from "util-functions/src/arrays";

import "./styles.scss";
import icon from "../../assets/icons/shinyTable.png";
import { addEditorInfoToUiNode } from "../utils/add_editor_info_to_ui_node";
import { InputOutputTitle } from "../utils/InputOutputTitle";

import { output_dt } from "./output_dt";

export const dtDTOutputInfo = addEditorInfoToUiNode(output_dt, {
  iconSrc: icon,
  UiComponent: ({ namedArgs, path, wrapperProps }) => {
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
  },
});

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

import { seqArray } from "util-functions/src/arrays";

import icon from "../../assets/icons/shinyTable.png";
import type { CSSMeasure } from "../inputFieldTypes";
import { nodeInfoFactory } from "../nodeInfoFactory";
import { InputOutputTitle } from "../utils/InputOutputTitle";
import "./styles.scss";

export const output_dt = nodeInfoFactory<{
  outputId: string;
  width?: CSSMeasure;
  height?: CSSMeasure;
}>()({
  id: "DTOutput",
  r_info: {
    fn_name: "DTOutput",
    package: "DT",
    output_bindings: {
      renderScaffold: {
        fn_name: "renderDT",
        fn_body: `iris`,
      },
    },
  },
  title: "DT Table",
  takesChildren: false,
  settingsInfo: {
    outputId: {
      inputType: "id",
      inputOrOutput: "output",
      label: "Output ID",
      defaultValue: "myTable",
    },
    width: {
      inputType: "cssMeasure",
      label: "Width",
      defaultValue: "100%",
      units: ["%", "px", "rem"],
      optional: true,
      useDefaultIfOptional: true,
    },
    height: {
      label: "Height",
      inputType: "cssMeasure",
      defaultValue: "auto",
      optional: true,
    },
  },
  iconSrc: icon,
  category: "Outputs",
  description: `\`DataTable\` table output`,
  ui_component: ({ namedArgs, path, wrapperProps }) => {
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

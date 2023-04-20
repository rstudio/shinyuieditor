import type { Generated_UI_Def } from "communication-types/src/MessageToBackend";
import type { ShinyUiNode } from "../ShinyUiNode";

import { ui_node_to_code } from "./ui_node_to_code";

function ui_node_to_python_code(node: ShinyUiNode): Generated_UI_Def {
  return ui_node_to_code(node, "PYTHON");
}

describe("Can turn ShinyUiNode into function call text with formatting", () => {
  test("Handles child arguments", () => {
    // prettier-ignore
    const expected_result = 
`ui.input_slider(
  id = "obs",
  label = "Number of bins:",
  value = 30,
  min = 10,
  max = 100
)`;

    expect(
      ui_node_to_python_code({
        id: "sliderInput",
        namedArgs: {
          inputId: "obs",
          label: "Number of bins:",
          value: 30,
          min: 10,
          max: 100,
        },
      }).code
    ).toBe(expected_result);
  });

  test("Place required named args as positional arguments before named arguments if they exist", () => {
    // prettier-ignore
    const expected_result = 
`ui.nav(
  "Tab A",
  ui.input_slider(
    id = "obs",
    label = "Number of bins:",
    value = 30,
    min = 10,
    max = 100
  )
)`;

    expect(
      ui_node_to_python_code({
        id: "tabPanel",
        namedArgs: {
          title: "Tab A",
        },
        children: [
          {
            id: "sliderInput",
            namedArgs: {
              inputId: "obs",
              label: "Number of bins:",
              value: 30,
              min: 10,
              max: 100,
            },
          },
        ],
      }).code
    ).toBe(expected_result);
  });

  //   test("Short named lists can be kept on same line", () => {
  //     // prettier-ignore
  //     const expected_result =
  // `shiny::selectInput(
  //   inputId = "selector",
  //   label = "My Select",
  //   choices = list("choice a" = "a", "choice b" = "b")
  // )`;

  //     expect(
  //       ui_node_to_R_code(
  //         {
  //           id: "selectInput",
  //           namedArgs: {
  //             inputId: "selector",
  //             label: "My Select",
  //             choices: {
  //               "choice a": "a",
  //               "choice b": "b",
  //             },
  //           },
  //         },
  //         { remove_namespace: false }
  //       ).ui_code
  //     ).toBe(expected_result);
  //   });

  //   test("Handles array arguments", () => {
  //     // prettier-ignore
  //     const expected_result =
  // `gridlayout::grid_page(
  //   layout = c(
  //     "A B",
  //     "C D"
  //   ),
  //   col_sizes = c(
  //     "100px",
  //     "1fr"
  //   ),
  //   row_sizes = c(
  //     "1fr",
  //     "2fr"
  //   ),
  //   gap_size = "12px"
  // )`;

  //     expect(
  //       ui_node_to_R_code(
  //         {
  //           id: "grid_page",
  //           namedArgs: {
  //             layout: ["A B", "C D"],
  //             col_sizes: ["100px", "1fr"],
  //             row_sizes: ["1fr", "2fr"],
  //             gap_size: "12px",
  //           },
  //         },
  //         { remove_namespace: false }
  //       ).ui_code
  //     ).toBe(expected_result);
  //   });
});

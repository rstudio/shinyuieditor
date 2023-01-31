import type { ShinyUiNode } from "editor";

import { build_ui_node_function_text } from "./build_ui_node_function_text";

describe("Can turn ShinyUiNode into function call text with formatting", () => {
  test("Simple one argument function", () => {
    expect(
      build_ui_node_function_text({
        uiName: "shiny::textOutput",
        uiArguments: {
          outputId: "myTextOutput",
        },
      })
    ).toBe(`shiny::textOutput(outputId = "myTextOutput")`);
  });

  test("Multi-argument functions put arguments on their own lines", () => {
    // prettier-ignore
    const expected_result = 
`shiny::sliderInput(
  inputId = "my_slider",
  label = "My Slider",
  value = 5,
  min = 0,
  max = 12
)`;
    expect(
      build_ui_node_function_text({
        uiName: "shiny::sliderInput",
        uiArguments: {
          inputId: "my_slider",
          label: "My Slider",
          value: 5,
          min: 0,
          max: 12,
        },
      })
    ).toBe(expected_result);
  });

  test("Handles child arguments", () => {
    // prettier-ignore
    const expected_result = 
`gridlayout::grid_card(
  area = "sidebar",
  shiny::sliderInput(
    inputId = "my_slider",
    label = "My Slider",
    value = 5,
    min = 0,
    max = 12
  )
)`;

    expect(
      build_ui_node_function_text({
        uiName: "gridlayout::grid_card",
        uiArguments: {
          area: "sidebar",
        },
        uiChildren: [
          {
            uiName: "shiny::sliderInput",
            uiArguments: {
              inputId: "my_slider",
              label: "My Slider",
              value: 5,
              min: 0,
              max: 12,
            },
          },
        ],
      })
    ).toBe(expected_result);
  });
  test("Handles named list arguments", () => {
    // prettier-ignore
    const expected_result = 
`shiny::selectInput(
  inputId = "selector",
  label = "My Select",
  choices = list(
    "choice a" = "a",
    "choice b" = "b",
    "choice c" = "c",
    "choice d" = "d"
  )
)`;

    expect(
      build_ui_node_function_text({
        uiName: "shiny::selectInput",
        uiArguments: {
          inputId: "selector",
          label: "My Select",
          choices: {
            "choice a": "a",
            "choice b": "b",
            "choice c": "c",
            "choice d": "d",
          },
        },
      })
    ).toBe(expected_result);
  });
  test("Short named lists can be kept on same line", () => {
    // prettier-ignore
    const expected_result = 
`shiny::selectInput(
  inputId = "selector",
  label = "My Select",
  choices = list("choice a" = "a", "choice b" = "b")
)`;

    expect(
      build_ui_node_function_text({
        uiName: "shiny::selectInput",
        uiArguments: {
          inputId: "selector",
          label: "My Select",
          choices: {
            "choice a": "a",
            "choice b": "b",
          },
        },
      })
    ).toBe(expected_result);
  });

  test("Handles array arguments", () => {
    // prettier-ignore
    const expected_result =
`gridlayout::grid_page(
  layout = c(
    "A B",
    "C D"
  ),
  col_sizes = c(
    "100px",
    "1fr"
  ),
  row_sizes = c(
    "1fr",
    "2fr"
  ),
  gap_size = "12px"
)`;

    expect(
      build_ui_node_function_text({
        uiName: "gridlayout::grid_page",
        uiArguments: {
          layout: ["A B", "C D"],
          col_sizes: ["100px", "1fr"],
          row_sizes: ["1fr", "2fr"],
          gap_size: "12px",
        },
      })
    ).toBe(expected_result);
  });

  test("Unpacks unknown ui nodes", () => {
    // prettier-ignore
    const expected_result =
`gridlayout::grid_card(
  area = "mystery",
  myCoolCustomRFunction(arg1, arg2)
)`;

    expect(
      build_ui_node_function_text({
        uiName: "gridlayout::grid_card",
        uiArguments: { area: "mystery" },
        uiChildren: [
          {
            uiName: "unknownUiFunction",
            uiArguments: {
              text: `myCoolCustomRFunction(arg1, arg2)`,
            },
          },
        ],
      })
    ).toBe(expected_result);
  });
});

describe("Full UI example", () => {
  // prettier-ignore
  const ui_as_r_code = 
`gridlayout::grid_page(
  layout = c(
    "header header",
    "sidebar plot",
    "sidebar plot"
  ),
  row_sizes = c(
    "100px",
    "1fr",
    "1fr"
  ),
  col_sizes = c(
    "250px",
    "1fr"
  ),
  gap_size = "1rem",
  gridlayout::grid_card_text(
    area = "header",
    content = "My App",
    alignment = "start",
    is_title = true
  ),
  gridlayout::grid_card(
    area = "sidebar",
    shiny::sliderInput(
      inputId = "mySlider",
      label = "Slider",
      min = 2,
      max = 11,
      value = 7
    ),
    shiny::numericInput(
      inputId = "myNumericInput",
      label = "Numeric Input",
      min = 2,
      max = 11,
      value = 7,
      width = "100%"
    ),
    myCoolCustomRFunction(arg1, arg2)
  ),
  gridlayout::grid_card_plot(area = "plot")
)`

  const ui_ast: ShinyUiNode = {
    uiName: "gridlayout::grid_page",
    uiArguments: {
      layout: ["header header", "sidebar plot", "sidebar plot"],
      row_sizes: ["100px", "1fr", "1fr"],
      col_sizes: ["250px", "1fr"],
      gap_size: "1rem",
    },
    uiChildren: [
      {
        uiName: "gridlayout::grid_card_text",
        uiArguments: {
          area: "header",
          content: "My App",
          alignment: "start",
          is_title: true,
        },
      },
      {
        uiName: "gridlayout::grid_card",
        uiArguments: {
          area: "sidebar",
        },
        uiChildren: [
          {
            uiName: "shiny::sliderInput",
            uiArguments: {
              inputId: "mySlider",
              label: "Slider",
              min: 2,
              max: 11,
              value: 7,
            },
          },
          {
            uiName: "shiny::numericInput",
            uiArguments: {
              inputId: "myNumericInput",
              label: "Numeric Input",
              min: 2,
              max: 11,
              value: 7,
              width: "100%",
            },
          },
          {
            uiName: "unknownUiFunction",
            uiArguments: {
              text: `myCoolCustomRFunction(arg1, arg2)`,
            },
          },
        ],
      },
      {
        uiName: "gridlayout::grid_card_plot",
        uiArguments: {
          area: "plot",
        },
      },
    ],
  };

  expect(build_ui_node_function_text(ui_ast)).toBe(ui_as_r_code);
});

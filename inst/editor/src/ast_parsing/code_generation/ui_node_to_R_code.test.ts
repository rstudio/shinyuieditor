import type {
  KnownShinyUiNode,
  ShinyUiNode,
} from "../../Shiny-Ui-Elements/uiNodeTypes";

import { ui_node_to_R_code } from "./ui_node_to_R_code";

describe("Can keep or remove namespaces", () => {
  const ui_ast: ShinyUiNode = {
    id: "grid_card",
    namedArgs: {
      area: "sidebar",
    },
    children: [
      {
        id: "sliderInput",
        namedArgs: {
          inputId: "my_slider",
          label: "My Slider",
          value: 5,
          min: 0,
          max: 12,
        },
      },
    ],
  };

  test("Keeping namespaces", () => {
    // prettier-ignore
    const with_namespaces = 
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
    const { code: ui_code, packages: library_calls } = ui_node_to_R_code(
      ui_ast,
      {
        remove_namespace: false,
      }
    );
    expect(ui_code).toBe(with_namespaces);
    expect(library_calls).toStrictEqual([]);
  });

  test("Removing namespaces", () => {
    // prettier-ignore
    const no_namespaces = 
`grid_card(
  area = "sidebar",
  sliderInput(
    inputId = "my_slider",
    label = "My Slider",
    value = 5,
    min = 0,
    max = 12
  )
)`;

    const { code: ui_code, packages: library_calls } = ui_node_to_R_code(
      ui_ast,
      {
        remove_namespace: true,
      }
    );
    expect(ui_code).toBe(no_namespaces);
    expect(library_calls).toStrictEqual(["gridlayout", "shiny"]);
  });
});

describe("Handles nodes with ui nodes as named arguments", () => {
  test("value boxes", () => {
    const value_box_node: KnownShinyUiNode = {
      id: "value_box",
      namedArgs: {
        title: "My Title",
        value: {
          id: "textOutput",
          namedArgs: {
            outputId: "my_text",
          },
        },
        showcase_icon: "github",
      },
      children: [],
    };

    // prettier-ignore
    const expected_result = 
`value_box(
  title = "My Title",
  value = textOutput(outputId = "my_text"),
  showcase = bsicons::bs_icon("github")
)`;

    expect(
      ui_node_to_R_code(value_box_node, { remove_namespace: true }).code
    ).toBe(expected_result);
  });
});

describe("Can turn ShinyUiNode into function call text with formatting", () => {
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
      ui_node_to_R_code(
        {
          id: "grid_card",
          namedArgs: {
            area: "sidebar",
          },
          children: [
            {
              id: "sliderInput",
              namedArgs: {
                inputId: "my_slider",
                label: "My Slider",
                value: 5,
                min: 0,
                max: 12,
              },
            },
          ],
        },
        { remove_namespace: false }
      ).code
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
      ui_node_to_R_code(
        {
          id: "selectInput",
          namedArgs: {
            inputId: "selector",
            label: "My Select",
            choices: {
              "choice a": "a",
              "choice b": "b",
              "choice c": "c",
              "choice d": "d",
            },
          },
        },
        { remove_namespace: false }
      ).code
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
      ui_node_to_R_code(
        {
          id: "selectInput",
          namedArgs: {
            inputId: "selector",
            label: "My Select",
            choices: {
              "choice a": "a",
              "choice b": "b",
            },
          },
        },
        { remove_namespace: false }
      ).code
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
      ui_node_to_R_code(
        {
          id: "grid_page",
          namedArgs: {
            layout: ["A B", "C D"],
            col_sizes: ["100px", "1fr"],
            row_sizes: ["1fr", "2fr"],
            gap_size: "12px",
          },
        },
        { remove_namespace: false }
      ).code
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
      ui_node_to_R_code(
        {
          id: "grid_card",
          namedArgs: { area: "mystery" },
          children: [
            {
              id: "unknownUiFunction",
              namedArgs: {
                text: `myCoolCustomRFunction(arg1, arg2)`,
              },
            },
          ],
        },
        { remove_namespace: false }
      ).code
    ).toBe(expected_result);
  });
});

test("Full UI example", () => {
  // prettier-ignore
  const ui_as_r_code = 
`grid_page(
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
  theme = bslib::bs_theme(),
  grid_card_text(
    area = "header",
    content = "My App",
    alignment = "start",
    is_title = TRUE
  ),
  grid_card(
    area = "sidebar",
    sliderInput(
      inputId = "mySlider",
      label = "Slider",
      min = 2,
      max = 11,
      value = 7
    ),
    numericInput(
      inputId = "myNumericInput",
      label = "Numeric Input",
      min = 2,
      max = 11,
      value = 7,
      width = "100%"
    ),
    myCoolCustomRFunction(arg1, arg2)
  ),
  grid_card_plot(area = "plot")
)`

  const ui_ast: ShinyUiNode = {
    id: "grid_page",
    namedArgs: {
      layout: ["header header", "sidebar plot", "sidebar plot"],
      row_sizes: ["100px", "1fr", "1fr"],
      col_sizes: ["250px", "1fr"],
      gap_size: "1rem",
      theme: {
        id: "unknownUiFunction",
        namedArgs: {
          text: "bslib::bs_theme()",
        },
      },
    },
    children: [
      {
        id: "grid_card_text",
        namedArgs: {
          area: "header",
          content: "My App",
          alignment: "start",
          is_title: true,
        },
      },
      {
        id: "grid_card",
        namedArgs: {
          area: "sidebar",
        },
        children: [
          {
            id: "sliderInput",
            namedArgs: {
              inputId: "mySlider",
              label: "Slider",
              min: 2,
              max: 11,
              value: 7,
            },
          },
          {
            id: "numericInput",
            namedArgs: {
              inputId: "myNumericInput",
              label: "Numeric Input",
              min: 2,
              max: 11,
              value: 7,
              width: "100%",
            },
          },
          {
            id: "unknownUiFunction",
            namedArgs: {
              text: `myCoolCustomRFunction(arg1, arg2)`,
            },
          },
        ],
      },
      {
        id: "grid_card_plot",
        namedArgs: {
          area: "plot",
        },
      },
    ],
  };

  expect(ui_node_to_R_code(ui_ast, { remove_namespace: true }).code).toBe(
    ui_as_r_code
  );
});

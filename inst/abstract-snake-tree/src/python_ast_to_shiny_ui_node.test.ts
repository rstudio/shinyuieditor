import type { KnownShinyUiNode } from "ui-node-definitions/src/uiNodeTypes";

import { parse_python_script } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";
import { treesitter_to_ui_tree } from "./NodeTypes/ts_node_to_ui_tree";

export const basicNavbarPage = {
  id: "navbarPage",
  namedArgs: {
    title: "My Navbar Page",
    collapsible: false,
  },
  children: [
    {
      id: "tabPanel",
      namedArgs: {
        title: "Settings",
      },
      children: [
        {
          id: "sliderInput",
          namedArgs: {
            inputId: "inputId",
            label: "Slider Input",
            min: 0,
            max: 10,
            value: 5,
            width: "100%",
          },
        },
      ],
    },
    {
      id: "tabPanel",
      namedArgs: {
        title: "Plot 1",
      },
      children: [
        {
          id: "plotOutput",
          namedArgs: {
            outputId: "MyPlot",
            width: "100%",
            height: "100%",
          },
        },
      ],
    },
  ],
} satisfies KnownShinyUiNode;

const navbar_page_app = `
from shiny import *

app_ui = ui.page_navbar(
  ui.nav(
    "Settings",
    ui.input_slider(
      id = "inputId",
      label = "Slider Input",
      min = 0,
      max = 10,
      value = 5.5,
      width = "100%"
    )
  ),
  ui.nav(
    "Plot 1",
    ui.output_plot(
      id = "MyPlot",
      width = "100%",
      height = "100%"
    )
  ),
  title = "My Navbar Page",
  collapsible = False
)

def server(input, output, session):
  pass

app = App(app_ui, server)
`;

const sliderInputDef = `
from shiny import *

my_slider = ui.input_slider(
  id = "inputId",
  label = "Slider Input",
  min = 0,
  max = 10,
  value = 5.5,
  width = "100%"
)
`;

describe("Can go from parsed-tree-sitter ast to proper ShinyUiNode", () => {
  test("Simple slider input with all named args", () => {
    const assigned_nodes = get_assignment_nodes(
      parse_python_script(sliderInputDef)
    );

    const slider_node = assigned_nodes.get("my_slider");

    expect(slider_node).not.toBeUndefined();

    const converted_node = treesitter_to_ui_tree(slider_node!);

    expect(converted_node).toStrictEqual({
      id: "sliderInput",
      namedArgs: {
        id: "inputId",
        label: "Slider Input",
        min: 0,
        max: 10,
        value: 5.5,
        width: "100%",
      },
    });
  });
  // const ui_node = get_ui_assignment(
  //   get_assignment_nodes(parse_python_script(navbar_page_app))
  // );

  // if (!ui_node) {
  //   throw new Error("ui_node is null");
  // }

  // const parsed_navbar_page_app = ts_node_to_ui_tree(ui_node);
  // expect(parsed_navbar_page_app).toStrictEqual(basicNavbarPage);
});

import { parse_python_script } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_ui_assignment } from "./get_ui_assignment";
import { node_to_uitree } from "./node_to_uitree";
import type { Parsed_Ui_Node } from "./NodeTypes/Parsed_Ui_Node";
const simple_app_script = `
from shiny import App, render, ui

app_ui = ui.page_fluid(
    ui.input_slider("n", "N", 0, 100, 20),
    ui.output_text_verbatim("txt"),
)

def server(input, output, session):
    @output
    @render.text
    def txt():
        return f"n*2 is {input.n() * 2}"

app = App(app_ui, server)
`;

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

describe("Parse simple app", () => {
  test("Can parse app successfully without failing", () => {
    expect(() => parse_python_script(simple_app_script)).not.toThrowError();
  });

  test("Can find assignment nodes", () => {
    const parsed = parse_python_script(simple_app_script);
    const assignment_nodes = get_assignment_nodes(parsed);
    const assignment_node_names = [...assignment_nodes.keys()];
    expect(assignment_node_names).toEqual(["app_ui", "app"]);
  });

  // Test that we can find ui node
  test("Can find ui node", () => {
    const parsed = parse_python_script(simple_app_script);
    const assignment_nodes = get_assignment_nodes(parsed);
    const ui_node = get_ui_assignment(assignment_nodes);
    expect(ui_node).not.toBeNull();
  });

  test("Returns null if no ui node to find", () => {
    const no_ui = `
from shiny import App, render, ui

print("Hello world")
`;
    const assignment_nodes = get_assignment_nodes(parse_python_script(no_ui));
    const ui_node = get_ui_assignment(assignment_nodes);
    expect(ui_node).toBeNull();
  });

  test("Can parse ui node", () => {
    const ui_node = get_ui_assignment(
      get_assignment_nodes(parse_python_script(simple_app_script))
    );

    if (!ui_node) {
      throw new Error("ui_node is null");
    }

    expect(node_to_uitree(ui_node)).toStrictEqual({
      type: "call",
      fn_name: "ui.page_fluid",
      args: [
        {
          type: "call",
          fn_name: "ui.input_slider",
          args: [
            { type: "string", value: "n" },
            { type: "string", value: "N" },
            { type: "number", value: 0 },
            { type: "number", value: 100 },
            { type: "number", value: 20 },
          ],
        },
        {
          type: "call",
          fn_name: "ui.output_text_verbatim",
          args: [{ type: "string", value: "txt" }],
        },
      ],
    } satisfies Parsed_Ui_Node);
  });

  test("Can parse navbar page", () => {
    const ui_node = get_ui_assignment(
      get_assignment_nodes(parse_python_script(navbar_page_app))
    );

    if (!ui_node) {
      throw new Error("ui_node is null");
    }

    expect(node_to_uitree(ui_node)).toStrictEqual({
      type: "call",
      fn_name: "ui.page_navbar",
      args: [
        {
          type: "call",
          fn_name: "ui.nav",
          args: [
            { type: "string", value: "Settings" },
            {
              type: "call",
              fn_name: "ui.input_slider",
              args: [
                { name: "id", type: "string", value: "inputId" },
                { name: "label", type: "string", value: "Slider Input" },
                { name: "min", type: "number", value: 0 },
                { name: "max", type: "number", value: 10 },
                { name: "value", type: "number", value: 5.5 },
                { name: "width", type: "string", value: "100%" },
              ],
            },
          ],
        },
        {
          type: "call",
          fn_name: "ui.nav",
          args: [
            { type: "string", value: "Plot 1" },
            {
              type: "call",
              fn_name: "ui.output_plot",
              args: [
                { name: "id", type: "string", value: "MyPlot" },
                { name: "width", type: "string", value: "100%" },
                { name: "height", type: "string", value: "100%" },
              ],
            },
          ],
        },
        { name: "title", type: "string", value: "My Navbar Page" },
        { name: "collapsible", type: "boolean", value: false },
      ],
    } satisfies Parsed_Ui_Node);
  });
});

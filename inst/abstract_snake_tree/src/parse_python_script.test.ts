import { parse_python_script } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_ui_assignment } from "./get_ui_assignment";
import { node_to_uitree } from "./node_to_uitree";
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
            { type: "value", value_type: "string", value: "n" },
            { type: "value", value_type: "string", value: "N" },
            { type: "value", value_type: "number", value: 0 },
            { type: "value", value_type: "number", value: 100 },
            { type: "value", value_type: "number", value: 20 },
          ],
        },
        {
          type: "call",
          fn_name: "ui.output_text_verbatim",
          args: [{ type: "value", value_type: "string", value: "txt" }],
        },
      ],
    });
  });
});

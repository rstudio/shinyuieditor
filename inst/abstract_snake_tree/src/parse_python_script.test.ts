import { parse_python_script } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";
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
    const assignment_nodes = get_assignment_nodes(parsed.rootNode);
    expect(assignment_nodes.keys).toStrictEqual(["app_ui", "app"]);
  });

  // Test that we can find ui node

  // Test that the parsed ui node looks good
});

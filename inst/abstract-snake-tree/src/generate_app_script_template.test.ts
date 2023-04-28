import { setup_python_parser } from "python-ts-parser";
import { SCRIPT_LOC_KEYS } from "ui-node-definitions/src/code_generation/generate_ui_script";

import { get_ui_assignment, parse_python_script } from ".";

import { generate_app_script_template } from "./generate_app_script_template";
import { get_assignment_nodes } from "./get_assignment_nodes";

test("Can generate templates for filling in app from ", async () => {
  const navbar_page_app = `from shiny import *

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

  const templated_version = `${SCRIPT_LOC_KEYS.packages}

app_ui = ${SCRIPT_LOC_KEYS.ui}

def server(input, output, session):
  pass

app = App(app_ui, server)
`;

  const parser = await setup_python_parser();

  const ui_node = get_ui_assignment(
    get_assignment_nodes(parse_python_script(parser, navbar_page_app))
  );

  expect(generate_app_script_template(ui_node!)).toStrictEqual({
    code: templated_version,
    packages: ["shiny"],
  });
});

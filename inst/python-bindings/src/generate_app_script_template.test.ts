import {
  get_assignment_nodes,
  get_ui_assignment,
  setup_python_parser,
} from "treesitter-parsers";
import { SCRIPT_LOC_KEYS } from "ui-node-definitions/src/code_generation/generate_ui_script";

import { parsePythonScript } from ".";

import { generateAppScriptTemplate } from "./generate_app_script_template";

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
    get_assignment_nodes(parsePythonScript(parser, navbar_page_app))
  );

  expect(generateAppScriptTemplate(ui_node!)).toStrictEqual({
    code: templated_version,
    packages: ["shiny"],
  });
});

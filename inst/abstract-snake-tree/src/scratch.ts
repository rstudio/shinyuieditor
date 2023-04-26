import { setup_python_parser } from "python-ts-parser";

import { parse_python_script } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_ui_assignment } from "./get_ui_assignment";
import { treesitter_to_ui_tree } from "./NodeTypes/ts_node_to_ui_tree";

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

const my_parser = await setup_python_parser();

const parsed_app = parse_python_script(my_parser, navbar_page_app);

const assigned_nodes = get_assignment_nodes(parsed_app);

const ui_node = get_ui_assignment(assigned_nodes);

const ui_tree = treesitter_to_ui_tree(ui_node!);

console.log(ui_tree);

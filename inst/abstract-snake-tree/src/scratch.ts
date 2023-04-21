import { parse_python_script } from ".";

import { simple_app_script } from "./example_app_scripts";
import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_ui_assignment } from "./get_ui_assignment";
import { node_to_uitree } from "./node_to_uitree";
import { treesitter_to_ui_tree } from "./NodeTypes/ts_node_to_ui_tree";

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
const assigned_nodes = get_assignment_nodes(
  parse_python_script(sliderInputDef)
);

const slider_node = assigned_nodes.get("my_slider");

// expect(slider_node).not.toBeUndefined();
const converted_node = treesitter_to_ui_tree(slider_node!);

// expect(converted_node).toStrictEqual({
//   id: "sliderInput",
//   namedArgs: {
//     inputId: "inputId",
//     label: "Slider Input",
//     min: 0,
//     max: 10,
//     value: 5.5,
//     width: "100%",
//   },
// });

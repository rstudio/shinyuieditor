import { parse_python_script } from ".";

import { simple_app_script } from "./example_app_scripts";
import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_ui_assignment } from "./get_ui_assignment";
import { node_to_uitree } from "./node_to_uitree";

const ui_node = get_ui_assignment(
  get_assignment_nodes(parse_python_script(simple_app_script))
);

if (!ui_node) {
  throw new Error("ui_node is null");
}
node_to_uitree(ui_node);

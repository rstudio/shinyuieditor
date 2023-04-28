import { setup_python_parser } from "python-ts-parser";

import { get_imported_pkgs, parse_python_script } from ".";

import { get_assignment_nodes } from "./get_assignment_nodes";
import { get_known_outputs } from "./get_known_outputs";
import { get_server_node } from "./get_server_node";
import { get_server_node_position } from "./get_server_node_position";
import type { get_ui_assignment } from "./get_ui_assignment";
import { treesitter_to_ui_tree } from "./ts_node_to_ui_tree";

const app_script = `
import matplotlib.pyplot as plt
import numpy as np
from shiny import App, render, ui

app_ui = ui.page_fluid(
    ui.layout_sidebar(
        ui.panel_sidebar(
            ui.input_slider("n", "N", 0, 100, 20),
        ),
        ui.panel_main(
            ui.output_plot("histogram"),
        ),
    ),
)


def server(input, output, session):
    @output
    @render.plot(alt="A histogram")
    def histogram():
        np.random.seed(19680801)
        x = 100 + 15 * np.random.randn(437)
        plt.hist(x, input.n(), density=True)

    @output
    @render.plot(alt="Another plot")
    def second_plot():
        np.random.seed(42)
        x = 100 + 15 * np.random.randn(437)
        plt.hist(x, input.n(), density=True)


app = App(app_ui, server)  
`;
const my_parser = await setup_python_parser();

const parsed_app = parse_python_script(my_parser, app_script);

const server_node = get_server_node(parsed_app);

const server_node_pos = get_server_node_position(parsed_app);

console.log(parsed_app);
// const import_statements = get_imported_pkgs(parsed_app);

// const assigned_nodes = get_assignment_nodes(parsed_app);

// const ui_node = get_ui_assignment(assigned_nodes);

// const ui_tree = treesitter_to_ui_tree(ui_node!);

// console.log(ui_tree);

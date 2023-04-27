import { setup_python_parser } from "python-ts-parser";

import { parse_python_script } from ".";

import { get_known_outputs } from "./get_known_outputs";

test("Can find outputs in server code", async () => {
  const app_script = `
import matplotlib.pyplot as plt
import numpy as np
from shiny import App, render, ui

app_ui = ui.page_fluid()

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

  const parsed_app = parse_python_script(
    await setup_python_parser(),
    app_script
  );

  const outputs = get_known_outputs(parsed_app);

  expect(outputs.has("histogram")).toBe(true);
  expect(outputs.has("second_plot")).toBe(true);
});

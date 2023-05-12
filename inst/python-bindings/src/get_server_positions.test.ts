import { setup_python_parser } from "treesitter-parsers";

import { parse_python_script } from ".";

import { get_known_inputs } from "./get_known_inputs";
import { get_known_outputs } from "./get_known_outputs";

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
      x = 100 + input.n() * np.random.randn(437)
      plt.hist(x, input.bins(), density=True)

app = App(app_ui, server)  
`;
test("Can find outputs in server code", async () => {
  const parsed_app = parse_python_script(
    await setup_python_parser(),
    app_script
  );

  const outputs = get_known_outputs(parsed_app);

  expect(outputs.has("histogram")).toBe(true);
  expect(outputs.has("second_plot")).toBe(true);
});
test("Can find inputs in server code", async () => {
  const parsed_app = parse_python_script(
    await setup_python_parser(),
    app_script
  );

  const inputs = get_known_inputs(parsed_app);

  expect(inputs.size).toBe(2);

  const n_inputs = inputs.get("n");

  // There are two instances of input.n being called in the server code
  expect((n_inputs ?? []).length).toBe(2);

  const n_input_loc = n_inputs![0];

  // Expect the selection to include the calling parens
  expect(n_input_loc.end.column - n_input_loc.start.column).toBe(9);

  // There is just one instance of input.bins
  expect((inputs.get("bins") ?? []).length).toBe(1);
});

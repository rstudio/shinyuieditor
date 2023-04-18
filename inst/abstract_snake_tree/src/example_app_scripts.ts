export const navbar_page_app = `
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

export const simple_app_script = `
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

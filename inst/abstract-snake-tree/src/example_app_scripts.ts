import type { Parsed_Ui_Node } from "./NodeTypes/Parsed_Ui_Node";

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

export const parsed_navbar_page_app = {
  type: "call",
  fn_name: "ui.page_navbar",
  args: [
    {
      type: "call",
      fn_name: "ui.nav",
      args: [
        { type: "string", value: "Settings" },
        {
          type: "call",
          fn_name: "ui.input_slider",
          args: [
            { name: "id", type: "string", value: "inputId" },
            { name: "label", type: "string", value: "Slider Input" },
            { name: "min", type: "number", value: 0 },
            { name: "max", type: "number", value: 10 },
            { name: "value", type: "number", value: 5.5 },
            { name: "width", type: "string", value: "100%" },
          ],
        },
      ],
    },
    {
      type: "call",
      fn_name: "ui.nav",
      args: [
        { type: "string", value: "Plot 1" },
        {
          type: "call",
          fn_name: "ui.output_plot",
          args: [
            { name: "id", type: "string", value: "MyPlot" },
            { name: "width", type: "string", value: "100%" },
            { name: "height", type: "string", value: "100%" },
          ],
        },
      ],
    },
    { name: "title", type: "string", value: "My Navbar Page" },
    { name: "collapsible", type: "boolean", value: false },
  ],
} satisfies Parsed_Ui_Node;

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

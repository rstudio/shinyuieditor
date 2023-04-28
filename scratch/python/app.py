from shiny import *
import matplotlib.pyplot as plt
import numpy as np

app_ui = ui.page_navbar(
  ui.nav(
    "It's Alive!",
    ui.input_slider(
      id = "n",
      label = "Slider Input",
      min = 5,
      max = 100,
      value = 25,
      width = "100%"
    )
  ),
  ui.nav(
    "Plot 1",
    ui.output_plot(
      id = "MyPlot",
      width = "100%",
      height = "400px"
    )
  ),
  title = "My cool app",
  collapsible = False
)


def server(input, output, session):
    @output
    @render.plot(alt="A histogram")
    def MyPlot():
        np.random.seed(19680801)
        x = 100 + 15 * np.random.randn(437)
        plt.hist(x, input.n(), density=True)
    


app = App(app_ui, server)
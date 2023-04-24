from shiny import *

app_ui = ui.page_navbar(
    ui.nav(
        "Settings",
        ui.input_slider(
            id="inputId", label="Slider Input", min=0, max=10, value=5, width="100%"
        ),
    ),
    ui.nav("Plot 1", ui.output_plot(id="MyPlot", width="100%", height="100%")),
    title="My Navbar Page",
    collapsible=False,
)


def server(input, output, session):
    pass


app = App(app_ui, server)

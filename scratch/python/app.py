from shiny import App, ui
import shiny.experimental as x
from shinywidgets import output_widget, render_widget
import altair as alt
from vega_datasets import data

# Part 1: ui ----
app_ui = ui.page_fluid(
    x.ui.card(
        x.ui.card_header("Altair plot"),
        output_widget("plot", width="100%", height="100%"),
        height="550px",
    )
)


# Part 2: server ----
def server(input, output, session):
    @output(id="plot")
    @render_widget
    def _():
        cars = data.cars()
        fig = (
            alt.Chart(cars)
            .mark_point()
            .encode(
                x="Horsepower",
                y="Miles_per_Gallon",
                color="Origin",
            )
        )
        fig.properties(height=100, width="container")
        return fig


app = App(app_ui, server)

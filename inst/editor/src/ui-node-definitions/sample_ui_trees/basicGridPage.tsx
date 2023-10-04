// eslint-disable-next-line @typescript-eslint/no-unused-vars

import type { KnownShinyUiNode } from "../uiNodeTypes";

export const basicGridPage: KnownShinyUiNode = {
  id: "grid_page",
  namedArgs: {
    layout: ["header header", "sidebar plot", "sidebar plot"],
    row_sizes: ["100px", "1fr", "1fr"],
    col_sizes: ["250px", "1fr"],
    gap_size: "1rem",
  },
  children: [
    {
      id: "grid_card_text",
      namedArgs: {
        area: "header",
        content: "My App",
        alignment: "start",
        is_title: true,
      },
    },
    {
      id: "grid_card",
      namedArgs: {
        area: "sidebar",
      },
      children: [
        {
          id: "sliderInput",
          namedArgs: {
            inputId: "mySlider",
            label: "Slider",
            min: 2,
            max: 11,
            value: 7,
          },
        },
        {
          id: "numericInput",
          namedArgs: {
            inputId: "myNumericInput",
            label: "Numeric Input",
            min: 2,
            max: 11,
            value: 7,
            width: "100%",
          },
        },
        {
          id: "unknownUiFunction",
          namedArgs: {
            text: `myCoolCustomRFunction(arg1, arg2)`,
          },
        },
      ],
    },
    {
      id: "grid_card_plot",
      namedArgs: {
        area: "plot",
      },
    },
  ],
};

export const basicGridPageScript = `
library(shiny)
library(bslib)
library(gridlayout)

ui <- grid_page(
  layout = c(
    "header  header   ",
    "sidebar timePlot",
    "sidebar timePlot    "
  ),
  row_sizes = c(
    "100px",
    "1fr",
    "1fr"
  ),
  col_sizes = c(
    "400px",
    "1fr"
  ),
  gap_size = "10px",
  grid_card(
    area = "sidebar",
    card_header("Settings"),
    card_body(
      gap = "10px",
      max_height = "100px",
      min_height = "500px",
      checkboxGroupInput(
        inputId = "myCheckboxGroup",
        label = "City To Look At",
        choices = list("PM2.5" = "PM25", "pee" = "OZONE")
      ),
      radioButtons(
        inputId = "myRadioButtons",
        label = "A",
        choices = list("choice a" = "a", "myKey4" = "myValue4"),
        width = "50%"
      ),
      radioButtons(
        inputId = "myRadioButtons",
        label = "B",
        choices = list("choice a" = "a", "myKey4" = "myValue4"),
        width = "100%"
      )
    )
  ),
  grid_card_text(
    area = "header",
    content = "Geysers!",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "timePlot"),
)


server <- function(input, output) {

}

`;

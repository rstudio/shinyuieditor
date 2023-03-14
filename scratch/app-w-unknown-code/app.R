library(shiny)
library(gridlayout)
library(bslib)

custom_input <- sliderInput(
  inputId = "bins",
  label = "Number of Bins ",
  min = 12,
  max = 100,
  value = 30
)

# Here's a comment about this app
ui <- grid_page(
  layout = c(
    "sidebar newPlot"
  ),
  row_sizes = c(
    "0.97fr"
  ),
  col_sizes = c(
    "290px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    card_body_fill(custom_input)
  ),
  grid_card_plot(area = "newPlot")
)


# Define server logic required to draw a histogram
server <- function(input, output) {

  output$newPlot <- renderPlot({
    #Plot code goes here
    plot(rnorm(100))
  })
}

shinyApp(ui, server)

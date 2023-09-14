library(shiny)
library(gridlayout)
library(bslib)


ui <- navbarPage(
  title = "Chick Weights",
  selected = "Empty Tab",
  collapsible = TRUE,
  theme = bslib::bs_theme(),
  tabPanel(
    title = "Empty Tab",
    grid_container(
      layout = c(
        "nums square",
        "nums square"
      ),
      row_sizes = c(
        "1fr",
        "1fr"
      ),
      col_sizes = c(
        "1fr",
        "1fr"
      ),
      gap_size = "10px",
      grid_card(
        area = "nums",
        full_screen = TRUE,
        card_header("Header"),
        card_body(
          sliderInput(
            inputId = "inputId",
            label = "Slider Input",
            min = 0,
            max = 10,
            value = 5,
            width = "100%"
          )
        )
      ),
      grid_card(
        area = "square",
        full_screen = TRUE,
        card_header("Header"),
        card_body(textOutput(outputId = "squared"))
      )
    )
  )
)


server <- function(input, output) {
  numsqr <- reactive({input$inputId ^ 2})

output$squared <- renderText({
  paste0("the square of ", input$inputId, " is ", numsqr())
})

}

shinyApp(ui, server)

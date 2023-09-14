library(shiny)
library(plotly)
library(gridlayout)
library(bslib)


ui <- grid_page(
  layout = c(
    "header  header  ",
    "sidebar plot "
  ),
  row_sizes = c(
    "100px",
    "1fr"
  ),
  col_sizes = c(
    "250px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    card_header("Settings"),
    card_body(
      selectInput(
        inputId = "cut",
        label = "Cut of Diamond",
        choices = list(
                  "Fair" = "Fair",
                  "Good" = "Good",
                  "Very_Good" = "Very Good",
                  "Premium" = "Premium",
                  "Ideal" = "Ideal"
                ),
        selected = "Ideal",
        width = "100%"
      ),
      em("Select the cut of the diamond you want to view the carat size distribution for.")
    )
  ),
  grid_card_text(
    area = "header",
    content = "Diamonds!",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card(
    area = "plot",
    card_header("Interactive Plot"),
    card_body(
      plotlyOutput(
        outputId = "plot",
        width = "100%",
        height = "100%"
      )
    )
  )
)


server <- function(input, output) {
   
  output$plot <- renderPlotly({
    plot_ly(
      diamonds[diamonds$cut == input$cut,], 
      x = ~carat
    ) |> 
    add_histogram() 
  })
  
}

shinyApp(ui, server)
  


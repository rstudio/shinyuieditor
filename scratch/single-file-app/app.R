library(shiny)
library(gridlayout)
library(bslib)

# Here's a comment about this app
ui <- grid_page(
  layout = c(
    "header   header ",
    "sidebar  newPlot",
    "cardDemo redPlot"
  ),
  row_sizes = c(
    "100px",
    "0.97fr",
    "1.03fr"
  ),
  col_sizes = c(
    "300px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    card_body(
      sliderInput(
        inputId = "bins",
        label = "Number of Bins ",
        min = 12,
        max = 100,
        value = 30,
        width = "100%"
      )
    ),
    card_body_fill(
      numericInput(
        inputId = "myNumericInput",
        label = "Numeric Input",
        value = 5
      ),
      actionButton(inputId = "redraw", label = "Redraw"),
      textInput(
        inputId = "bins2",
        label = "Text Input",
        value = ""
      )
    )
  ),
  grid_card_text(
    area = "header",
    content = "My demo app",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "redPlot"),
  grid_card_plot(area = "newPlot"),
  grid_card(
    area = "cardDemo",
    card_header(h2("My Card header")),
    card_body_fill(
      numericInput(
        inputId = "myNumericInput",
        label = "Numeric Input",
        value = 5
      )
    ),
    card_footer(
      textInput(
        inputId = "myTextInput",
        label = "Text Input",
        value = ""
      )
    )
  )
)

other_ui <- "hello there"

# Define server logic required to draw a histogram
server <- function(input, output) {

  output$redPlot <- renderPlot({
    print(input$bins2)
    print(input$bins)
    # draw the histogram with the specified number of bins
    hist(rnorm(100), col = 'orangered')
  })

  output$bluePlot <- renderPlot({
    # generate bins based on input$bins from ui.R
    x    <- faithful[, 2]
    bins <- seq(min(x), max(x), length.out = input$bins + 1)

    # draw the histogram with the specified number of bins
    hist(x, breaks = bins, col = 'steelblue', border = 'white')
  })

  observe({
    output$redPlot <- renderPlot({
      hist(rnorm(100), col = 'orangered')
    })
  }) %>% bindEvent(input$redraw)

  output$bluePlot2 <- renderPlot({
    #Plot code goes here
    plot(rnorm(100))
  })
}

shinyApp(ui, server)

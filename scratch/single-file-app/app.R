library(shiny)
library(gridlayout)
library(bslib)

# Here's a comment about this app
ui <- grid_page(
  layout = c(
    "header  header ",
    "sidebar area3  ",
    "sidebar redPlot"
  ),
  row_sizes = c(
    "175px",
    "1.01fr",
    "0.99fr"
  ),
  col_sizes = c(
    "425px",
    "1fr"
  ),
  gap_size = "1rem",
  grid_card(
    area = "sidebar",
    item_alignment = "top",
    title = "Settings",
    item_gap = "12px",
    sliderInput(
      inputId = "bins",
      label = "Number of Bins ",
      min = 12,
      max = 100,
      value = 30,
      width = "100%"
    ),
    actionButton(inputId = "redraw", label = "Redraw"),
    textInput(
      inputId = "bins2",
      label = "Text Input",
      value = ""
    )
  ),
  grid_card_text(
    area = "header",
    content = "Single File App",
    alignment = "start",
    is_title = FALSE
  ),
  grid_card_plot(area = "redPlot"),
  grid_card_panel(
    area = "area3",
    card_header("Lorem Ipsum"),
    card_body(
      numericInput(
        inputId = "myNumericInput",
        label = "Numeric Input",
        value = 5
      ),
      "Lorem Ipsum"
    ),
    card_footer("Lorem Ipsum")
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

test_that("Real grid_page UI snapshot", {
  expect_snapshot({
    parse_ui_fn(
      rlang::expr(
        gridlayout::grid_page(
          layout = "
            | 1rem | 250px   | 1fr  |
            |------|---------|------|
            | 1fr  | sidebar | plot |",
          gridlayout::grid_card(
            area = "sidebar",
            item_alignment = "center",
            shiny::sliderInput(
              inputId = "bins",
              label = "Num Bins",
              min = 10L,
              max = 100L,
              value = 40L
            )
          ),
          gridlayout::grid_card(
            area = "plot",
            item_alignment = "center",
            shiny::plotOutput(
              outputId = "distPlot",
              height = "100%"
            )
          )
        )
      )
    )
  })
})


test_that("Real navbarPage UI snapshot", {
  expect_snapshot({
    parse_ui_fn(
      rlang::expr(
        shiny::navbarPage(
          "App Title",
          shiny::tabPanel(
            "Settings",
            shiny::sliderInput(
              inputId = "bins",
              label = "Number of Bins",
              min = 12L,
              max = 100L,
              value = 30L
            )
          ),
          shiny::tabPanel(
            "Blue Plot",
            shiny::plotOutput("bluePlot")
          ),
          shiny::tabPanel(
            "Grey Plot",
            shiny::plotOutput("distPlot")
          )
        )
      )
    )
  })
})



test_that("Handles list arguments", {
  parsed <- parse_ui_fn(
    rlang::expr(
      shiny::selectInput(
        inputId = "mySelectInput",
        label = "Select Input",
        choices = list(
          `choice a` = "a",
          `choice b` = "b"
        )
      )
    )
  )

  expect_equal(
    parsed$uiArguments$choices,
    list(
      "choice a" = "a",
      "choice b" = "b"
    )
  )
})

test_that("Errors with invalid arguments", {
  original_expression <- rlang::expr(
    gridlayout::grid_card(
      area = "plot",
      item_alignment = "center",
      shiny::plotOutput(
        outputId = "distPlot",
        height2 = "100%"
      )
    )
  )

  expect_error(
    parse_ui_fn(original_expression),
    "Problem with arguments supplied to shiny::plotOutput()",
    fixed = TRUE
  )
})

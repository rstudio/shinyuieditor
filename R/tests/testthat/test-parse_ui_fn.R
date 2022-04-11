test_that("Real UI snapshot", {
  expect_snapshot({
    parse_ui_fn(
      rlang::expr(
        gridlayout::grid_page(
          layout = "
            | 1rem | 250px   | 1fr  |
            |------|---------|------|
            | 1fr  | sidebar | plot |",
          gridlayout::vertical_stack_panel(
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
          gridlayout::vertical_stack_panel(
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

test_that("Makes sure the UI given is known", {
  expect_error(
    {
      parse_ui_fn(
        rlang::expr(
          my_custom_ui_page(
            layout = "
            | 1rem | 250px   | 1fr  |
            |------|---------|------|
            | 1fr  | sidebar | plot |",
            gridlayout::vertical_stack_panel(
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
            gridlayout::vertical_stack_panel(
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
    },
    "The function my_custom_ui_page() is not supported by the UI editor -- sorry!",
    fixed = TRUE
  )
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
    list("choice a" = "a",
         "choice b" = "b")
  )
})

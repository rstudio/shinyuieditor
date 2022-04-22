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


test_that("Unknown functions are preserved through the parsing and deparsing steps", {
  original_expression <- rlang::expr(
    gridlayout::vertical_stack_panel(
      area = "plot",
      item_alignment = "center",
      DT::dataTableOutput(
        "myDataTable",
        width = "90%"
      ),
      shiny::plotOutput(
        outputId = "distPlot",
        height = "100%"
      )
    )
  )

  original_ui_tree <- parse_ui_fn(original_expression)

  expect_equal(
    original_ui_tree$uiChildren[[1]],
    list(
      uiName = "unknownUiFunction",
      uiArguments = list(
        text = "DT::dataTableOutput(\"myDataTable\", width = \"90%\")"
      )
    )
  )

  # Expressions themselves are identical
  expect_equal(
    original_expression,
    tree_to_exp(original_ui_tree)
  )
})

test_that("Unknown variables are preserved through the parsing and deparsing steps", {
  original_expression <- rlang::expr(
    gridlayout::vertical_stack_panel(
      area = "plot",
      item_alignment = "center",
      my_data_table_var,
      shiny::plotOutput(
        outputId = "distPlot",
        height = "100%"
      )
    )
  )

  original_ui_tree <- parse_ui_fn(original_expression)

  expect_equal(
    original_ui_tree$uiChildren[[1]],
    list(
      uiName = "unknownUiFunction",
      uiArguments = list(
        text = "my_data_table_var"
      )
    )
  )

  # Expressions themselves are identical
  expect_equal(
    original_expression,
    tree_to_exp(original_ui_tree)
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
    list(
      "choice a" = "a",
      "choice b" = "b"
    )
  )
})


test_that("Errors with invalid arguments", {
  original_expression <- rlang::expr(
    gridlayout::vertical_stack_panel(
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

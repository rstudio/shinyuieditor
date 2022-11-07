

test_that("Unknown functions are preserved through the parsing and deparsing steps", {
  custom_widget_fn <- function(inputId, width) {
    shiny::h1("Custom Widget")
  }

  original_expression <- rlang::expr(
    gridlayout::grid_card(
      area = "plot",
      custom_widget_fn(
        "myWidget",
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
        text = "custom_widget_fn(\"myWidget\", width = \"90%\")"
      )
    )
  )

  # Expressions themselves are identical
  expect_equal(
    original_expression,
    deparse_ui_fn(original_ui_tree, remove_namespace = FALSE)$call
  )
})

test_that("Unknown variables are preserved through the parsing and deparsing steps", {
  original_expression <- rlang::expr(
    gridlayout::grid_card(
      area = "plot",
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
    deparse_ui_fn(original_ui_tree, remove_namespace = FALSE)$call
  )
})


test_that("Unknown arguments are preserved through the parsing and deparsing steps", {
  original_expression <- rlang::expr(
    shiny::sliderInput(
      inputId = "bins",
      label = "Number of Bins",
      min = 12L,
      max = 100L,
      value = 30L,
      animate = animationOptions(
        interval = 1000,
        loop = FALSE,
        playButton = "play",
        pauseButton = "pause"
      )
    )
  )

  # Expressions themselves are identical
  expect_equal(
    original_expression,
    deparse_ui_fn(parse_ui_fn(original_expression), remove_namespace = FALSE)$call
  )
})

test_that("Works when passed the a proper call expression", {
  expect_true(is_known_ui_fn(rlang::expr(gridlayout::grid_page(
    layout = "|2rem |1fr    |
              |80px |header |
              |1fr  |plot   |",
    gridlayout::grid_panel_text(
      area = "header",
      title = "This is my header",
    ),
    gridlayout::grid_panel(
      area = "plot",
      shiny::plotOutput("distPlot")
    )
  ))))
  expect_true(is_known_ui_fn(rlang::expr(gridlayout::grid_page())))

  expect_false(is_known_ui_fn(rlang::expr(my_custom_ui_page())))
})

test_that("Spits errors when the wrong type of input is passed", {
  evaluated_ui <- gridlayout::grid_page(
    layout = "|2rem |1fr    |
              |80px |header |
              |1fr  |plot   |",
    gridlayout::grid_panel_text(
      area = "header",
      "This is my header"
    ),
    gridlayout::grid_panel_stack(
      area = "plot",
      shiny::plotOutput("distPlot")
    )
  )
  testthat::expect_error(is_known_ui_fn(evaluated_ui))

  expect_error(
    is_known_ui_fn(rlang::expr(gridlayout::grid_page)),
    "Passed expression is not a function call"
  )
})

test_that("Doesn't evaluate calls", {
  expect_false(
    is_known_ui_fn(rlang::expr(
      my_undefined_ui_page(
        "un-named arg",
        a = "named arg"
      )
    ))
  )
})

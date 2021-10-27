test_that("Real UI snapshot", {
  expect_snapshot({
    parse_ui_fn(
      rlang::expr(
        gridlayout::grid_page(
          layout = my_layout,
          theme = bslib::bs_theme(),
          header = gridlayout::title_panel("This is my header"),
          sidebar = gridlayout::grid_panel(
            title = "Settings",
            shiny::sliderInput("bins","Number of bins:", min = 1, value = 5, max = 10)
          ),
          plot = shiny::plotOutput("distPlot")
        )
      )
    )
  })
})

test_that("Makes sure the UI given is known", {
  expect_error({
    parse_ui_fn(
      rlang::expr(
        my_custom_ui_page(
          theme = bslib::bs_theme(),
          header = gridlayout::title_panel("This is my header"),
          sidebar = gridlayout::grid_panel(
            title = "Settings",
            shiny::sliderInput("bins","Number of bins:", min = 1, value = 5, max = 10)
          ),
          plot = shiny::plotOutput("distPlot")
        )
      )
    )
  }, "Passed value is not a known UI function and can't be parsed.")
})

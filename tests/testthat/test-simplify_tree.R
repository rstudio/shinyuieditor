test_that("Standardizes layout arguments", {
  array_layout_expr <-
    rlang::expr(
      gridlayout::grid_page(
        layout = c("sidebar plot"),
        row_sizes = c("1fr"),
        col_sizes = c("250px", "1fr"),
        gap_size = "1rem",
        gridlayout::grid_panel_stack(
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
        gridlayout::grid_panel_stack(
          area = "plot",
          item_alignment = "center",
          shiny::plotOutput(
            outputId = "distPlot",
            height = "100%"
          )
        )
      )
    )
  md_layout_expr <-
    rlang::expr(
      gridlayout::grid_page(
        layout = "
          |1rem |250px   | 1fr  |
          |1fr  |sidebar | plot |
        ",
        gridlayout::grid_panel_stack(
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
        gridlayout::grid_panel_stack(
          area = "plot",
          item_alignment = "center",
          shiny::plotOutput(
            outputId = "distPlot",
            height = "100%"
          )
        )
      )
    )

  expect_equal(
      simplify_tree(ui_code_to_tree(array_layout_expr)),
      simplify_tree(ui_code_to_tree(md_layout_expr))
  )

})

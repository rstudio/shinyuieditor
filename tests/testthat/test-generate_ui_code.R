
stack_panel <- list(
  uiName = "gridlayout::grid_panel_stack",
  uiArguments = list(
    area = "plot",
    item_alignment = "center"
  ),
  uiChildren = list(
    list(
      uiName = "unknownUiFunction",
      uiArguments = list(
        text = "my_data_table_var"
      )
    ),
    list(
      uiName = "shiny::plotOutput",
      uiArguments = list(
        outputId = "distPlot",
        height = "100%"
      )
    )
  )
)

namespaced_stack_panel_code <- 'gridlayout::grid_panel_stack(
  area = "plot",
  item_alignment = "center",
  my_data_table_var,
  shiny::plotOutput(
    outputId = "distPlot",
    height = "100%"
  )
)'

bare_stack_panel_code <- 'grid_panel_stack(
  area = "plot",
  item_alignment = "center",
  my_data_table_var,
  plotOutput(
    outputId = "distPlot",
    height = "100%"
  )
)'


test_that("Can generate code with namespaces attached", {

  expect_equal(
    paste(as.character(generate_ui_code(stack_panel, remove_namespace = FALSE)), collapse = "\n"),
    namespaced_stack_panel_code
  )
})
test_that("Can generate code with namespaces removed", {

  expect_equal(
    paste(as.character(generate_ui_code(stack_panel, remove_namespace = TRUE)), collapse = "\n"),
    bare_stack_panel_code
  )
})

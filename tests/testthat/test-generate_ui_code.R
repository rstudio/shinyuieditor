
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
  with_namespaces <- ui_tree_to_code(stack_panel, remove_namespace = FALSE)

  expect_equal(
    paste(as.character(with_namespaces$text), collapse = "\n"),
    namespaced_stack_panel_code
  )

  # Since we left namespaces on function titles, none should have been removed
  expect_equal(
    with_namespaces$namespaces_removed,
    c()
  )
})
test_that("Can generate code with namespaces removed", {
  no_namespaces <- ui_tree_to_code(stack_panel, remove_namespace = TRUE)

  expect_equal(
    paste(as.character(no_namespaces$text), collapse = "\n"),
    bare_stack_panel_code
  )

  expect_equal(
    no_namespaces$namespaces_removed,
    c("shiny", "gridlayout")
  )
})

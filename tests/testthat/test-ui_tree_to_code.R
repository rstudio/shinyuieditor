
build_card_tree <- function(child_node) {
  list(
    uiName = "gridlayout::grid_card",
    uiArguments = list(
      area = "plot"
    ),
    uiChildren = list(
      child_node
    )
  )
}


code_text_to_lang <- function(code_text) {
  str2lang(paste(as.character(code_text), collapse = "\n"))
}


test_that("handles simple nodes without complex argument types", {
  plot_output_tree <- list(
    uiName = "shiny::plotOutput",
    uiArguments = list(
      outputId = "plot"
    )
  )

  ui_expr <- rlang::expr(
    gridlayout::grid_card(
      area = "plot",
      shiny::plotOutput(outputId = "plot")
    )
  )
  expect_equal(
    code_text_to_lang(
      ui_tree_to_code(
        build_card_tree(plot_output_tree),
        remove_namespace = FALSE
      )$text
    ),
    ui_expr
  )
})

test_that("Handles trees with complex argument types", {
  ui_expr <- rlang::expr(
    shiny::radioButtons(
      inputId = "radios",
      label = "radios",
      choices = list(
        "a" = 1,
        "b" = 2
      )
    )
  )


  radio_input_tree <- list(
    uiName = "shiny::radioButtons",
    uiArguments = list(
      inputId = "radios",
      label = "radios",
      choices = list(
        "a" = 1,
        "b" = 2
      )
    )
  )

  expect_equal(
    code_text_to_lang(
      ui_tree_to_code(
        radio_input_tree,
        remove_namespace = FALSE
      )$text
    ),
    ui_expr
  )
})

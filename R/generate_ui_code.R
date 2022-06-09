generate_ui_code <- function(ui_tree, remove_namespace = FALSE){
  ui_tree_to_code(ui_tree, remove_namespace)$text
}


ui_tree_to_code <- function(ui_tree, remove_namespace = TRUE){

  ui_expression <- ui_tree %>%
    simplify_tree() %>%
    deparse_ui_fn(remove_namespace = remove_namespace)

  ui_def_text <- ui_expression$call %>%
    rlang::expr_text() %>%
    str_replace_all(
      pattern="),",
      replacement="),\n",
      fixed=TRUE
    ) %>%
    str_replace_all(
      pattern=", ",
      replacement=",\n",
      fixed=TRUE
    ) %>%
    str_replace_all(
      pattern="\\n",
      replacement="\n",
      fixed=TRUE
    ) %>%
    styler::style_text(scope = "tokens")

  list(
    text = ui_def_text,
    namespaces_removed = ui_expression$namespaces_removed
  )
}

generate_ui_code <- function(ui_tree){
  ui_tree %>%
    simplify_tree() %>%
    tree_to_exp() %>%
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
}

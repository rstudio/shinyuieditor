#' Convert ui tree IR to code text
#'
#' @inheritParams deparse_ui_fn
#'
#' @return A list with `text`: lines of the generated code, and
#'   `namespaces_removed`: a character vector of all the namespaces that were
#'   stripped from the ui functions (only has elements if `remove_namespaces =
#'   TRUE`)
#'
ui_tree_to_code <- function(ui_tree, remove_namespace = TRUE) {
  ui_expression <- deparse_ui_fn(
    ui_tree = simplify_tree(ui_tree),
    remove_namespace = remove_namespace
  )

  ui_def_text <- rlang::expr_text(ui_expression$call)

  ui_def_text <- str_replace_all(
    ui_def_text,
    pattern = "),",
    replacement = "),\n",
    fixed = TRUE
  )

  ui_def_text <- str_replace_all(
    ui_def_text,
    pattern = ", ",
    replacement = ",\n",
    fixed = TRUE
  )

  ui_def_text <- str_replace_all(
    ui_def_text,
    pattern = "\\n",
    replacement = "\n",
    fixed = TRUE
  )

  ui_def_text <- styler::style_text(ui_def_text, scope = "tokens")

  list(
    text = ui_def_text,
    namespaces_removed = ui_expression$namespaces_removed
  )
}

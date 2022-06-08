get_ui_from_file <- function(app_loc) {
  ui_defn_text <- paste(readLines(get_app_ui_file(app_loc)), collapse = "\n")
  ui_expr <- rlang::parse_exprs(ui_defn_text)[[1]]
  ui_code_to_tree(ui_expr)
}



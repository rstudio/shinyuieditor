ui_code_to_tree <- function(ui_expr){
  ui_expr %>%
    parse_ui_fn() %>%
    update_ui_nodes()
}

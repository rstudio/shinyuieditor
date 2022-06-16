#' Convert ui code expression to ui tree IR
#'
#' @param ui_expr Language object containing code generate an app ui
#' @param packages List of any packages that need to be loaded into the
#'   namespace when evaluating the `ui_expr`
#'
#' @return A UI tree intermediate representation that can be sent to ui editor
#'   front-end
#'
ui_code_to_tree <- function(ui_expr, packages = c()) {

  # Setup an environment for parsing that has the proper libraries in it
  for (pkg in packages) {
    library(pkg, character.only = TRUE)
  }

  ui_tree <- parse_ui_fn(ui_expr)
  update_ui_nodes(ui_tree)
}

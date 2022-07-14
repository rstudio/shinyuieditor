#' Convert ui code expression to ui tree IR
#'
#' @param ui_expr Language object containing code generate an app ui
#' @param packages List of any packages that need to be loaded into the
#'   namespace when evaluating the `ui_expr`
#'
#' @return A UI tree intermediate representation that can be sent to ui editor
#'   front-end
#'
#' @examples
#' # Takes optional list of libraries needed to accurately parse file
#' ui_expr <- rlang::expr(
#'   grid_card(
#'     area = "plot",
#'     plotOutput("distPlot",height = "100%")
#'   )
#' )
#'
#' shinyuieditor:::ui_code_to_tree(ui_expr, packages = c("shiny", "gridlayout"))
#'
#'
#' # If all functions are namespaced then the packages can be omited
#' ui_expr <- rlang::expr(
#'   gridlayout::grid_card(
#'     area = "plot",
#'     shiny::plotOutput("distPlot", height = "100%")
#'   )
#' )
#'
#' shinyuieditor:::ui_code_to_tree(ui_expr)
#'
ui_code_to_tree <- function(ui_expr, packages = c()) {

  # Setup an environment for parsing that has the proper libraries in it
  for (pkg in packages) {
    library(pkg, character.only = TRUE)
  }

  ui_tree <- parse_ui_fn(ui_expr)
  update_ui_nodes(ui_tree)
}

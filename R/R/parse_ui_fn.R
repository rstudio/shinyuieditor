#' Parse UI function node
#'
#' Function to recursively parse a Shiny UI definition. Will build a nested list of known UI functions and their arguments.
#' @param ui_expr A language object representing the call of a known Shiny UI function.
#'
#' @return A nested list describing the UI of the app for use in the Shiny Visual Editor
#' @export
#'
#' @examples
#'
#' app_expr <- rlang::expr(
#'   gridlayout::grid_page(
#'     layout = gridlayout::new_gridlayout("
#'       |2rem  |200px   |1fr    |
#'       |80px  |header  |header |
#'       |1fr   |sidebar |plot   |"),
#'     theme = bslib::bs_theme(),
#'     header = gridlayout::title_panel("This is my header"),
#'     sidebar = gridlayout::grid_panel(
#'       title = "Settings",
#'       shiny::sliderInput("bins", "Number of bins:", min = 1, value = 5, max = 10)
#'     ),
#'     plot = shiny::plotOutput("distPlot")
#'   )
#' )
#'
#'
#' lobstr::tree(parse_ui_fn(app_expr))
parse_ui_fn <- function(ui_node_expr) {

  # First check if we should even try and parsing this node. If it's a constant
  # like a string just return that.
  is_constant <- !is.call(ui_node_expr)
  if(is_constant) return(ui_node_expr)

  # Fill in all the names of unnamed arguments
  # ui_expr <- rlang::call_standardise(ui_expr)

  # Since first element of the AST is the function call itself, it makes our
  # life easier going forward if we remove it before walking through arguments
  call_arguments <- as.list(ui_node_expr) |> tail(-1)
  num_args <- length(call_arguments)
  arg_names <- names(call_arguments)

  parsed <- list(
    uiName = called_uiName(ui_node_expr),
    uiArguments = list()
  )

  # A child node is detected when there is an argument without a name.
  if (length(arg_names == "") > 0) {
    parsed$uiChildren <- c()
  }

  for (i in 1:num_args) {
    arg_name <- names(call_arguments)[[i]]
    arg_val <- call_arguments[[i]]

    node_val <- parse_ui_fn(arg_val)

    is_child_node <- arg_name == ""
    if (is_child_node){
      parsed$uiChildren <- parsed$uiChildren |> append(list(node_val))
    } else {
      parsed$uiArguments[[arg_name]] <- node_val
    }
  }

  parsed
}

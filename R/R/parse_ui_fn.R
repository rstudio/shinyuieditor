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
parse_ui_fn <- function(ui_expr) {

  # Fill in all the names of unnamed arguments
  ui_expr <- rlang::call_standardise(ui_expr)

  if (!is_known_ui_fn(ui_expr)) stop("Passed value is not a known UI function and can't be parsed.")

  parsed <- list(
    uiName = called_uiName(ui_expr)
  )
  # First element is calling fn
  num_args <- length(ui_expr) - 1

  if (num_args > 0) {
    parsed$uiArguments <- list()

    for (i in 1:num_args) {
      arg_i <- i + 1
      arg_name <- names(ui_expr)[[arg_i]]
      arg_val <- ui_expr[[arg_i]]

      parsed$uiArguments[[arg_name]] <- switch(argument_expr_type(arg_val),
        constant = as.character(arg_val),
        `ui-fn` = parse_ui_fn(arg_val),
        `unknown-fn` = paste(deparse(arg_val), collapse = "\n"),
        stop("Don't know how to handle type ", typeof(arg_val), call. = FALSE)
      )
    }
  }

  parsed
}

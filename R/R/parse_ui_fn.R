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
#'
parse_ui_fn <- function(ui_expr) {
  if (!is.language(ui_expr)) stop("parse_ui_fn() was passed a non-language object")

  expr_list <- as.list(ui_expr)

  parsed <- list(
    fn_name = deparse(expr_list[[1]])
  )
  num_args <- length(expr_list) - 1

  if (num_args > 0) {
    parsed$args <- list()

    for (i in 1:num_args) {
      # Add one because first element is calling fn
      arg_i <- i + 1
      arg_info <- list()

      arg_name <- names(expr_list)[[arg_i]]
      if (!is.null(arg_name) && arg_name != "") arg_info$name <- arg_name

      arg_info$type <- expr_type(expr_list[[arg_i]])

      arg_info$value <- if (arg_info$type == "call") {
        parse_ui_fn(expr_list[[arg_i]])
      } else {
        as.character(expr_list[[arg_i]])
      }

      parsed$args[[i]] <- arg_info
    }
  }

  parsed
}


# Taken from Advanced R Ch 18 https://adv-r.hadley.nz/expressions.html#ast-funs
expr_type <- function(x) {
  if (rlang::is_syntactic_literal(x)) {
    "constant"
  } else if (is.symbol(x)) {
    "symbol"
  } else if (is.call(x)) {
    "call"
  } else if (is.pairlist(x)) {
    "pairlist"
  } else {
    typeof(x)
  }
}

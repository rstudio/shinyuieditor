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
  if (!is_known_ui_fn(ui_expr)) stop("Passed value is not a known UI function and can't be parsed.")

  parsed <- list(
    fn_name = called_fn_name(ui_expr)
  )
  # First element is calling fn
  num_args <- length(ui_expr) - 1

  if (num_args > 0) {
    parsed$args <- list()

    for (i in 1:num_args) {
      arg_i <- i + 1
      arg_info <- list()

      arg_name <- names(ui_expr)[[arg_i]]
      if (!is.null(arg_name) && arg_name != "") arg_info$name <- arg_name

      arg_val <- ui_expr[[arg_i]]

      arg_info$type <- argument_expr_type(arg_val)
      arg_info$value <- switch(arg_info$type,
        constant = as.character(arg_val),
        `ui-fn` = parse_ui_fn(arg_val),
        `unknown-fn` = deparse(arg_val),
        stop("Don't know how to handle type ", typeof(arg_val), call. = FALSE)
      )

      parsed$args[[i]] <- arg_info
    }
  }

  parsed
}

# Pull out name of call from an AST node in plain text
called_fn_name <- function(x) {
  deparse(x[[1]])
}

# Get rid of the namespace prefix so we can look up functions more easily.
# Ideally all calls would have namespace prefix so we can be sure we're
# getting what we think instead of a user defined variable but that's a
# pretty hefty restriction
sanatize_fn_name <- function(fn_name) {
  gsub(pattern = "\\w+::", replacement = "", x = fn_name, perl = TRUE)
}


known_ui_fns <- c(
  "grid_page",
  "title_panel",
  "grid_panel",
  "sliderInput",
  "plotOutput"
)

# Takes an AST node and tells us if it corresponds to a known UI function call
is_known_ui_fn <- function(x){
  if (!is.language(x) || !is.call(x)) stop("Passed value is a not a function call object")
  sanatize_fn_name(called_fn_name(x)) %in% known_ui_fns
}

# There are three types of values an argument can take this figures out which one
# we have so we know how to proceed
argument_expr_type <- function(x) {
  if (!is.call(x)) {
    "constant"
  } else if (is_known_ui_fn(x)) {
    "ui-fn"
  } else {
    "unknown-fn"
  }
}

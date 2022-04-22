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
parse_ui_fn <- function(ui_node_expr, is_argument = FALSE) {

  if (!can_parse_ui_expr(ui_node_expr)) {
    return(
      list(
        uiName = "unknownUiFunction",
        uiArguments = list(
          text = rlang::expr_text(ui_node_expr)
        )
      )
    )
  }

  # Fill in all the names of unnamed arguments
  ui_node_expr <- tryCatch({
    rlang::call_standardise(ui_node_expr)
  }, error = function(e){
    stop(
      paste0(
        "Problem with arguments supplied to ",
        called_uiName(ui_node_expr),
        "().\nError msg: \"",
        e$message,
        "\""
      ),
      call. = FALSE
    )
  })

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

    is_child_node <- arg_name == ""
    if (is_child_node){
      parsed$uiChildren <- parsed$uiChildren |> append(list(parse_ui_fn(arg_val)))
    } else {
      parsed$uiArguments[[arg_name]] <- parse_argument(arg_val)
    }
  }

  parsed
}

expr_is_constant <- function(expr){
  !is.call(expr)
}

can_parse_ui_expr <- function(expr){
  tryCatch(
    {
      get_is_known_ui_fn(called_uiName(expr))
    },
    error = function(e) {
     FALSE
    }
  )
}

parse_argument <- function(arg_expr){
  # First check if we should even try and parsing this node. If it's a constant
  # like a string just return that.
  if(expr_is_constant(arg_expr)) {
    return(arg_expr)
  }

  func_name <- called_uiName(arg_expr)

  # We know how to handle just a few types of function calls, so make sure that
  # we're working with one of those before proceeding
  if (func_name == "list" | func_name == "c"){

    list_val <- eval(arg_expr)

    # If we have a named vector then the names will be swallowed in conversion
    # to JSON unless we explicitly make it a list
    if (!identical(names(list_val), NULL)){
      list_val <- as.list(list_val)
    }

    return(list_val)
  }

  stop("Only constant expressions or named lists are currently supported argument types.")
}




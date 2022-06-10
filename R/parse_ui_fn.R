#' Parse UI function node
#'
#' Function to recursively parse a Shiny UI definition. Will build a nested list
#' of known UI functions and their arguments.
#' @param ui_node_expr A language object representing the call of a known Shiny
#'   UI function.
#' @param env Environment in which to evaluate arguments. Necessary for filling
#'   in the names of all arguments. Almost always left as the default.
#'
#' @return A nested list describing the UI of the app for use in the ui editor
#' @export
#'
#' @examples
#'
#' app_expr <- rlang::expr(
#'   gridlayout::grid_page(
#'     layout = "
#'             | 1rem | 250px   | 1fr  |
#'             |------|---------|------|
#'             | 1fr  | sidebar | plot |",
#'     gridlayout::grid_panel_stack(
#'       area = "sidebar",
#'       item_alignment = "center",
#'       shiny::sliderInput(
#'         inputId = "bins",
#'         label = "Num Bins",
#'         min = 10L,
#'         max = 100L,
#'         value = 40L
#'       )
#'     ),
#'     gridlayout::grid_panel_stack(
#'       area = "plot",
#'       item_alignment = "center",
#'       shiny::plotOutput(
#'         outputId = "distPlot",
#'         height = "100%"
#'       )
#'     )
#'   )
#' )
#' parse_ui_fn(app_expr)
#'
parse_ui_fn <- function(ui_node_expr, env = rlang::caller_env()) {
  namespaced_fn_name <- tryCatch(
    {
      namespace_ui_fn(name_of_called_fn(ui_node_expr))
    },
    error = function(e) {
      "unknown"
    }
  )

  if (namespaced_fn_name == "unknown") {
    return(unknown_code_wrap(ui_node_expr))
  }

  # Fill in all the names of unnamed arguments
  ui_node_expr <- tryCatch(
    {
      rlang::call_standardise(ui_node_expr, env = env)
    },
    error = function(e) {
      stop(
        paste0(
          "Problem with arguments supplied to ",
          namespaced_fn_name,
          "().\nError msg: \"",
          e$message,
          "\""
        ),
        call. = FALSE
      )
    }
  )

  # Since first element of the AST is the function call itself, it makes our
  # life easier going forward if we remove it before walking through arguments
  call_arguments <- utils::tail(as.list(ui_node_expr), -1)
  num_args <- length(call_arguments)
  arg_names <- names(call_arguments)

  parsed <- list(
    uiName = namespaced_fn_name,
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
    if (is_child_node) {
      parsed$uiChildren <- append(parsed$uiChildren, list(parse_ui_fn(arg_val, env = env)))
    } else {
      parsed$uiArguments[[arg_name]] <- parse_argument(arg_val)
    }
  }

  parsed
}

# Handle named arguments of a ui function. This is needed for handling special
# cases like lists and arrays that are not primative but we need to handle for
# things like radio inputs etc..
parse_argument <- function(arg_expr) {
  # First check if we should even try and parsing this node. If it's a constant
  # like a string just return that.
  if (!is.call(arg_expr)) {
    return(arg_expr)
  }

  func_name <- name_of_called_fn(arg_expr)

  # We know how to handle just a few types of function calls, so make sure that
  # we're working with one of those before proceeding
  if (func_name == "list" | func_name == "c") {
    list_val <- eval(arg_expr)

    # If we have a named vector then the names will be swallowed in conversion
    # to JSON unless we explicitly make it a list
    if (!identical(names(list_val), NULL)) {
      list_val <- as.list(list_val)
    }

    return(list_val)
  }

  unknown_code_wrap(arg_expr)
}

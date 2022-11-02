#' Parse UI function node
#'
#' Function to recursively parse a Shiny UI definition. Will build a nested list
#' of known UI functions and their arguments.
#' @param ui_node_expr A language object representing the call of a known Shiny
#'   UI function.
#'
#' @return A nested list describing the UI of the app for use in the ui editor
#' @export
#'
#' @keywords internal
#'
#' @examples
#'
#' app_expr <- rlang::expr(
#'   gridlayout::grid_page(
#'     layout = "
#'             | 1rem | 250px   | 1fr  |
#'             |------|---------|------|
#'             | 1fr  | sidebar | plot |",
#'     gridlayout::grid_card(
#'       area = "sidebar",
#'       shiny::sliderInput(
#'         inputId = "bins",
#'         label = "Num Bins",
#'         min = 10L,
#'         max = 100L,
#'         value = 40L
#'       )
#'     ),
#'     gridlayout::grid_card(
#'       area = "plot",
#'       shiny::plotOutput(
#'         outputId = "distPlot",
#'         height = "100%"
#'       )
#'     )
#'   )
#' )
#' parse_ui_fn(app_expr)
#'
parse_ui_fn <- function(ui_node_expr) {
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
      rlang::call_standardise(ui_node_expr)
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

  # Now we can move onto dealing with the arguments of the current ui node
  call_args <- parse_call_args(ui_node_expr)

  parsed <- list(
    uiName = namespaced_fn_name,
    uiArguments = list()
  )
  # Only need the uiChildren property if children exist in the call
  if (call_args$has_children) {
    parsed$uiChildren <- c()
  }

  # If we have function with no arguments we're done
  if (call_args$count == 0L) {
    return(parsed)
  }

  for (i in 1:call_args$count) {
    arg_name <- call_args$names[[i]]
    arg_val <- call_args$values[[i]]
    is_child <- call_args$is_child[[i]]

    if (is_child) {
      parsed$uiChildren <- append(parsed$uiChildren, list(parse_ui_fn(arg_val)))
    } else {
      parsed$uiArguments[[arg_name]] <- parse_argument(arg_val)
    }
  }

  parsed
}


# Extracts arguments from function call ast node and makes sure the names and
# child status are properly reflected
parse_call_args <- function(ui_node_expr) {
  # Since first element of the AST is the function call itself, it makes our
  # life easier going forward if we remove it before walking through arguments
  call_arguments <- utils::tail(as.list(ui_node_expr), -1)

  num_args <- length(call_arguments)

  arg_names <- names(call_arguments)

  if(is.null(arg_names) && num_args > 0) {
    # If there's no argument names but there are arguments that means we have a
    # node with just children nodes. Because we use the empty character as a way
    # to distinguish a child node below we need to make the arg_names vector
    # manually
    arg_names <- rep_len("", num_args)
  }

  is_child <-  arg_names == ""

  list(
    count = num_args,
    values = call_arguments,
    names = arg_names,
    is_child = is_child,
    has_children = length(is_child) > 0
  )
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

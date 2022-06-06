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
#' lobstr::tree(parse_ui_fn(app_expr))
#'
parse_ui_fn <- function(ui_node_expr, env = rlang::caller_env()) {

  if (!can_parse_ui_expr(ui_node_expr)) {
    return(
      unknown_code_wrap(ui_node_expr)
    )
  }

  # Fill in all the names of unnamed arguments
  ui_node_expr <- tryCatch({
    rlang::call_standardise(ui_node_expr, env=env)
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
  call_arguments <- as.list(ui_node_expr) %>% utils::tail(-1)
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
      parsed$uiChildren <- parsed$uiChildren %>% append(list(parse_ui_fn(arg_val, env=env)))
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

# When we can't parse a bit of the UI we place it into an unknown box that will
# be preserved in both parsing and un-parsing
unknown_code_wrap <- function(code_expr){
  list(
    uiName = "unknownUiFunction",
    uiArguments = list(
      text = rlang::expr_text(code_expr)
    )
  )
}

unknown_code_unwrap <- function(unknown_code_box){
  str2lang(unknown_code_box$uiArguments$text)
}

is_unknown_code <- function(ui_node){
  is.list(ui_node) && identical(ui_node$uiName, "unknownUiFunction")
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

  unknown_code_wrap(arg_expr)
}




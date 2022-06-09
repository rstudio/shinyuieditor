#' Is a function call a known UI function call?
#'
#' Takes an AST node and tells us if it corresponds to a known UI function call.
#' Makes the assumption that we can't look into the environment to make sure
#' that we are getting the function we think we are. This is because we want to
#' be able to parse raw text instead of relying on an active evaluation context.
#'
#' @param x Language object node corresponding to a function call
#'
#' @return Boolean
#' @export
#'
#' @examples
#'
#' is_known_ui_fn(rlang::expr(gridlayout::grid_page()))
#' is_known_ui_fn(rlang::expr(custom_ui_page()))
#'
is_known_ui_fn <- function(x){

  if (!is.language(x)) stop("Passed value is not an expression")

  if (is.symbol(x) || identical(x[[1]], as.symbol("::"))) stop("Passed expression is not a function call")

  get_is_known_ui_fn(name_of_called_fn(x))
}


get_is_known_ui_fn <- function(name){
  name %in% c(ui_fn_names_namespaced, ui_fn_names_bare)
}

# This list should be kept up to date with `shinyUiNodeInfo` in uiNodeTypes.ts
ui_fn_names_namespaced <- c(
  "shiny::plotOutput",
  "shiny::sliderInput",
  "shiny::numericInput",
  "shiny::textInput",
  "shiny::radioButtons",
  "shiny::checkboxInput",
  "shiny::checkboxGroupInput",
  "shiny::selectInput",
  "shiny::actionButton",
  "shiny::uiOutput",
  "shiny::textOutput",
  "gridlayout::grid_page",
  "gridlayout::grid_panel",
  "gridlayout::grid_panel_text",
  "gridlayout::grid_panel_plot",
  "gridlayout::grid_panel_stack"
)


remove_fn_namespace <- function(fn_name){
  gsub(pattern = "\\w+::", replacement = "", x = fn_name, perl = TRUE)
}


get_namespace_and_fn <- function(namespaced_fn) {

  match_res <- regmatches(
    x = namespaced_fn,
    m = gregexec(text = namespaced_fn, pattern = "(\\w+)::(\\w+)")
  )[[1]]

  list(
    namespace = match_res[2,],
    fn = match_res[3,]
  )
}



ui_fn_names_bare <- remove_fn_namespace( ui_fn_names_namespaced)


# Make sure that the ui_name passed through has the proper namespace attached to
# it
namespace_ui_fn <- function(ui_name){
  if (ui_name %in% ui_fn_names_namespaced) return(ui_name)

  index_of_name <- which(ui_fn_names_bare == ui_name)
  if (identical(index_of_name, integer(0L))) {
    stop("The ui function ", ui_name, " is not in the list of known functions.")
  }

  ui_fn_names_namespaced[index_of_name]
}

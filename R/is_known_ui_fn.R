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

  get_is_known_ui_fn(called_uiName(x))
}


get_is_known_ui_fn <- function(name){
  name %in% c(namespaced_ui_fns, known_ui_fns)
}

# This list should be kept up to date with `shinyUiNodeInfo` in uiNodeTypes.ts
namespaced_ui_fns <- c(
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

known_ui_fns <- gsub(pattern = "\\w+::", replacement = "", x = namespaced_ui_fns, perl = TRUE)


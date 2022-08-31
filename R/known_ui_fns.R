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
  "shiny::navbarPage",
  "shiny::tabsetPanel",
  "shiny::tabPanel",
  "gridlayout::grid_page",
  "gridlayout::grid_card",
  "gridlayout::grid_card_text",
  "gridlayout::grid_card_plot",
  "gridlayout::grid_card"
)


# Ui names without namespace attached
ui_fn_names_bare <- gsub(
  pattern = "\\w+::",
  replacement = "",
  x = ui_fn_names_namespaced,
  perl = TRUE
)

# List of each functions namespace (`namespace`), un-namespaced name (`fn`) and
# the full namespaced name (`full`)
ui_fn_names_and_namespaces <- lapply(
  ui_fn_names_namespaced,
  FUN = function(full_name) {
    split_name <- strsplit(full_name, split = "::")[[1]]
    list(
      namespace = split_name[1],
      fn = split_name[2],
      full = full_name
    )
  }
)

# A list keyed by either the namespaced or un-namespaced name of a ui function
# that gives the info defined in ui_fn_names_and_namespaces back. Used to
# standardize code if namespaced or not
known_ui_fns <- c(ui_fn_names_and_namespaces, ui_fn_names_and_namespaces)
names(known_ui_fns) <- c(ui_fn_names_namespaced, ui_fn_names_bare)


#' Namespace a ui function
#'
#' Throws an error if the function is not in the list of known ui functions
#'
#' @param ui_name Namespaced (`pkg::fn`) or un-namespaced (`fn`) function name
#'   of known ui functions
#'
#' @return Function name in namespaced format
#'
#' @keywords internal
#'
#' @examples
#' shinyuieditor:::namespace_ui_fn("gridlayout::grid_page")
#' shinyuieditor:::namespace_ui_fn("grid_page")
#'
namespace_ui_fn <- function(ui_name) {
  info <- known_ui_fns[[ui_name]]
  if (is.null(info)) {
    stop("The ui function ", ui_name, " is not in the list of known functions.")
  }
  info$full
}

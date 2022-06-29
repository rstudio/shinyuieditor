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
  "gridlayout::grid_card",
  "gridlayout::grid_panel_text",
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
  regmatches(
    x = ui_fn_names_namespaced,
    m = gregexec(text = ui_fn_names_namespaced, pattern = "(\\w+)::(\\w+)")
  ),
  FUN = function(match) {
    list(
      namespace = match[2, ],
      fn = match[3, ],
      full = match[1, ]
    )
  }
)

# A list keyed by either the namespaced or un-namespaced name of a ui function
# that gives the info defined in ui_fn_names_and_namespaces back. Used to
# standardize code if namespaced or not
ui_fn_info <- c(ui_fn_names_and_namespaces, ui_fn_names_and_namespaces)
names(ui_fn_info) <- c(ui_fn_names_namespaced, ui_fn_names_bare)


#' Namespace a ui function
#'
#' Throws an error if the function is not in the list of known ui functions
#'
#' @param ui_name Namespaced (`pkg::fn`) or un-namespaced (`fn`) function name
#'   of known ui functions
#'
#' @return Function name in namespaced format
#'
#' @examples
#' shinyuieditor:::namespace_ui_fn("gridlayout::grid_page")
#' shinyuieditor:::namespace_ui_fn("grid_page")
#'
namespace_ui_fn <- function(ui_name) {
  info <- ui_fn_info[[ui_name]]
  if (is.null(info)) {
    stop("The ui function ", ui_name, " is not in the list of known functions.")
  }
  info$full
}

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


ui_fn_names_bare <- gsub(
  pattern = "\\w+::",
  replacement = "",
  x = ui_fn_names_namespaced,
  perl = TRUE
)

ui_fn_names_and_namespaces <- lapply(
  regmatches(
    x = ui_fn_names_namespaced,
    m = gregexec(text = ui_fn_names_namespaced, pattern = "(\\w+)::(\\w+)")
  ),
  FUN = function(match) list(
    namespace = match[2,],
    fn = match[3,],
    full = match[1,]
  )
)

ui_fn_info <- c(ui_fn_names_and_namespaces, ui_fn_names_and_namespaces)
names(ui_fn_info) <- c(ui_fn_names_namespaced, ui_fn_names_bare)

namespace_ui_fn <- function(ui_name) {
  info <- ui_fn_info[[ui_name]]
  if (is.null(info)) {
    stop("The ui function ", ui_name, " is not in the list of known functions.")
  }
  info$full
}
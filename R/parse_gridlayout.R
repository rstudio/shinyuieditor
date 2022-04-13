
# gridlayout_node <- parse_ui_fn( rlang::expr(
#   gridlayout::grid_page(
#     layout = "
# |2rem  |200px   |1fr    |
# |80px  |header  |header |
# |1fr   |sidebar |plot   |",
#     header = gridlayout::title_panel("This is my header"),
#     plot = shiny::plotOutput("distPlot")
#   )
# ))


parse_gridlayout <- function(gridlayout_node){
  name <- gridlayout_node$uiName
  if (name != "grid_page" & name != "gridlayout::grid_page") stop("Passed UI node does not appear to be a gridlayout call")
  args <- gridlayout_node$uiArguments

  # Start by setting up the layout settings object
  layout_obj <- gridlayout::new_gridlayout(layout_def = args$layout)

  layout_options <- list(
    rowSizes= layout_obj$layout$row_sizes,
    colSizes= layout_obj$layout$col_sizes,
    gapSize = layout_obj$layout$gap,
    areas = gridlayout:::to_matrix(layout_obj)
  )

  # Any arguments that themselves have a uiName are elements. Let's use them
  element_nodes <- Filter(x = args, f = function(fn_arg){"uiName" %in% names(fn_arg)})

  have_unaccounted_for_args <- length(names(element_nodes)) > length(names(args)) - 1
  if (have_unaccounted_for_args) {
    stop("Error parsing gridlayout::grid_page(). Only the layout argument is supported along with elements")
  }

  list(
    layout = list(
      type="gridlayout",
      options = layout_options
    ),
    elements = element_nodes
  )
}

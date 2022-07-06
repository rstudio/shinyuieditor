
update_gridlayout <- function(gridlayout_node) {
  if (gridlayout_node$uiName != "gridlayout::grid_page") {
    return(gridlayout_node)
  }

  # Start by setting up the layout settings object
  layout_obj <- gridlayout::new_gridlayout(
    layout_def = gridlayout_node$uiArguments$layout,
    row_sizes  = gridlayout_node$uiArguments$row_sizes,
    col_sizes  = gridlayout_node$uiArguments$col_sizes,
    gap_size   = gridlayout_node$uiArguments$gap_size
  )

  # Remove the old arguments
  gridlayout_node$uiArguments$layout <- NULL
  gridlayout_node$uiArguments$row_sizes <- NULL
  gridlayout_node$uiArguments$col_sizes <- NULL
  gridlayout_node$uiArguments$gap_size <- NULL

  # Replace with new arguments
  gridlayout_node$uiArguments$rowSizes <- layout_obj$layout$row_sizes
  gridlayout_node$uiArguments$colSizes <- layout_obj$layout$col_sizes
  gridlayout_node$uiArguments$gapSize <- layout_obj$layout$gap
  gridlayout_node$uiArguments$areas <- gridlayout::to_matrix(layout_obj)

  gridlayout_node
}



# Any function that can modify a node go here, each get run on each node
node_updaters <- list(
  update_gridlayout
)

# Recursively update the ui tree with values that update the arguments
update_ui_nodes <- function(ui_node) {

  # First run any updater functions for this node if they exist
  for (updater_fn in node_updaters) {
    ui_node <- updater_fn(ui_node)
  }

  # Next walk through all the children and do the same
  if (!is.null(ui_node$uiChildren)) {
    ui_node$uiChildren <- lapply(ui_node$uiChildren, FUN = update_ui_nodes)
  }

  ui_node
}

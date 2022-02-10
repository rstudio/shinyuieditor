
update_gridlayout <- function(gridlayout_node){
  gridlayout_node$uiName
  arguments <- gridlayout_node$uiArguments
  children <- gridlayout_node$uiChildren

  if (gridlayout_node$uiName != "grid_page" & gridlayout_node$uiName != "gridlayout::grid_page") stop("Passed UI node does not appear to be a gridlayout call")

  # Start by setting up the layout settings object
  layout_obj <- gridlayout::new_gridlayout(layout_def = gridlayout_node$uiArguments$layout)

  gridlayout_node$uiArguments <- list(
    rowSizes= layout_obj$layout$row_sizes,
    colSizes= layout_obj$layout$col_sizes,
    gapSize = layout_obj$layout$gap,
    areas = gridlayout:::to_matrix(layout_obj)
  )

  gridlayout_node
}


# Any function that can modify a node go here, keyed by the name of the node
node_updaters <- list(
  "gridlayout::grid_page" = update_gridlayout
)

# Recursively update the ui tree with values that update the arguments
update_ui_nodes <- function(ui_node){

  # First run any updater functions for this node if they exist
  updater_for_node <- node_updaters[[ui_node$uiName]]
  if (!is.null(updater_for_node)) {
    ui_node <- updater_for_node(ui_node)
  }

  # Next walk through all the children and do the same
  if (!is.null(ui_node$uiChildren)){
    ui_node$uiChildren <- lapply(ui_node$uiChildren, FUN = update_ui_nodes)
  }

  ui_node
}

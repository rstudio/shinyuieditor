is_grid_container_node <- function(node) {
  node$uiName %in% c("gridlayout::grid_page", "gridlayout::grid_container")
}

simplify_gridlayout_args <- function(node) {
  if (!is_grid_container_node(node)) {
    return(node)
  }

  # Keep things as arrays and not lists
  node$uiArguments$layout <- simplify2array(node$uiArguments$layout)
  node$uiArguments$row_sizes <- simplify2array(node$uiArguments$row_sizes)
  node$uiArguments$col_sizes <- simplify2array(node$uiArguments$col_sizes)
  node$uiArguments$gap_size  <- simplify2array(node$uiArguments$gap_size)

  node
}
